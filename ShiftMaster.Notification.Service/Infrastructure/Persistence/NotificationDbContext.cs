using Microsoft.EntityFrameworkCore;
using ShiftMaster.Notification.Service.Domain.Entities;

namespace ShiftMaster.Notification.Service.Infrastructure.Persistence;

public class NotificationDbContext : DbContext
{
    public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options) { }
    public DbSet<Domain.Entities.Notification> Notifications => Set<Domain.Entities.Notification>();
    protected override void OnModelCreating(ModelBuilder b) => b.Entity<Domain.Entities.Notification>(e => e.HasKey(x => x.Id));
}
