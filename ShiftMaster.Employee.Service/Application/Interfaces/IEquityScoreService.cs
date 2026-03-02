namespace ShiftMaster.Employee.Service.Application.Interfaces;

/// <summary>
/// Calculates team fairness equity score (target 85%) based on:
/// - Saturday Rotation (35%), Night Balance (25%), Break Compliance (20%), Availability (20%)
/// </summary>
public interface IEquityScoreService
{
    Task<EquityScoreResult> CalculateAsync(Guid employeeId, string cellId, CancellationToken ct = default);
}

public record EquityScoreResult(
    decimal TotalScore,          // 0-100, target 85%
    int SaturdayRotationScore,
    int NightBalanceScore,
    int BreakComplianceScore,
    int AvailabilityScore
);
