using ShiftMaster.Auth.Service.Application.DTOs;

namespace ShiftMaster.Auth.Service.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request, CancellationToken ct = default);
    Task<MeResponse?> GetMeAsync(Guid userId, CancellationToken ct = default);
}
