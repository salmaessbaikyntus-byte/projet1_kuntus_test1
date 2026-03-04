namespace ShiftMaster.Employee.Service.Application.DTOs;

public record CreateEmployeeRequest(
    string UserId,
    string FirstName,
    string LastName,
    string Email,
    string JobTitle,
    string Department,
    string CellId,
    string Role,
    string ContractType,
    string Seniority,
    decimal LeaveBalance,
    IReadOnlyList<string>? Skills = null
);

public record UpdateEmployeeRequest(
    string? FirstName,
    string? LastName,
    string? Email,
    string? JobTitle,
    string? Department,
    string? CellId,
    string? Role,
    string? Status,
    string? ContractType,
    string? Seniority,
    decimal? LeaveBalance,
    IReadOnlyList<string>? Skills = null
);
