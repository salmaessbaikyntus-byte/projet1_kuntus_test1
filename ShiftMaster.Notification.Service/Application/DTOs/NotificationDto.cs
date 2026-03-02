namespace ShiftMaster.Notification.Service.Application.DTOs;

public record NotificationMeDto(IReadOnlyList<NotificationItemDto> Items);
public record NotificationItemDto(string Id, string Title, string Message, string Type, bool IsRead, DateTime CreatedAt);
