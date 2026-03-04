namespace ShiftMaster.Employee.Service.Application.DTOs;

public record EmployeeListRequest(
    string? Search,
    string? Pole,
    string? Cellule,
    string? Department,
    string? Role,
    int Page = 1,
    int PageSize = 20
);

public record EmployeeListResponse(
    IReadOnlyList<EmployeeListItemDto> Items,
    int TotalCount,
    int Page,
    int PageSize
);

public record EmployeeListItemDto(
    string Id,
    string Name,
    string Email,
    string JobTitle,
    string Department,
    string CellId,
    string Role,
    string Status,
    string ContractType,
    string Seniority,
    decimal EquityScore,
    decimal LeaveBalance,
    IReadOnlyList<string> Skills
);
