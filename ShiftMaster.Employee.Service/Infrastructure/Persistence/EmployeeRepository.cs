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
}
