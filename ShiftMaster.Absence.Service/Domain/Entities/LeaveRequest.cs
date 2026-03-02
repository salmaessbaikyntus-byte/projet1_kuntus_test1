using ShiftMaster.Absence.Service.Domain.Enums;

namespace ShiftMaster.Absence.Service.Domain.Entities;

public class LeaveRequest
{

    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string LeaveType { get; set; } = "Annual";
    public LeaveStatus Status { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
}
