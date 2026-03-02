using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftMaster.Employee.Service.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeOrganisation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeOrganisation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Pole = table.Column<string>(type: "text", nullable: false),
                    Cellule = table.Column<string>(type: "text", nullable: false),
                    Departement = table.Column<string>(type: "text", nullable: true),
                    Nom = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeOrganisation", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "EmployeOrganisation");
        }
    }
}
