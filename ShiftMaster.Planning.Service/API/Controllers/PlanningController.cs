using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Planning.Service.Application.DTOs;
using ShiftMaster.Planning.Service.Application.Interfaces;
using System.Security.Claims;

namespace ShiftMaster.Planning.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PlanningController : ControllerBase
{
    private readonly IPlanningService _planningService;

    public PlanningController(IPlanningService planningService) => _planningService = planningService;

    private Guid? GetUserId() => Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : null;
    private string? GetCellId() => User.FindFirst("cell_id")?.Value;

    [HttpGet("today")]
    [ProducesResponseType(typeof(TodayPlanningDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Today(CancellationToken ct)
    {
        var userId = GetUserId() ?? Guid.Empty;
        return Ok(await _planningService.GetTodayAsync(userId, GetCellId(), ct));
    }

    [HttpGet("week")]
    [ProducesResponseType(typeof(WeekPlanningDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Week([FromQuery] DateTime? weekStart, CancellationToken ct)
    {
        var userId = GetUserId() ?? Guid.Empty;
        return Ok(await _planningService.GetWeekAsync(userId, weekStart, GetCellId(), ct));
    }

    [HttpGet("month")]
    [ProducesResponseType(typeof(MonthPlanningDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Month([FromQuery] int year, [FromQuery] int month, CancellationToken ct)
    {
        var userId = GetUserId() ?? Guid.Empty;
        return Ok(await _planningService.GetMonthAsync(userId, year, month, GetCellId(), ct));
    }

    [HttpPost("generate-week")]
    [ProducesResponseType(typeof(GenerateWeekResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GenerateWeek([FromBody] GenerateWeekRequest request, CancellationToken ct)
    {
        return Ok(await _planningService.GenerateWeekAsync(request, ct));
    }

    [HttpPost("simulate")]
    [ProducesResponseType(typeof(SimulateResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Simulate([FromBody] SimulateRequest request, CancellationToken ct)
    {
        return Ok(await _planningService.SimulateAsync(request, ct));
    }
}
