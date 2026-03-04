namespace ShiftMaster.Employee.Service.Domain.Interfaces;

public record OrganisationFilters(IReadOnlyList<string> Poles, IReadOnlyList<string> Cellules, IReadOnlyList<string> Departments);

public interface IOrganisationFilterRepository
{
    Task<OrganisationFilters> GetDistinctFiltersAsync(CancellationToken ct = default);
}
