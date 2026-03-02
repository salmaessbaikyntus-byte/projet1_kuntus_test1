namespace ShiftMaster.Planning.Service.Application.DTOs;

public record TodayPlanningDto(IReadOnlyList<ShiftDto> Shifts, PlanningKpisDto? Kpis);
public record WeekPlanningDto(IReadOnlyList<ShiftDto> Shifts, DateTime WeekStart, DateTime WeekEnd, PlanningKpisDto? Kpis);
public record MonthPlanningDto(IReadOnlyList<ShiftDto> Shifts, int Year, int Month, PlanningKpisDto? Kpis);
public record PlanningKpisDto(decimal Coverage, decimal EquityScore, int AssignedEmployees, int UncoveredSlots, bool IsCompliant);
public record SimulateRequest(DateTime WeekStart, string CellId);
public record SimulateResponse(Guid PlanningId, DateTime WeekStart, decimal Coverage, bool IsCompliant);
