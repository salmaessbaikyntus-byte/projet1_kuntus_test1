using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ShiftMaster.Auth.Service.Application.DTOs;
using ShiftMaster.Auth.Service.Application.Interfaces;
using ShiftMaster.Auth.Service.Domain.Entities;
using ShiftMaster.Auth.Service.Domain.Enums;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShiftMaster.Auth.Service.Application.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return null;

        var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!isValid)
            return null;

        var token = await GenerateJwtAsync(user);
        return new LoginResponse(
            token,
            user.Id.ToString(),
            user.Email!,
            user.FullName,
            user.Role.ToString(),
            user.CellId,
            user.AvatarUrl
        );
    }

    public async Task<MeResponse?> GetMeAsync(Guid userId, CancellationToken ct = default)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            return null;

        return new MeResponse(
            user.Id.ToString(),
            user.Email!,
            user.FullName,
            user.Role.ToString(),
            user.CellId,
            user.AvatarUrl
        );
    }

    private async Task<string> GenerateJwtAsync(ApplicationUser user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.FullName),
            new("role", user.Role.ToString()),
            new("cell_id", user.CellId ?? string.Empty)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }
}
