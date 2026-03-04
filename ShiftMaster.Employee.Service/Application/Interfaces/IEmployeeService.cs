using ShiftMaster.Employee.Service.Application.DTOs;

namespace ShiftMaster.Employee.Service.Application.Interfaces;

public interface IEmployeeService
{
    Task<EmployeeProfileDto?> GetMeAsync(Guid userId, CancellationToken ct = default);
    Task<EmployeeProfileDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<EmployeeListResponse> GetListAsync(EmployeeListRequest request, CancellationToken ct = default);
    Task<OrganisationFilterDto> GetOrganisationFiltersAsync(CancellationToken ct = default);
    Task<EmployeeProfileDto?> CreateAsync(CreateEmployeeRequest request, CancellationToken ct = default);
    Task<EmployeeProfileDto?> UpdateAsync(Guid id, UpdateEmployeeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
