using ShiftMaster.Analytics.Service.Application.DTOs;
using ShiftMaster.Analytics.Service.Application.Interfaces;

namespace ShiftMaster.Analytics.Service.Application.Services;

public class AnalyticsService : IAnalyticsService
{
    public Task<MyEquityDto> GetMyEquityAsync(Guid userId, string? cellId, CancellationToken ct = default)
    {
        var metrics = new List<EquityMetricDto>
        {
            new("Shift distribution", 0.92m, "%"),
            new("Weekend coverage", 0.88m, "%"),
            new("Night shifts", 0.85m, "%")
        };
        var evolution = Enumerable.Range(1, 6).Select(i => new EquityEvolutionDto(2025, i, 80 + i * 2)).ToList();
        return Task.FromResult(new MyEquityDto(88m, metrics, evolution));
    }

    public Task<TeamRankingDto> GetTeamRankingAsync(Guid userId, string? cellId, CancellationToken ct = default)
    {
        var rankings = new List<TeamMemberRankingDto>
        {
            new(1, "emp-1", "Charlie Moreau", 92),
            new(2, "emp-2", "Diana Rossi", 88),
            new(3, "emp-3", "Alice Durand", 85)
        };
        return Task.FromResult(new TeamRankingDto(rankings));
    }

    public Task<IReadOnlyList<KpiDto>> GetKpisAsync(CancellationToken ct = default)
    {
        var kpis = new List<KpiDto>
        {
            new("Coverage", "Taux couverture plateau", 93.4m, "%", 2.1m, "ok"),
            new("EquityIndex", "Indice équité", 88m, "/100", 5.4m, "ok"),
            new("RuleCompliance", "Respect règle 10 %", 98.2m, "%", -0.4m, "ok"),
            new("EstimatedCost", "Coût RH estimé", 42500m, "€/sem", 1.2m, "warning")
        };
        return Task.FromResult<IReadOnlyList<KpiDto>>(kpis);
    }

    public Task<HeatmapDto> GetHeatmapAsync(CancellationToken ct = default)
    {
        var days = new[] { "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim" };
        var shifts = new[] { "Matin", "Après-midi", "Nuit" };
        var values = new decimal[][]
        {
            [92, 94, 98, 91, 95, 88, 85],
            [90, 93, 96, 89, 94, 86, 82],
            [88, 91, 95, 87, 92, 84, 80]
        };
        return Task.FromResult(new HeatmapDto(days, shifts, values, 95));
    }

    public Task<SimulateResultDto> SimulateAsync(SimulateRequestDto request, CancellationToken ct = default)
    {
        var impact = -request.StaffChangePercent * 1.2m;
        var violations = request.StaffChangePercent < -5 ? 2 : 0;
        var alerts = request.StaffChangePercent < -10
            ? new List<AlertDto> { new("critical", "Règle 10% potentiellement violée") }
            : new List<AlertDto>();
        return Task.FromResult(new SimulateResultDto(impact, violations, alerts));
    }
}
