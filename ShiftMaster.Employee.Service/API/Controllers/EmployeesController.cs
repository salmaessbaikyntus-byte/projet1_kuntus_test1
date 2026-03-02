using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Employee.Service.Application.Interfaces;
using System.Security.Claims;

namespace ShiftMaster.Employee.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;
    private readonly IEquityScoreService _equityScoreService;

    public EmployeesController(IEmployeeService employeeService, IEquityScoreService equityScoreService)
    {
        _employeeService = employeeService;
        _equityScoreService = equityScoreService;
    }

    /// <summary>
    /// Get current user's employee profile (me).
    /// </summary>
    [HttpGet("me")]
    [ProducesResponseType(typeof(Application.DTOs.EmployeeProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Me(CancellationToken ct)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var result = await _employeeService.GetMeAsync(userId, ct);
        if (result == null)
            return NotFound();
        return Ok(result);
    }

    /// <summary>
    /// Get employee by ID.
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(Application.DTOs.EmployeeProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var result = await _employeeService.GetByIdAsync(id, ct);
        if (result == null)
            return NotFound();
        return Ok(result);
    }

    /// <summary>
    /// Get equity score for current user (team fairness: 85% target).
    /// </summary>
    [HttpGet("me/equity")]
    [ProducesResponseType(typeof(EquityScoreResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MeEquity([FromQuery] string? cellId, CancellationToken ct)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();
        var profile = await _employeeService.GetMeAsync(userId, ct);
        if (profile == null)
            return NotFound();
        if (!Guid.TryParse(profile.Id, out var empId))
            return NotFound();
        var result = await _equityScoreService.CalculateAsync(empId, cellId ?? string.Empty, ct);
        return Ok(result);
    }

    /// <summary>
    /// Get equity score for employee by ID.
    /// </summary>
    [HttpGet("{id:guid}/equity")]
    [ProducesResponseType(typeof(EquityScoreResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEquity(Guid id, [FromQuery] string? cellId, CancellationToken ct)
    {
        var profile = await _employeeService.GetByIdAsync(id, ct);
        if (profile == null)
            return NotFound();
        var result = await _equityScoreService.CalculateAsync(id, cellId ?? string.Empty, ct);
        return Ok(result);
    }
}
