namespace ShiftMaster.Absence.Service.Domain.Entities;

public class EmployeeBalance
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public decimal Balance { get; set; }
}
