using Microsoft.EntityFrameworkCore;
using ShiftMaster.Employee.Service.Domain.Entities;
using ShiftMaster.Employee.Service.Domain.Interfaces;

namespace ShiftMaster.Employee.Service.Infrastructure.Persistence;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly EmployeeDbContext _context;

    public EmployeeRepository(EmployeeDbContext context) => _context = context;

    public async Task<Domain.Entities.Employee?> GetByUserIdAsync(string userId, CancellationToken ct = default)
        => await _context.Employees
            .Include(e => e.Skills)
            .Include(e => e.AvailabilitySlots)
            .FirstOrDefaultAsync(e => e.UserId == userId, ct);

    public async Task<Domain.Entities.Employee?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Employees
            .Include(e => e.Skills)
            .Include(e => e.AvailabilitySlots)
            .FirstOrDefaultAsync(e => e.Id == id, ct);

    public async Task<(IReadOnlyList<Domain.Entities.Employee> Items, int Total)> GetListAsync(string? search, string? pole, string? cellule, string? department, string? role, int page, int pageSize, CancellationToken ct = default)
    {
        var query = _context.Employees
            .Include(e => e.Skills)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = $"%{search.Trim()}%";
            query = query.Where(e =>
                EF.Functions.ILike(e.FirstName + " " + e.LastName, term) ||
                EF.Functions.ILike(e.Email, term));
        }
        if (!string.IsNullOrWhiteSpace(pole))
            query = query.Where(e => e.Pole == pole);
        if (!string.IsNullOrWhiteSpace(cellule))
            query = query.Where(e => e.CellId == cellule);
        if (!string.IsNullOrWhiteSpace(department))
            query = query.Where(e => e.Department == department);
        if (!string.IsNullOrWhiteSpace(role))
            query = query.Where(e => e.Role == role);

        var total = await query.CountAsync(ct);
        var items = await query
            .OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);
        return (items, total);
    }

    public async Task<Domain.Entities.Employee?> GetByEmailAsync(string email, CancellationToken ct = default)
        => await _context.Employees
            .Include(e => e.Skills)
            .Include(e => e.AvailabilitySlots)
            .FirstOrDefaultAsync(e => e.Email == email, ct);

    public async Task<Domain.Entities.Employee> AddAsync(Domain.Entities.Employee employee, CancellationToken ct = default)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync(ct);
        return employee;
    }

    public Task SaveChangesAsync(CancellationToken ct = default) => _context.SaveChangesAsync(ct);

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var emp = await _context.Employees.FindAsync([id], ct);
        if (emp == null) return false;
        _context.Employees.Remove(emp);
        await _context.SaveChangesAsync(ct);
        return true;
    }
}
