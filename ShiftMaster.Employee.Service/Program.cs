using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShiftMaster.Employee.Service.Application.Interfaces;
using ShiftMaster.Employee.Service.Application.Services;
using ShiftMaster.Employee.Service.Domain.Interfaces;
using ShiftMaster.Employee.Service.Infrastructure.Messaging;
using ShiftMaster.Employee.Service.Infrastructure.Persistence;
using ShiftMaster.Employee.Service.API.Filters;
using RabbitMQ.Client;
using Scalar.AspNetCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((ctx, lc) =>
    lc.ReadFrom.Configuration(ctx.Configuration)
      .Enrich.FromLogContext()
      .WriteTo.Console());

builder.Services.AddControllers(options => options.Filters.Add<CorrelationIdFilter>());
builder.Services.AddOpenApi();

builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSingleton<IConnection>(sp =>
{
    var factory = new ConnectionFactory
    {
        HostName = builder.Configuration["RabbitMQ:Host"] ?? "localhost",
        Port = int.Parse(builder.Configuration["RabbitMQ:Port"] ?? "5672"),
        UserName = builder.Configuration["RabbitMQ:Username"] ?? "guest",
        Password = builder.Configuration["RabbitMQ:Password"] ?? "guest"
    };
    return factory.CreateConnection();
});

var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key not configured");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.Configure<ShiftMaster.Employee.Service.Infrastructure.Planning.PlanningClientOptions>(
    builder.Configuration.GetSection(ShiftMaster.Employee.Service.Infrastructure.Planning.PlanningClientOptions.Section));
builder.Services.AddHttpClient(nameof(ShiftMaster.Employee.Service.Infrastructure.Planning.HttpShiftStatisticsProvider));
builder.Services.AddScoped<IShiftStatisticsProvider, ShiftMaster.Employee.Service.Infrastructure.Planning.HttpShiftStatisticsProvider>();
builder.Services.AddScoped<IEquityScoreService, EquityScoreService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEventPublisher, RabbitMqEventPublisher>();

var rabbitUri = $"amqp://{builder.Configuration["RabbitMQ:Username"] ?? "guest"}:{builder.Configuration["RabbitMQ:Password"] ?? "guest"}@{builder.Configuration["RabbitMQ:Host"] ?? "localhost"}:{builder.Configuration["RabbitMQ:Port"] ?? "5672"}/";
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!)
    .AddRabbitMQ(rabbitUri, name: "rabbitmq");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<EmployeeDbContext>();
    await DataSeeder.SeedAsync(context);
}

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
