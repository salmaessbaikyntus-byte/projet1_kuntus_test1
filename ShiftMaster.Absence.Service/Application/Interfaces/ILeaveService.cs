using ShiftMaster.Absence.Service.Application.DTOs;

namespace ShiftMaster.Absence.Service.Application.Interfaces;

public interface ILeaveService
{
    Task<LeaveMeDto> GetMeAsync(Guid employeeId, CancellationToken ct = default);
    Task<LeaveResponse?> CreateAsync(Guid employeeId, CreateLeaveRequest request, CancellationToken ct = default);
    Task<LeaveResponse?> CancelAsync(Guid leaveId, Guid employeeId, CancellationToken ct = default);
}
