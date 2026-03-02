using Microsoft.EntityFrameworkCore;
using ShiftMaster.Reporting.Service.Domain.Entities;

namespace ShiftMaster.Reporting.Service.Infrastructure.Persistence;

public static class DataSeeder
{
    public static async Task SeedAsync(ReportingDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (await context.Reports.AnyAsync())
            return;

        var baseDate = DateTime.UtcNow.Date;
        var reports = new List<Report>
        {
            CreateReport("Planning Semaine 10", "Planning", "PlanningHebdo", baseDate.AddDays(-14), baseDate.AddDays(-8), "Jean Manager"),
            CreateReport("Planning Semaine 11", "Planning", "PlanningHebdo", baseDate.AddDays(-7), baseDate.AddDays(-1), "Jean Manager"),
            CreateReport("Effectifs Urgences", "Effectifs", "EffectifsParDepartement", baseDate.AddMonths(-1), baseDate.AddMonths(-1).AddDays(27), "Marie RH"),
            CreateReport("Performance Q1", "Performance", "PerformanceEquipe", baseDate.AddMonths(-3), baseDate.AddMonths(-1), "Fatima RH"),
            CreateReport("Congés Solde", "Congés", "SoldeConges", baseDate, baseDate.AddMonths(1), "Nadia RH")
        };

        context.Reports.AddRange(reports);
        await context.SaveChangesAsync();
    }

    private static Report CreateReport(string name, string category, string reportType, DateTime start, DateTime end, string author)
    {
        var r = new Report
        {
            Id = Guid.NewGuid(),
            Name = name,
            Category = category,
            ReportType = reportType,
            PeriodStart = start,
            PeriodEnd = end,
            Author = author,
            Status = ReportStatus.GENERATED,
            CreatedAt = DateTime.UtcNow.AddDays(-Random.Shared.Next(1, 30)),
            GeneratedAt = DateTime.UtcNow.AddDays(-Random.Shared.Next(0, 5))
        };
        r.PdfContent = System.Text.Encoding.UTF8.GetBytes($"Mock PDF: {name}\n{category}\n{reportType}\n{start:yyyy-MM-dd} - {end:yyyy-MM-dd}\n{author}");
        return r;
    }
}
