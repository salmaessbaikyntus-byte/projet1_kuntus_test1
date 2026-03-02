namespace ShiftMaster.Shared.Events;

public class ShiftModifiedEvent : BaseEvent
{
    public Guid ShiftId { get; set; }
    public Guid EmployeeId { get; set; }
    public string CellId { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string ShiftType { get; set; } = string.Empty;
    public string ModificationType { get; set; } = string.Empty; // Created, Updated, Cancelled
}
