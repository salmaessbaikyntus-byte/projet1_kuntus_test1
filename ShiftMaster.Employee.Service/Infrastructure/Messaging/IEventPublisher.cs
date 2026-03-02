using ShiftMaster.Shared.Events;

namespace ShiftMaster.Employee.Service.Infrastructure.Messaging;

public interface IEventPublisher
{
    Task PublishEmployeeUpdatedAsync(EmployeeUpdatedEvent evt, CancellationToken ct = default);
}
