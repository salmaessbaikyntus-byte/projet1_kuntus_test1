using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Auth.Service.Application.DTOs;
using ShiftMaster.Auth.Service.Application.Interfaces;
using ShiftMaster.Auth.Service.Domain.Entities;
using ShiftMaster.Auth.Service.Infrastructure.Persistence;
using System.Security.Claims;

namespace ShiftMaster.Auth.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly AuthDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(IAuthService authService, AuthDbContext context, UserManager<ApplicationUser> userManager)
    {
        _authService = authService;
        _context = context;
        _userManager = userManager;
    }

    /// <summary>
    /// Seed users (1 Admin, 2 RH, 2 Managers, 1 Auditeur). Idempotent.
    /// </summary>
    [HttpPost("seed-users")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> SeedUsers(CancellationToken ct)
    {
        await DataSeeder.SeedAsync(_context, _userManager);
        return Ok(new { message = "Users seeded successfully" });
    }

    /// <summary>
    /// Authenticate user and return JWT token.
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var result = await _authService.LoginAsync(request, ct);
        if (result == null)
            return Unauthorized(new { message = "Invalid email or password" });
        return Ok(result);
    }

    /// <summary>
    /// Get current authenticated user info.
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(MeResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Me(CancellationToken ct)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var result = await _authService.GetMeAsync(userId, ct);
        if (result == null)
            return NotFound();
        return Ok(result);
    }
}
