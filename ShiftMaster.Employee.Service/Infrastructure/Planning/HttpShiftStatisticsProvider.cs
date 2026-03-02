using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ShiftMaster.Employee.Service.Application.Interfaces;

namespace ShiftMaster.Employee.Service.Infrastructure.Planning;

public sealed class HttpShiftStatisticsProvider(
    IHttpClientFactory httpClientFactory,
    IOptions<PlanningClientOptions> options,
    ILogger<HttpShiftStatisticsProvider> logger) : IShiftStatisticsProvider
{
    public async Task<ShiftEquityStats?> GetStatsForEmployeeAsync(Guid employeeId, string cellId, CancellationToken ct = default)
    {
        var baseUrl = options.Value.PlanningServiceBaseUrl?.TrimEnd('/');
        if (string.IsNullOrEmpty(baseUrl))
        {
            logger.LogDebug("PlanningServiceBaseUrl not configured, using default equity stats");
            return new ShiftEquityStats(85, 85, 90);
        }

        try
        {
            var client = httpClientFactory.CreateClient(nameof(HttpShiftStatisticsProvider));
            var url = $"{baseUrl}/api/planning/equity-stats/{employeeId}?cellId={Uri.EscapeDataString(cellId)}";
            var stats = await client.GetFromJsonAsync<ShiftEquityStatsDto>(url, ct);
            return stats != null
                ? new ShiftEquityStats(stats.SaturdayRotationScore, stats.NightBalanceScore, stats.BreakComplianceScore)
                : new ShiftEquityStats(85, 85, 90);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to fetch shift stats for {EmployeeId}, using defaults", employeeId);
            return new ShiftEquityStats(85, 85, 90);
        }
    }
}

internal record ShiftEquityStatsDto(int SaturdayRotationScore, int NightBalanceScore, int BreakComplianceScore);

public sealed class PlanningClientOptions
{
    public const string Section = "PlanningClient";
    public string? PlanningServiceBaseUrl { get; set; }
}
