using ShiftMaster.Planning.Service.Domain.Enums;

namespace ShiftMaster.Planning.Service.Domain.Entities;

public class Shift
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string CellId { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public ShiftType Type { get; set; }
    public ShiftStatus Status { get; set; }
    public DateTime Date { get; set; }
}
