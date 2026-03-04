using Microsoft.EntityFrameworkCore;
using ShiftMaster.Employee.Service.Domain.Interfaces;

namespace ShiftMaster.Employee.Service.Infrastructure.Persistence;

public class OrganisationFilterRepository : IOrganisationFilterRepository
{
    private readonly EmployeeDbContext _context;

    public OrganisationFilterRepository(EmployeeDbContext context) => _context = context;

    public async Task<OrganisationFilters> GetDistinctFiltersAsync(CancellationToken ct = default)
    {
        var poles = await _context.EmployesOrganisation.Select(o => o.Pole).Distinct().OrderBy(x => x).ToListAsync(ct);
        var cellules = await _context.EmployesOrganisation.Select(o => o.Cellule).Distinct().OrderBy(x => x).ToListAsync(ct);
        var departments = await _context.EmployesOrganisation.Where(o => o.Departement != null).Select(o => o.Departement!).Distinct().OrderBy(x => x).ToListAsync(ct);
        return new OrganisationFilters(poles, cellules, departments);
    }
}
