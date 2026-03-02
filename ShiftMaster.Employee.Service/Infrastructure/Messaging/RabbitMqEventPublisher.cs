using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using ShiftMaster.Shared.Constants;
using ShiftMaster.Shared.Events;

namespace ShiftMaster.Employee.Service.Infrastructure.Messaging;

public class RabbitMqEventPublisher : IEventPublisher
{
    private readonly IConnection _connection;
    private readonly ILogger<RabbitMqEventPublisher> _logger;

    public RabbitMqEventPublisher(IConnection connection, ILogger<RabbitMqEventPublisher> logger)
    {
        _connection = connection;
        _logger = logger;
    }

    public Task PublishEmployeeUpdatedAsync(EmployeeUpdatedEvent evt, CancellationToken ct = default)
    {
        using var channel = _connection.CreateModel();
        channel.ExchangeDeclare(EventRouting.ExchangeName, ExchangeType.Topic, durable: true);
        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(evt));
        var props = channel.CreateBasicProperties();
        props.Persistent = true;
        props.MessageId = evt.EventId;
        props.ContentType = "application/json";
        if (!string.IsNullOrEmpty(evt.CorrelationId))
            props.CorrelationId = evt.CorrelationId;

        channel.BasicPublish(
            EventRouting.ExchangeName,
            EventRouting.EmployeeUpdatedRoutingKey,
            props,
            body);

        _logger.LogInformation("Published EmployeeUpdatedEvent for employee {EmployeeId}", evt.EmployeeId);
        return Task.CompletedTask;
    }
}
