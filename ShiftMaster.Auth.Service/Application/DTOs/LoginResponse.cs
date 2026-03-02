namespace ShiftMaster.Auth.Service.Application.DTOs;

public record LoginResponse(
    string Token,
    string UserId,
    string Email,
    string Name,
    string Role,
    string? CellId,
    string? AvatarUrl
);
