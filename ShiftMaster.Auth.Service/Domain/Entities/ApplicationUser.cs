using Microsoft.AspNetCore.Identity;
using ShiftMaster.Auth.Service.Domain.Enums;

namespace ShiftMaster.Auth.Service.Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}".Trim();
    public string? CellId { get; set; }
    public Role Role { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
