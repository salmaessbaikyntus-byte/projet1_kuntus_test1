namespace ShiftMaster.Shared.Events;

public class LeaveApprovedEvent : BaseEvent
{
    public Guid LeaveId { get; set; }
    public Guid EmployeeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string LeaveType { get; set; } = string.Empty;
    public string? ApprovedBy { get; set; }
}
