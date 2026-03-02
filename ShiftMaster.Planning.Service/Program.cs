using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RabbitMQ.Client;
using Serilog;
using ShiftMaster.Planning.Service.Application.Interfaces;
using ShiftMaster.Planning.Service.Application.Services;
using ShiftMaster.Planning.Service.Domain.Interfaces;
using ShiftMaster.Planning.Service.Infrastructure.Messaging;
using ShiftMaster.Planning.Service.Infrastructure.Persistence;
using ShiftMaster.Planning.Service.API.Filters;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((c, lc) => lc.ReadFrom.Configuration(c.Configuration).WriteTo.Console());

builder.Services.AddControllers(o => o.Filters.Add<CorrelationIdFilter>());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new() { Title = "ShiftMaster Planning API", Version = "v1" }));

builder.Services.AddDbContext<PlanningDbContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IConnection>(sp =>
{
    var f = new ConnectionFactory { HostName = builder.Configuration["RabbitMQ:Host"] ?? "localhost" };
    return f.CreateConnection();
});

var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key required");
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

builder.Services.AddScoped<IShiftRepository, ShiftRepository>();
builder.Services.AddScoped<IPlanningAlgorithm, ShiftMaster.Planning.Service.Application.Algorithms.GreedyPlanningAlgorithm>();
builder.Services.AddScoped<IPlanningService, PlanningService>();
builder.Services.AddScoped<IEventPublisher, RabbitMqEventPublisher>();
builder.Services.AddHealthChecks().AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

var app = builder.Build();
using (var scope = app.Services.CreateScope())
    await scope.ServiceProvider.GetRequiredService<PlanningDbContext>().Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");
app.Run();
