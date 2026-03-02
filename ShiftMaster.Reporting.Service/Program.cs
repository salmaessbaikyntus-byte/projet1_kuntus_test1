using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShiftMaster.Reporting.Service.Application.Interfaces;
using ShiftMaster.Reporting.Service.Application.Services;
using ShiftMaster.Reporting.Service.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new() { Title = "ShiftMaster Reporting API", Version = "v1" }));

builder.Services.AddDbContext<ReportingDbContext>(o =>
    o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Host=localhost;Database=shiftmaster_reporting;Username=postgres;Password=123456789"));

var jwtKey = builder.Configuration["Jwt:Key"] ?? "ShiftMaster_SuperSecret_Key_For_JWT_Min32Chars!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddScoped<IReportingService, ReportingService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
    await DataSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<ReportingDbContext>());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
