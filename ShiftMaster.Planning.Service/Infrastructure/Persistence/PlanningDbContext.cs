using Microsoft.EntityFrameworkCore;
using ShiftMaster.Planning.Service.Domain.Entities;

namespace ShiftMaster.Planning.Service.Infrastructure.Persistence;

public class PlanningDbContext : DbContext
{
    public PlanningDbContext(DbContextOptions<PlanningDbContext> options) : base(options) { }
    public DbSet<Shift> Shifts => Set<Shift>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Shift>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Type).HasConversion<string>();
            e.Property(x => x.Status).HasConversion<string>();
        });
    }
}
