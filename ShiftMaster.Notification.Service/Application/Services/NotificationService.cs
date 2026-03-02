using Microsoft.EntityFrameworkCore;
using ShiftMaster.Notification.Service.Application.DTOs;
using ShiftMaster.Notification.Service.Application.Interfaces;
using ShiftMaster.Notification.Service.Infrastructure.Persistence;

namespace ShiftMaster.Notification.Service.Application.Services;

public class NotificationService : INotificationService
{
    private readonly NotificationDbContext _context;

    public NotificationService(NotificationDbContext context) => _context = context;

    public async Task<NotificationMeDto> GetMeAsync(Guid employeeId, string filter, CancellationToken ct = default)
    {
        var query = _context.Notifications.Where(n => n.EmployeeId == employeeId);
        if (filter == "unread") query = query.Where(n => !n.IsRead);
        else if (filter == "read") query = query.Where(n => n.IsRead);
        var items = await query.OrderByDescending(n => n.CreatedAt).ToListAsync(ct);
        return new NotificationMeDto(items.Select(n => new NotificationItemDto(n.Id.ToString(), n.Title, n.Message, n.Type, n.IsRead, n.CreatedAt)).ToList());
    }

    public async Task<bool> MarkAsReadAsync(Guid notificationId, Guid employeeId, CancellationToken ct = default)
    {
        var n = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == notificationId && x.EmployeeId == employeeId, ct);
        if (n == null) return false;
        n.IsRead = true;
        await _context.SaveChangesAsync(ct);
        return true;
    }
}
