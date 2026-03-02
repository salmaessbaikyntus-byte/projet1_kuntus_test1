namespace ShiftMaster.Auth.Service.Application.DTOs;

public record MeResponse(
    string UserId,
    string Email,
    string Name,
    string Role,
    string? CellId,
    string? AvatarUrl
);
