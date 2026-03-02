using ShiftMaster.Employee.Service.Application.DTOs;

namespace ShiftMaster.Employee.Service.Application.Interfaces;

public interface IEmployeeService
{
    Task<EmployeeProfileDto?> GetMeAsync(Guid userId, CancellationToken ct = default);
    Task<EmployeeProfileDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
}
