using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Notification.Service.Application.Interfaces;
using System.Security.Claims;

namespace ShiftMaster.Notification.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService) => _notificationService = notificationService;

    [HttpGet("me")]
    public async Task<IActionResult> Me([FromQuery] string filter = "all", CancellationToken ct = default)
    {
        var userId = Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : Guid.Empty;
        return Ok(await _notificationService.GetMeAsync(userId, filter, ct));
    }

    [HttpPut("{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id, CancellationToken ct)
    {
        var userId = Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var uid) ? uid : Guid.Empty;
        var ok = await _notificationService.MarkAsReadAsync(id, userId, ct);
        return ok ? Ok() : NotFound();
    }
}
