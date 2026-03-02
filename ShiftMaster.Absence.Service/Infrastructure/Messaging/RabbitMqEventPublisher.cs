using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using ShiftMaster.Shared.Constants;
using ShiftMaster.Shared.Events;

namespace ShiftMaster.Absence.Service.Infrastructure.Messaging;

public class RabbitMqEventPublisher : IEventPublisher
{
    private readonly IConnection _connection;

    public RabbitMqEventPublisher(IConnection connection) => _connection = connection;

    public Task PublishLeaveApprovedAsync(LeaveApprovedEvent evt, CancellationToken ct = default)
    {
        using var channel = _connection.CreateModel();
        channel.ExchangeDeclare(EventRouting.ExchangeName, ExchangeType.Topic, durable: true);
        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(evt));
        var props = channel.CreateBasicProperties();
        props.Persistent = true;
        props.MessageId = evt.EventId;
        props.ContentType = "application/json";
        channel.BasicPublish(EventRouting.ExchangeName, EventRouting.LeaveApprovedRoutingKey, props, body);
        return Task.CompletedTask;
    }
}
