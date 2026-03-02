namespace ShiftMaster.Employee.Service.Domain.Entities;

public class EmployeeSkill
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Level { get; set; } = 1;

    public Employee Employee { get; set; } = null!;
}
