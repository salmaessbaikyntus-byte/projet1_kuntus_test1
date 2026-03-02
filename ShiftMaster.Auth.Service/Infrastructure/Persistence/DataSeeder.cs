using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShiftMaster.Auth.Service.Domain.Entities;
using ShiftMaster.Auth.Service.Domain.Enums;

namespace ShiftMaster.Auth.Service.Infrastructure.Persistence;

public static class DataSeeder
{
    private const string DefaultPassword = "ShiftMaster123!";

    public static async Task SeedAsync(AuthDbContext context, UserManager<ApplicationUser> userManager)
    {
        await context.Database.MigrateAsync();

        var fakeUsers = new List<(ApplicationUser User, string Password)>
        {
            // Admin
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "admin@shiftmaster.com",
                Email = "admin@shiftmaster.com",
                FirstName = "Admin",
                LastName = "ShiftMaster",
                Role = Role.Admin,
                CellId = null,
                EmailConfirmed = true
            }, DefaultPassword),

            // Managers
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "manager@shiftmaster.com",
                Email = "manager@shiftmaster.com",
                FirstName = "Jean",
                LastName = "Manager",
                Role = Role.Manager,
                CellId = "cell-emergency-1",
                EmailConfirmed = true
            }, DefaultPassword),
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "sarah.manager@shiftmaster.com",
                Email = "sarah.manager@shiftmaster.com",
                FirstName = "Sarah",
                LastName = "Martin",
                Role = Role.Manager,
                CellId = "cell-support-1",
                EmailConfirmed = true
            }, DefaultPassword),
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "karim.manager@shiftmaster.com",
                Email = "karim.manager@shiftmaster.com",
                FirstName = "Karim",
                LastName = "Benali",
                Role = Role.Manager,
                CellId = "cell-securisation-1",
                EmailConfirmed = true
            }, DefaultPassword),

            // RH
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "rh@shiftmaster.com",
                Email = "rh@shiftmaster.com",
                FirstName = "Fatima",
                LastName = "Ressources Humaines",
                Role = Role.RH,
                CellId = null,
                EmailConfirmed = true
            }, DefaultPassword),
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "nadia.rh@shiftmaster.com",
                Email = "nadia.rh@shiftmaster.com",
                FirstName = "Nadia",
                LastName = "El Amrani",
                Role = Role.RH,
                CellId = null,
                EmailConfirmed = true
            }, DefaultPassword),

            // Auditor
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "auditor@shiftmaster.com",
                Email = "auditor@shiftmaster.com",
                FirstName = "Omar",
                LastName = "Auditeur",
                Role = Role.Auditor,
                CellId = null,
                EmailConfirmed = true
            }, DefaultPassword),

            // Employee
            (new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "alice@shiftmaster.com",
                Email = "alice@shiftmaster.com",
                FirstName = "Alice",
                LastName = "Durand",
                Role = Role.Employee,
                CellId = "cell-emergency-1",
                EmailConfirmed = true
            }, DefaultPassword)
        };

        foreach (var (user, password) in fakeUsers)
        {
            if (await userManager.FindByEmailAsync(user.Email!) == null)
            {
                await userManager.CreateAsync(user, password);
            }
        }
    }
}
