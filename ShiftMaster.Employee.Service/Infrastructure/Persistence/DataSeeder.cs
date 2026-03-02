using Microsoft.EntityFrameworkCore;
using ShiftMaster.Employee.Service.Domain.Entities;
using ShiftMaster.Employee.Service.Domain.Enums;

using EmployeeEntity = ShiftMaster.Employee.Service.Domain.Entities.Employee;

namespace ShiftMaster.Employee.Service.Infrastructure.Persistence;

public static class DataSeeder
{
    public static async Task SeedAsync(EmployeeDbContext context)
    {
        await context.Database.MigrateAsync();

        await SeedEmployeOrganisationAsync(context);

        if (await context.Employees.AnyAsync())
            return;

        var aliceId = Guid.NewGuid();
        var alice = new EmployeeEntity
        {
            Id = aliceId,
            UserId = "00000000-0000-0000-0000-000000000001",
            FirstName = "Alice",
            LastName = "Durand",
            Email = "alice@shiftmaster.com",
            JobTitle = "Nurse",
            Department = "Emergency",
            CellId = "cell-emergency-1",
            Role = "EMPLOYEE",
            Status = EmployeeStatus.Active,
            ContractType = ContractType.CDI,
            Seniority = Seniority.Senior,
            EquityScore = 85,
            LeaveBalance = 12.5m,
            CreatedAt = DateTime.UtcNow,
            Skills =
            [
                new EmployeeSkill { Id = Guid.NewGuid(), EmployeeId = aliceId, Name = "ICU", Level = 3 },
                new EmployeeSkill { Id = Guid.NewGuid(), EmployeeId = aliceId, Name = "Triage", Level = 3 }
            ],
            AvailabilitySlots = CreateDefaultAvailability(aliceId)
        };
        context.Employees.Add(alice);

        var bobId = Guid.NewGuid();
        context.Employees.Add(new EmployeeEntity
        {
            Id = bobId,
            UserId = Guid.NewGuid().ToString(),
            FirstName = "Bob",
            LastName = "Lefebvre",
            Email = "bob@shiftmaster.com",
            JobTitle = "Nurse",
            Department = "Emergency",
            CellId = "cell-emergency-1",
            Role = "EMPLOYEE",
            Status = EmployeeStatus.Active,
            ContractType = ContractType.CDI,
            Seniority = Seniority.Mid,
            EquityScore = 78,
            LeaveBalance = 8,
            CreatedAt = DateTime.UtcNow,
            Skills = [new EmployeeSkill { Id = Guid.NewGuid(), EmployeeId = bobId, Name = "Pediatrics", Level = 2 }],
            AvailabilitySlots = CreateDefaultAvailability(bobId)
        });

        await context.SaveChangesAsync();
    }

    private static async Task SeedEmployeOrganisationAsync(EmployeeDbContext context)
    {
        if (await context.EmployesOrganisation.AnyAsync())
            return;

        var orgs = new List<EmployeOrganisation>
        {
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "AIT NEJMA Meriem" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "BEGHDADI Fatima Zahra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "BELKASMI Younes" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "BOUCHAMMA Nour El Imane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "BOUGRIYENE Ouidad" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "DANTHIA Divine Perpetue Rossita" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "EL OUADGHIRI Hanane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "LAHROUR Zayneb" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "MBARKI Chaimae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "MELLOUKI Samah" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "NASSIF Rajae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "OUAZIZ Amal" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "OUHNIZI Khadija" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "TAIBI Mohammed" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Support Client", Departement = null, Nom = "YAZIDI Khadija" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "ABDELJALIL Zayneb" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "BOURAADA Nisrine" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "BRIRICH Chaimae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "DKHISSI Hadil" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "KHATIRI Kaouthar" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Satisfaction Client", Departement = null, Nom = "TAJ Ouafae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "LABIYED Islam" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "LAZAR Islam" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "HOUSSINI Souhaila" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "BEQQADA Youssra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "BELHOUARI Fatima Zahra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "MAACHI Imane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "NGOIMON Fabrice Ulrich" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "BADR Rajae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 1", Nom = "BENSAID Imane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 2", Nom = "BENHADDOU Samia" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 2", Nom = "MHAMDI Fayza" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 2", Nom = "Bah Mamadou Oury" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 3", Nom = "RAOUI Aouatif" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 3", Nom = "ZEROUAL Siham" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 3", Nom = "HARMA Raja" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "ZONE 3", Nom = "EL HASSANI SARA" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "CIBLE", Nom = "MEACH Hala" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "CIBLE", Nom = "DERRAZ Ikram" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle client", Cellule = "Gestion de retards", Departement = "CIBLE", Nom = "GUENGOMBE Abed Prince" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Rang 4 et plus & GRE", Departement = null, Nom = "ECH CHETOUANI Amal" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Rang 4 et plus & GRE", Departement = null, Nom = "MERNY Oumaima" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Rang 4 et plus & GRE", Departement = null, Nom = "SMEIRI Imane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "MERZAQ Wiam" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "LAHMIDI Sabah" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "BANANA Sabrine" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "OUDGHIRI Kaoutar" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "OUERDI Ayoub" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Cibles prioritaires", Departement = null, Nom = "TALBI Youssef" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Ticket CO", Departement = null, Nom = "AMIZIANE IMANE" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Ticket CO", Departement = null, Nom = "BENHEDDOU Chaimae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Ticket CO", Departement = null, Nom = "EL OUARYACHI Yassine" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Ticket CO", Departement = null, Nom = "ABOUCH Hind" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Planification PDC + Lissage", Departement = null, Nom = "MEZOUAR Ahlam" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Planification PDC + Lissage", Departement = null, Nom = "MANNAD Farah" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Planification PDC + Lissage", Departement = null, Nom = "ELKASSIMI Fatine" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Préparation de RDV", Departement = null, Nom = "NEJJAR Imane" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Préparation de RDV", Departement = null, Nom = "SIDALI Fatima Zahra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "DIALLO Souleymane Seydi" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "QERRECH Fatima Zahra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "SABER Chaymae" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "EL AMRANI Younes" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "FARES Mehdi" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "SGHIR Mariem" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "LABIYED Ghita" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "BOUZAKRI Fatima Zahra" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "BANANA Achraf" },
            new() { Id = Guid.NewGuid(), Pole = "Pôle sécurisation", Cellule = "Support VIP", Departement = null, Nom = "RHARBI Saad" }
        };

        context.EmployesOrganisation.AddRange(orgs);
        await context.SaveChangesAsync();
    }

    private static List<AvailabilitySlot> CreateDefaultAvailability(Guid employeeId)
    {
        var slots = new List<AvailabilitySlot>();
        for (var d = DayOfWeek.Monday; d <= DayOfWeek.Friday; d++)
        {
            slots.Add(new AvailabilitySlot
            {
                Id = Guid.NewGuid(),
                EmployeeId = employeeId,
                DayOfWeek = d,
                StartTime = new TimeOnly(8, 0),
                EndTime = new TimeOnly(18, 0),
                IsAvailable = true
            });
        }
        return slots;
    }
}
