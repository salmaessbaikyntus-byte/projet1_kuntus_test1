using ShiftMaster.Shared.Events;

namespace ShiftMaster.Planning.Service.Infrastructure.Messaging;

public interface IEventPublisher
{
    Task PublishPlanningGeneratedAsync(PlanningGeneratedEvent evt, CancellationToken ct = default);
}
