using ShiftMaster.Analytics.Service.Application.DTOs;

namespace ShiftMaster.Analytics.Service.Application.Interfaces;

public interface IAnalyticsService
{
    Task<MyEquityDto> GetMyEquityAsync(Guid userId, string? cellId, CancellationToken ct = default);
    Task<TeamRankingDto> GetTeamRankingAsync(Guid userId, string? cellId, CancellationToken ct = default);
}
