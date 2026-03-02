namespace ShiftMaster.Analytics.Service.Application.DTOs;

public record MyEquityDto(decimal GlobalScore, IReadOnlyList<EquityMetricDto> Metrics, IReadOnlyList<EquityEvolutionDto> MonthlyEvolution);
public record EquityMetricDto(string Name, decimal Value, string Unit);
public record EquityEvolutionDto(int Year, int Month, decimal Score);
public record TeamRankingDto(IReadOnlyList<TeamMemberRankingDto> Rankings);
public record TeamMemberRankingDto(int Rank, string EmployeeId, string Name, decimal Score);
