namespace ShiftMaster.Planning.Service.Application.Interfaces;

/// <summary>
/// Interface pour les algorithmes de génération de planning.
/// Permet de switcher entre GreedyPlanningAlgorithm et un futur PythonBasedPlanningAlgorithm.
/// </summary>
public interface IPlanningAlgorithm
{
    string Name { get; }

    Task<AlgorithmGenerateResult> GenerateWeekAsync(DateTime weekStart, string cellId, int employeeCount, CancellationToken ct = default);
}

public record AlgorithmGenerateResult(IReadOnlyList<ShiftGenerationItem> Shifts, GenerateWeekMetrics Metrics);
public record ShiftGenerationItem(Guid EmployeeId, string EmployeeName, DateTime StartTime, DateTime EndTime, string Type);
public record GenerateWeekMetrics(decimal CoveragePercent, decimal PauseSensitivePercent, int AssignedCount, bool IsCompliant);
