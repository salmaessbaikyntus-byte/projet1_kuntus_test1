namespace ShiftMaster.Employee.Service.Domain.Entities;

public class AvailabilitySlot
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public bool IsAvailable { get; set; } = true;

    public Employee Employee { get; set; } = null!;
}
