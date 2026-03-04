using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Employee.Service.Application.DTOs;
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

    /// <summary>Get current user's employee profile (me).</summary>
    [HttpGet("me")]
    [ProducesResponseType(typeof(EmployeeProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Me(CancellationToken ct)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();
        var result = await _employeeService.GetMeAsync(userId, ct);
        if (result == null) return NotFound();
        return Ok(result);
    }

    /// <summary>List employees with optional filters and pagination.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(EmployeeListResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> List([FromQuery] string? search, [FromQuery] string? pole, [FromQuery] string? cellule, [FromQuery] string? department, [FromQuery] string? role, [FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
    {
        var request = new EmployeeListRequest(search, pole, cellule, department, role, page, pageSize);
        var result = await _employeeService.GetListAsync(request, ct);
        return Ok(result);
    }

    /// <summary>Get distinct poles, cellules, departments for filter dropdowns.</summary>
    [HttpGet("organisation-filters")]
    [ProducesResponseType(typeof(OrganisationFilterDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> OrganisationFilters(CancellationToken ct)
    {
        var result = await _employeeService.GetOrganisationFiltersAsync(ct);
        return Ok(result);
    }

    /// <summary>Get employee by ID.</summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(EmployeeProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var result = await _employeeService.GetByIdAsync(id, ct);
        if (result == null) return NotFound();
        return Ok(result);
    }

    /// <summary>Create a new employee.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(EmployeeProfileDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeRequest request, CancellationToken ct)
    {
        var result = await _employeeService.CreateAsync(request, ct);
        if (result == null) return BadRequest("Email already exists or invalid data.");
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>Update an employee.</summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(EmployeeProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEmployeeRequest request, CancellationToken ct)
    {
        var result = await _employeeService.UpdateAsync(id, request, ct);
        if (result == null) return NotFound();
        return Ok(result);
    }

    /// <summary>Delete an employee.</summary>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _employeeService.DeleteAsync(id, ct);
        if (!ok) return NotFound();
        return NoContent();
    }

    /// <summary>Get equity score for current user.</summary>
    [HttpGet("me/equity")]
    [ProducesResponseType(typeof(EquityScoreResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MeEquity([FromQuery] string? cellId, CancellationToken ct)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();
        var profile = await _employeeService.GetMeAsync(userId, ct);
        if (profile == null) return NotFound();
        if (!Guid.TryParse(profile.Id, out var empId)) return NotFound();
        var result = await _equityScoreService.CalculateAsync(empId, cellId ?? string.Empty, ct);
        return Ok(result);
    }

    /// <summary>Get equity score for employee by ID.</summary>
    [HttpGet("{id:guid}/equity")]
    [ProducesResponseType(typeof(EquityScoreResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEquity(Guid id, [FromQuery] string? cellId, CancellationToken ct)
    {
        var profile = await _employeeService.GetByIdAsync(id, ct);
        if (profile == null) return NotFound();
        var result = await _equityScoreService.CalculateAsync(id, cellId ?? string.Empty, ct);
        return Ok(result);
    }
}
