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
}
