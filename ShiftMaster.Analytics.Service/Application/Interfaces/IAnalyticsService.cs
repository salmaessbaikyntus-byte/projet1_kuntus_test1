using ShiftMaster.Analytics.Service.Application.DTOs;

namespace ShiftMaster.Analytics.Service.Application.Interfaces;

public interface IAnalyticsService
{
    Task<MyEquityDto> GetMyEquityAsync(Guid userId, string? cellId, CancellationToken ct = default);
    Task<TeamRankingDto> GetTeamRankingAsync(Guid userId, string? cellId, CancellationToken ct = default);
    Task<IReadOnlyList<KpiDto>> GetKpisAsync(CancellationToken ct = default);
    Task<HeatmapDto> GetHeatmapAsync(CancellationToken ct = default);
    Task<SimulateResultDto> SimulateAsync(SimulateRequestDto request, CancellationToken ct = default);
    Task<IReadOnlyList<DashboardAlertDto>> GetAlertsAsync(CancellationToken ct = default);
    Task<IReadOnlyList<RecentActivityDto>> GetRecentActivityAsync(CancellationToken ct = default);
    Task<IReadOnlyList<AuditLogDto>> GetAuditLogAsync(CancellationToken ct = default);
}
