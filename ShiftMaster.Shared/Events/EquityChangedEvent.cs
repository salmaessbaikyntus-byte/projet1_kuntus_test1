namespace ShiftMaster.Shared.Events;

public class EquityChangedEvent : BaseEvent
{
    public Guid EmployeeId { get; set; }
    public string CellId { get; set; } = string.Empty;
    public decimal PreviousScore { get; set; }
    public decimal NewScore { get; set; }
    public string? Reason { get; set; }
}
