namespace ShiftMaster.Shared.Events;

public class PlanningGeneratedEvent : BaseEvent
{
    public Guid PlanningId { get; set; }
    public string CellId { get; set; } = string.Empty;
    public DateTime WeekStart { get; set; }
    public DateTime WeekEnd { get; set; }
    public int AssignedEmployeesCount { get; set; }
    public decimal CoveragePercent { get; set; }
    public bool IsCompliant { get; set; }
}
