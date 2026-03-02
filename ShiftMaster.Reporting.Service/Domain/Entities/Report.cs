namespace ShiftMaster.Reporting.Service.Domain.Entities;

public class Report
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ReportType { get; set; } = string.Empty;
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public string Author { get; set; } = string.Empty;
    public ReportStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? GeneratedAt { get; set; }
    public string? ErrorMessage { get; set; }
    public byte[]? PdfContent { get; set; }
}

public enum ReportStatus { GENERATED, OBSOLETE, ARCHIVED }
