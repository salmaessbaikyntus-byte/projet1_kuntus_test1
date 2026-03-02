using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Analytics.Service.Application.DTOs;
using ShiftMaster.Analytics.Service.Application.Interfaces;
using System.Security.Claims;

namespace ShiftMaster.Analytics.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsController(IAnalyticsService analyticsService) => _analyticsService = analyticsService;

    [HttpGet("my-equity")]
    public async Task<IActionResult> MyEquity(CancellationToken ct)
    {
        var userId = Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : Guid.Empty;
        var cellId = User.FindFirst("cell_id")?.Value;
        return Ok(await _analyticsService.GetMyEquityAsync(userId, cellId, ct));
    }

    [HttpGet("kpis")]
    public async Task<IActionResult> Kpis(CancellationToken ct)
    {
        return Ok(await _analyticsService.GetKpisAsync(ct));
    }

    [HttpGet("heatmap")]
    public async Task<IActionResult> Heatmap(CancellationToken ct)
    {
        return Ok(await _analyticsService.GetHeatmapAsync(ct));
    }

    [HttpPost("simulate")]
    public async Task<IActionResult> Simulate([FromBody] SimulateRequestDto request, CancellationToken ct)
    {
        return Ok(await _analyticsService.SimulateAsync(request, ct));
    }

    [HttpGet("team-ranking")]
    public async Task<IActionResult> TeamRanking(CancellationToken ct)
    {
        var userId = Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : Guid.Empty;
        return Ok(await _analyticsService.GetTeamRankingAsync(userId, User.FindFirst("cell_id")?.Value, ct));
    }
}
