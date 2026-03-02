namespace ShiftMaster.Employee.Service.Application.Interfaces;

/// <summary>
/// Provides shift statistics for equity score calculation (Saturday rotation, night balance, break compliance).
/// Implement via HTTP client to Planning API in production.
/// </summary>
public interface IShiftStatisticsProvider
{
    Task<ShiftEquityStats?> GetStatsForEmployeeAsync(Guid employeeId, string cellId, CancellationToken ct = default);
}

public record ShiftEquityStats(
    int SaturdayRotationScore,   // 0-100: fairness of Saturday shift distribution
    int NightBalanceScore,       // 0-100: equity of night shift allocation
    int BreakComplianceScore     // 0-100: adherence to break rules
);
