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
using Scalar.AspNetCore;
using ShiftMaster.Planning.Service.API.Filters;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((c, lc) =>
    lc.ReadFrom.Configuration(c.Configuration)
      .Enrich.FromLogContext()
      .WriteTo.Console());

builder.Services.AddControllers(o => o.Filters.Add<CorrelationIdFilter>());
builder.Services.AddOpenApi();

builder.Services.AddDbContext<PlanningDbContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IConnection>(sp =>
{
    var f = new ConnectionFactory
    {
        HostName = builder.Configuration["RabbitMQ:Host"] ?? "localhost",
        Port = int.Parse(builder.Configuration["RabbitMQ:Port"] ?? "5672"),
        UserName = builder.Configuration["RabbitMQ:Username"] ?? "guest",
        Password = builder.Configuration["RabbitMQ:Password"] ?? "guest"
    };
    return f.CreateConnection();
});

var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key required");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

builder.Services.AddScoped<IShiftRepository, ShiftRepository>();
builder.Services.AddScoped<IPlanningAlgorithm, ShiftMaster.Planning.Service.Application.Algorithms.GreedyPlanningAlgorithm>();
builder.Services.AddScoped<IPlanningService, PlanningService>();
builder.Services.AddScoped<IEventPublisher, RabbitMqEventPublisher>();
var rabbitUri = $"amqp://{builder.Configuration["RabbitMQ:Username"] ?? "guest"}:{builder.Configuration["RabbitMQ:Password"] ?? "guest"}@{builder.Configuration["RabbitMQ:Host"] ?? "localhost"}:{builder.Configuration["RabbitMQ:Port"] ?? "5672"}/";
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!)
    .AddRabbitMQ(rabbitUri, name: "rabbitmq");

var app = builder.Build();
using (var scope = app.Services.CreateScope())
    await scope.ServiceProvider.GetRequiredService<PlanningDbContext>().Database.EnsureCreatedAsync();

app.MapOpenApi();
if (app.Environment.IsDevelopment())
    app.MapScalarApiReference();
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");
app.Run();
