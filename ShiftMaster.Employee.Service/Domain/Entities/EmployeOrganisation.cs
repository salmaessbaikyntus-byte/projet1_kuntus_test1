namespace ShiftMaster.Employee.Service.Domain.Entities;

public class EmployeOrganisation
{
    public Guid Id { get; set; }
    public string Pole { get; set; } = string.Empty;
    public string Cellule { get; set; } = string.Empty;
    public string? Departement { get; set; }
    public string Nom { get; set; } = string.Empty;
}
