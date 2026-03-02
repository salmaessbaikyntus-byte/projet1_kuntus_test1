using Microsoft.Extensions.Logging;
using ShiftMaster.Employee.Service.Application.Interfaces;
using ShiftMaster.Employee.Service.Domain.Entities;
using ShiftMaster.Employee.Service.Domain.Interfaces;
using EmployeeEntity = ShiftMaster.Employee.Service.Domain.Entities.Employee;

namespace ShiftMaster.Employee.Service.Application.Services;

/// <summary>
/// Equity score calculation: 35% Saturday rotation, 25% night balance,
/// 20% break compliance, 20% availability. Target: 85% for team fairness.
/// </summary>
public sealed class EquityScoreService(
    IEmployeeRepository employeeRepository,
    IShiftStatisticsProvider shiftStatsProvider,
    ILogger<EquityScoreService> logger) : IEquityScoreService
{
    private const decimal WeightSaturday = 0.35m;
    private const decimal WeightNight = 0.25m;
    private const decimal WeightBreak = 0.20m;
    private const decimal WeightAvailability = 0.20m;
    private const decimal TargetScore = 85m;

    public async Task<EquityScoreResult> CalculateAsync(Guid employeeId, string cellId, CancellationToken ct = default)
    {
        var employee = await employeeRepository.GetByIdAsync(employeeId, ct);
        if (employee == null)
        {
            logger.LogWarning("Employee {EmployeeId} not found for equity calculation", employeeId);
            return new EquityScoreResult(0, 0, 0, 0, 0);
        }

        var shiftStats = await shiftStatsProvider.GetStatsForEmployeeAsync(employeeId, cellId, ct)
            ?? new ShiftEquityStats(100, 100, 100);

        var availabilityScore = ComputeAvailabilityScore(employee);
        var satScore = Math.Clamp(shiftStats.SaturdayRotationScore, 0, 100);
        var nightScore = Math.Clamp(shiftStats.NightBalanceScore, 0, 100);
        var breakScore = Math.Clamp(shiftStats.BreakComplianceScore, 0, 100);

        var total = WeightSaturday * satScore + WeightNight * nightScore
            + WeightBreak * breakScore + WeightAvailability * availabilityScore;
        var rounded = Math.Round(total, 1);

        logger.LogDebug("Equity for {EmployeeId}: {Score}% (Sat:{Sat} Night:{Night} Break:{Break} Avail:{Avail})",
            employeeId, rounded, satScore, nightScore, breakScore, availabilityScore);

        return new EquityScoreResult(rounded, satScore, nightScore, breakScore, availabilityScore);
    }

    /// <summary>
    /// Availability score 0-100: coverage of weekdays declared as available.
    /// At least Mon-Fri expected for full score.
    /// </summary>
    private static int ComputeAvailabilityScore(EmployeeEntity employee)
    {
        var slots = employee.AvailabilitySlots.Where(a => a.IsAvailable).ToList();
        if (slots.Count == 0) return 0;

        var weekdays = new[] { DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday };
        var covered = weekdays.Count(d => slots.Any(s => s.DayOfWeek == d));
        return (int)Math.Round(100m * covered / weekdays.Length);
    }
}
