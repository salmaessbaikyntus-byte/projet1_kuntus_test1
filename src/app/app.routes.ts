import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'approvals', loadComponent: () => import('./features/approvals/approvals.component').then(m => m.ApprovalsComponent) },
      { path: 'planning', loadComponent: () => import('./features/planning/planning.component').then(m => m.PlanningComponent) },
      { path: 'team', loadComponent: () => import('./features/team/team-overview.component').then(m => m.TeamOverviewComponent) },
      { path: 'analytics', loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'reporting', loadComponent: () => import('./features/reporting/reporting.component').then(m => m.ReportingComponent) },
      { path: 'employees', loadComponent: () => import('./features/employees/employees.component').then(m => m.EmployeesComponent) },
      { path: 'alerts', loadComponent: () => import('./features/alerts/alerts.component').then(m => m.AlertsComponent) },
      { path: 'audit', loadComponent: () => import('./features/audit/audit-log.component').then(m => m.AuditLogComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/business-rules.component').then(m => m.BusinessRulesComponent) },
      { path: 'employee-dashboard', loadComponent: () => import('./features/employee/employee-dashboard.component').then(m => m.EmployeeDashboardComponent) },
      { path: 'employee-planning', loadComponent: () => import('./features/employee/employee-planning.component').then(m => m.EmployeePlanningComponent) },
      { path: 'employee-leaves', loadComponent: () => import('./features/employee/employee-leaves.component').then(m => m.EmployeeLeavesComponent) },
      { path: 'employee-equity', loadComponent: () => import('./features/employee/employee-equity.component').then(m => m.EmployeeEquityComponent) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
