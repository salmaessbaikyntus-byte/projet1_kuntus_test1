namespace ShiftMaster.Shared.Constants;

/// <summary>
/// RabbitMQ routing keys and exchange names for ShiftMaster events.
/// </summary>
public static class EventRouting
{
    public const string ExchangeName = "shiftmaster.events";

    public const string PlanningGeneratedRoutingKey = "planning.generated";
    public const string LeaveApprovedRoutingKey = "leave.approved";
    public const string EmployeeUpdatedRoutingKey = "employee.updated";
    public const string ShiftModifiedRoutingKey = "shift.modified";
    public const string EquityChangedRoutingKey = "equity.changed";

    public static readonly string[] AllRoutingKeys =
    [
        PlanningGeneratedRoutingKey,
        LeaveApprovedRoutingKey,
        EmployeeUpdatedRoutingKey,
        ShiftModifiedRoutingKey,
        EquityChangedRoutingKey
    ];
}
