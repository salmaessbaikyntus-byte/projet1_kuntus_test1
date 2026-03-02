namespace ShiftMaster.Shared.Events;

public class EmployeeUpdatedEvent : BaseEvent
{
    public Guid EmployeeId { get; set; }
    public string CellId { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Department { get; set; }
    public string? Status { get; set; }
}
