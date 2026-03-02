using ShiftMaster.Shared.Events;

namespace ShiftMaster.Absence.Service.Infrastructure.Messaging;

public interface IEventPublisher
{
    Task PublishLeaveApprovedAsync(LeaveApprovedEvent evt, CancellationToken ct = default);
}
