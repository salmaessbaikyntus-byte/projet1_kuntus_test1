namespace ShiftMaster.Employee.Service.Domain.Interfaces;

public interface IEmployeeRepository
{
    Task<Domain.Entities.Employee?> GetByUserIdAsync(string userId, CancellationToken ct = default);
    Task<Domain.Entities.Employee?> GetByIdAsync(Guid id, CancellationToken ct = default);
}
