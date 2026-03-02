# ShiftMaster Backend - Architecture Microservices .NET 8

Backend pour la plateforme ShiftMaster - Enterprise Workforce Planning.

## Stack

- .NET 8 Web API (microservices)
- PostgreSQL (1 base par microservice)
- JWT + ASP.NET Core Identity
- Gateway YARP
- RabbitMQ (événements async)
- Docker & Docker Compose
- Swagger / OpenAPI
- Serilog
- HealthChecks
- FluentValidation

## Microservices

| Service | Port | Endpoints |
|---------|------|-----------|
| **Auth** | 5000 | POST /api/auth/login, GET /api/auth/me |
| **Employee** | 5001 | GET /api/employees/me, GET /api/employees/{id} |
| **Planning** | 5002 | GET /api/planning/today, /week, /month, POST /api/planning/simulate |
| **Absence** | 5003 | GET /api/leaves/me, POST /api/leaves, PUT /api/leaves/{id}/cancel |
| **Analytics** | 5004 | GET /api/analytics/my-equity, GET /api/analytics/team-ranking |
| **Notification** | 5005 | GET /api/notifications/me, PUT /api/notifications/{id}/read |
| **Gateway YARP** | 5006 | Route vers tous les services |

## Démarrage

### 1. Infrastructure (PostgreSQL + RabbitMQ)

```bash
docker-compose up -d
```

### 2. Lancer les services

```bash
# Auth Service
dotnet run --project ShiftMaster.Auth.Service

# Employee Service
dotnet run --project ShiftMaster.Employee.Service

# Planning Service
dotnet run --project ShiftMaster.Planning.Service

# Absence Service
dotnet run --project ShiftMaster.Absence.Service

# Analytics Service
dotnet run --project ShiftMaster.Analytics.Service

# Notification Service
dotnet run --project ShiftMaster.Notification.Service

# Gateway
dotnet run --project ShiftMaster.Gateway
```

### 3. Utilisateurs seedés (Auth)

- Admin: `admin@shiftmaster.com` / `Admin123!`
- Manager: `manager@shiftmaster.com` / `Manager123!`
- Employee: `alice@shiftmaster.com` / `Employee123!`

## Événements RabbitMQ

- `PlanningGeneratedEvent`
- `LeaveApprovedEvent`
- `EmployeeUpdatedEvent`
- `ShiftModifiedEvent`
- `EquityChangedEvent`

## Architecture par microservice

```
/Domain        - Entities, Enums, Interfaces
/Application   - DTOs, Services, Validators
/Infrastructure - Persistence (EF Core), Messaging (RabbitMQ)
/API           - Controllers, Filters, Program.cs
```
