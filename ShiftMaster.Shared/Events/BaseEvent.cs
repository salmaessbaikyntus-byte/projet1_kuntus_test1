namespace ShiftMaster.Shared.Events;

/// <summary>
/// Base event for all ShiftMaster domain events (v1).
/// Idempotency via EventId for duplicate handling.
/// </summary>
public abstract class BaseEvent
{
    public string EventId { get; set; } = Guid.NewGuid().ToString();
    public string Version { get; set; } = "v1";
    public DateTime OccurredAt { get; set; } = DateTime.UtcNow;
    public string? CorrelationId { get; set; }
}
