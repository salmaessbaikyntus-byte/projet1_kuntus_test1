using ShiftMaster.Employee.Service.Domain.Enums;

namespace ShiftMaster.Employee.Service.Domain.Entities;

public class Employee
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string CellId { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string Role { get; set; } = "Employee";
    public EmployeeStatus Status { get; set; }
    public ContractType ContractType { get; set; }
    public Seniority Seniority { get; set; }
    public decimal EquityScore { get; set; }
    public decimal LeaveBalance { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public ICollection<EmployeeSkill> Skills { get; set; } = [];
    public ICollection<AvailabilitySlot> AvailabilitySlots { get; set; } = [];
}
