using Microsoft.EntityFrameworkCore;
using ShiftMaster.Absence.Service.Domain.Entities;

namespace ShiftMaster.Absence.Service.Infrastructure.Persistence;

public class AbsenceDbContext : DbContext
{
    public AbsenceDbContext(DbContextOptions<AbsenceDbContext> options) : base(options) { }
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<EmployeeBalance> EmployeeBalances => Set<EmployeeBalance>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<LeaveRequest>(e => { e.HasKey(x => x.Id); e.Property(x => x.Status).HasConversion<string>(); });
        b.Entity<EmployeeBalance>(e => e.HasKey(x => x.Id));
    }
}
