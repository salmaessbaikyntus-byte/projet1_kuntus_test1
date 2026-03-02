using ShiftMaster.Notification.Service.Application.DTOs;

namespace ShiftMaster.Notification.Service.Application.Interfaces;

public interface INotificationService
{
    Task<NotificationMeDto> GetMeAsync(Guid employeeId, string filter, CancellationToken ct = default);
    Task<bool> MarkAsReadAsync(Guid notificationId, Guid employeeId, CancellationToken ct = default);
}
