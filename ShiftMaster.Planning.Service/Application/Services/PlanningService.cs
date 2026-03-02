using Microsoft.Extensions.Logging;
using ShiftMaster.Planning.Service.Application.DTOs;
using ShiftMaster.Planning.Service.Application.Interfaces;
using ShiftMaster.Planning.Service.Domain.Entities;
using ShiftMaster.Planning.Service.Domain.Enums;
using ShiftMaster.Planning.Service.Domain.Interfaces;
using ShiftMaster.Planning.Service.Infrastructure.Messaging;
using ShiftMaster.Shared.Events;

namespace ShiftMaster.Planning.Service.Application.Services;

public class PlanningService : IPlanningService
{
    private readonly IShiftRepository _repository;
    private readonly IEventPublisher _eventPublisher;
    private readonly IPlanningAlgorithm _algorithm;
    private readonly ILogger<PlanningService> _logger;

    public PlanningService(IShiftRepository repository, IEventPublisher eventPublisher, IPlanningAlgorithm algorithm, ILogger<PlanningService> logger)
    {
        _repository = repository;
        _eventPublisher = eventPublisher;
        _algorithm = algorithm;
        _logger = logger;
    }

    public async Task<TodayPlanningDto> GetTodayAsync(Guid userId, string? cellId, CancellationToken ct = default)
    {
        var today = DateTime.UtcNow.Date;
        var shifts = await _repository.GetShiftsAsync(today, today, cellId, userId, ct);
        var kpis = await _repository.GetKpisAsync(today, today.AddDays(1), cellId, ct);
        return new TodayPlanningDto(MapShifts(shifts), kpis);
    }

    public async Task<WeekPlanningDto> GetWeekAsync(Guid userId, DateTime? weekStart, string? cellId, CancellationToken ct = default)
    {
        var start = weekStart ?? GetWeekStart(DateTime.UtcNow);
        var end = start.AddDays(7);
        var shifts = await _repository.GetShiftsAsync(start, end, cellId, userId, ct);
        var kpis = await _repository.GetKpisAsync(start, end, cellId, ct);
        return new WeekPlanningDto(MapShifts(shifts), start, end, kpis);
    }

    public async Task<MonthPlanningDto> GetMonthAsync(Guid userId, int year, int month, string? cellId, CancellationToken ct = default)
    {
        var start = new DateTime(year, month, 1);
        var end = start.AddMonths(1);
        var shifts = await _repository.GetShiftsAsync(start, end, cellId, userId, ct);
        var kpis = await _repository.GetKpisAsync(start, end, cellId, ct);
        return new MonthPlanningDto(MapShifts(shifts), year, month, kpis);
    }

    public async Task<GenerateWeekResponse> GenerateWeekAsync(GenerateWeekRequest request, CancellationToken ct = default)
    {
        var weekEnd = request.WeekStart.AddDays(7);
        var result = await _algorithm.GenerateWeekAsync(request.WeekStart, request.CellId, request.EmployeeCount, ct);

        var shifts = result.Shifts.Select(s => new Shift
        {
            Id = Guid.NewGuid(),
            EmployeeId = s.EmployeeId,
            EmployeeName = s.EmployeeName,
            CellId = request.CellId,
            StartTime = s.StartTime,
            EndTime = s.EndTime,
            Type = Enum.TryParse<ShiftType>(s.Type, out var t) ? t : ShiftType.Morning,
            Status = ShiftStatus.Draft,
            Date = s.StartTime.Date
        }).ToList();

        await _repository.AddShiftsAsync(shifts, ct);

        var planningId = Guid.NewGuid();
        await _eventPublisher.PublishPlanningGeneratedAsync(new PlanningGeneratedEvent
        {
            PlanningId = planningId,
            CellId = request.CellId,
            WeekStart = request.WeekStart,
            WeekEnd = weekEnd,
            AssignedEmployeesCount = result.Metrics.AssignedCount,
            CoveragePercent = result.Metrics.CoveragePercent,
            IsCompliant = result.Metrics.IsCompliant
        }, ct);

        _logger.LogInformation("Generated planning {PlanningId} with {Count} shifts via {Algorithm}", planningId, shifts.Count, _algorithm.Name);
        return new GenerateWeekResponse(planningId, request.WeekStart, weekEnd, result.Metrics.CoveragePercent, result.Metrics.PauseSensitivePercent, result.Metrics.AssignedCount, result.Metrics.IsCompliant);
    }

    public async Task<SimulateResponse> SimulateAsync(SimulateRequest request, CancellationToken ct = default)
    {
        var planningId = Guid.NewGuid();
        var weekEnd = request.WeekStart.AddDays(7);
        await _eventPublisher.PublishPlanningGeneratedAsync(new PlanningGeneratedEvent
        {
            PlanningId = planningId,
            CellId = request.CellId,
            WeekStart = request.WeekStart,
            WeekEnd = weekEnd,
            AssignedEmployeesCount = 42,
            CoveragePercent = 94m,
            IsCompliant = true
        }, ct);
        _logger.LogInformation("Simulated planning {PlanningId}", planningId);
        return new SimulateResponse(planningId, request.WeekStart, 94m, true);
    }

    private static DateTime GetWeekStart(DateTime date)
    {
        var diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
        return date.AddDays(-diff).Date;
    }

    private static IReadOnlyList<ShiftDto> MapShifts(IEnumerable<Shift> shifts) => shifts
        .Select(s => new ShiftDto(s.Id.ToString(), s.EmployeeId.ToString(), s.EmployeeName,
            s.StartTime.ToString("O"), s.EndTime.ToString("O"), s.Type.ToString(), s.Status.ToString()))
        .ToList();
}
