namespace ShiftMaster.Employee.Service.Domain.Interfaces;

public interface IEmployeeRepository
{
    Task<Domain.Entities.Employee?> GetByUserIdAsync(string userId, CancellationToken ct = default);
    Task<Domain.Entities.Employee?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<(IReadOnlyList<Domain.Entities.Employee> Items, int Total)> GetListAsync(string? search, string? pole, string? cellule, string? department, string? role, int page, int pageSize, CancellationToken ct = default);
    Task<Domain.Entities.Employee?> GetByEmailAsync(string email, CancellationToken ct = default);
    Task<Domain.Entities.Employee> AddAsync(Domain.Entities.Employee employee, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
