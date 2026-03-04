namespace ShiftMaster.Employee.Service.Application.DTOs;

public record OrganisationFilterDto(
    IReadOnlyList<string> Poles,
    IReadOnlyList<string> Cellules,
    IReadOnlyList<string> Departments
);
