using Microsoft.EntityFrameworkCore;
using ShiftMaster.Employee.Service.Domain.Entities;

namespace ShiftMaster.Employee.Service.Infrastructure.Persistence;

public class EmployeeDbContext : DbContext
{
    public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }

    public DbSet<Domain.Entities.Employee> Employees => Set<Domain.Entities.Employee>();
    public DbSet<EmployeeSkill> EmployeeSkills => Set<EmployeeSkill>();
    public DbSet<AvailabilitySlot> AvailabilitySlots => Set<AvailabilitySlot>();
    public DbSet<EmployeOrganisation> EmployesOrganisation => Set<EmployeOrganisation>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Domain.Entities.Employee>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Status).HasConversion<string>();
            e.Property(x => x.ContractType).HasConversion<string>();
            e.Property(x => x.Seniority).HasConversion<string>();
            e.HasIndex(x => x.UserId).IsUnique();
            e.HasMany(x => x.Skills).WithOne().HasForeignKey(x => x.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            e.HasMany(x => x.AvailabilitySlots).WithOne().HasForeignKey(x => x.EmployeeId).OnDelete(DeleteBehavior.Cascade);
        });
        builder.Entity<EmployeeSkill>(e =>
        {
            e.HasKey(x => x.Id);
        });
        builder.Entity<AvailabilitySlot>(e =>
        {
            e.HasKey(x => x.Id);
        });
        builder.Entity<EmployeOrganisation>(e =>
        {
            e.HasKey(x => x.Id);
            e.ToTable("EmployeOrganisation");
        });
    }
}
