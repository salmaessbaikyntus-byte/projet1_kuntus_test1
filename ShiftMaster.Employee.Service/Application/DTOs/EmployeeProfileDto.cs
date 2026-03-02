namespace ShiftMaster.Employee.Service.Application.DTOs;

public record EmployeeProfileDto(
    string Id,
    string UserId,
    string FirstName,
    string LastName,
    string Name,
    string Email,
    string JobTitle,
    string Department,
    string CellId,
    string? AvatarUrl,
    string Role,
    string Status,
    string ContractType,
    string Seniority,
    decimal EquityScore,
    decimal LeaveBalance,
    IReadOnlyList<string> Skills,
    IReadOnlyList<AvailabilitySlotDto> AvailabilitySlots
);

public record AvailabilitySlotDto(
    DayOfWeek DayOfWeek,
    TimeOnly StartTime,
    TimeOnly EndTime,
    bool IsAvailable
);
