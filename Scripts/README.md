# Scripts de remplissage base de données

## EmployeOrganisation (shiftmaster_employees)

### Option 1 : Via le DataSeeder au démarrage
Au démarrage du service `ShiftMaster.Employee.Service`, le DataSeeder insère automatiquement les 65 employés d'organisation si la table est vide.

### Option 2 : Script SQL manuel
```bash
psql -h localhost -p 5432 -U postgres -d shiftmaster_employees -f seed_employe_organisation.sql
```

## Utilisateurs Auth (Manager, RH, Admin, Auditor) - shiftmaster_auth

Les utilisateurs fake sont créés automatiquement au démarrage de `ShiftMaster.Auth.Service` via le DataSeeder.

**Identifiants par défaut** (mot de passe : `ShiftMaster123!`) :
| Rôle   | Email                        |
|--------|------------------------------|
| Admin  | admin@shiftmaster.com        |
| Manager| manager@shiftmaster.com      |
| Manager| sarah.manager@shiftmaster.com|
| Manager| karim.manager@shiftmaster.com|
| RH     | rh@shiftmaster.com           |
| RH     | nadia.rh@shiftmaster.com     |
| Auditor| auditor@shiftmaster.com      |
| Employee| alice@shiftmaster.com       |
