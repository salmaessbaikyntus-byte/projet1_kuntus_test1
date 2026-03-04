namespace ShiftMaster.Analytics.Service.Application.DTOs;

public record MyEquityDto(decimal GlobalScore, IReadOnlyList<EquityMetricDto> Metrics, IReadOnlyList<EquityEvolutionDto> MonthlyEvolution);
public record EquityMetricDto(string Name, decimal Value, string Unit);
public record EquityEvolutionDto(int Year, int Month, decimal Score);
public record TeamRankingDto(IReadOnlyList<TeamMemberRankingDto> Rankings);
public record TeamMemberRankingDto(int Rank, string EmployeeId, string Name, decimal Score);

public record KpiDto(string Type, string Label, decimal Value, string Unit, decimal? Trend, string Status);
public record HeatmapDto(string[] Days, string[] Shifts, decimal[][] Values, decimal Target);
public record SimulateRequestDto(decimal StaffChangePercent, decimal? AbsenteeismRate);
public record SimulateResultDto(decimal CoverageImpact, int RuleViolations, IReadOnlyList<AlertDto> Alerts);
public record AlertDto(string Severity, string Message);

public record DashboardAlertDto(string Id, string Type, string Title, string Message, string Priority, string Time, string Team);
public record RecentActivityDto(string User, string Action, string Target, string Time);
public record AuditLogDto(string Id, string User, string Action, string Target, string Timestamp, bool IsSensitive);
