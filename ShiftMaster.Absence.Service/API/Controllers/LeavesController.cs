using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Absence.Service.Application.DTOs;
using ShiftMaster.Absence.Service.Application.Interfaces;
using System.Security.Claims;

namespace ShiftMaster.Absence.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LeavesController : ControllerBase
{
    private readonly ILeaveService _leaveService;

    public LeavesController(ILeaveService leaveService) => _leaveService = leaveService;

    private Guid? GetUserId() => Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : null;

    [HttpGet("me")]
    [ProducesResponseType(typeof(LeaveMeDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Me(CancellationToken ct)
    {
        var userId = GetUserId() ?? throw new UnauthorizedAccessException();
        return Ok(await _leaveService.GetMeAsync(userId, ct));
    }

    [HttpPost]
    [ProducesResponseType(typeof(LeaveResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateLeaveRequest request, CancellationToken ct)
    {
        var userId = GetUserId() ?? throw new UnauthorizedAccessException();
        var result = await _leaveService.CreateAsync(userId, request, ct);
        return Ok(result);
    }

    [HttpPut("{id:guid}/cancel")]
    [ProducesResponseType(typeof(LeaveResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Cancel(Guid id, CancellationToken ct)
    {
        var userId = GetUserId() ?? throw new UnauthorizedAccessException();
        var result = await _leaveService.CancelAsync(id, userId, ct);
        return result != null ? Ok(result) : NotFound();
    }
}
