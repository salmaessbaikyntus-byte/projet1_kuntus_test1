using ShiftMaster.Planning.Service.Application.Interfaces;

namespace ShiftMaster.Planning.Service.Application.Algorithms;

/// <summary>
/// Placeholder pour un futur algorithme Python (intégration moteur externe).
/// Délègue vers Greedy pour l'instant.
/// </summary>
public class PythonBasedPlanningAlgorithm : IPlanningAlgorithm
{
    private readonly GreedyPlanningAlgorithm _fallback = new();

    public string Name => "PythonBased";

    public Task<AlgorithmGenerateResult> GenerateWeekAsync(DateTime weekStart, string cellId, int employeeCount, CancellationToken ct = default)
    {
        // TODO: Appel Python / gRPC / HTTP vers moteur Python
        return _fallback.GenerateWeekAsync(weekStart, cellId, employeeCount, ct);
    }
}
