using ShiftMaster.Planning.Service.Application.DTOs;

namespace ShiftMaster.Planning.Service.Application.Interfaces;

public interface IPlanningService
{
    Task<TodayPlanningDto> GetTodayAsync(Guid userId, string? cellId, CancellationToken ct = default);
    Task<WeekPlanningDto> GetWeekAsync(Guid userId, DateTime? weekStart, string? cellId, CancellationToken ct = default);
    Task<MonthPlanningDto> GetMonthAsync(Guid userId, int year, int month, string? cellId, CancellationToken ct = default);
    Task<SimulateResponse> SimulateAsync(SimulateRequest request, CancellationToken ct = default);
}
