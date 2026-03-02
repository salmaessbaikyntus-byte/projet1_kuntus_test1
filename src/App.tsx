import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './core/auth/AuthContext';
import { MainLayout } from './core/layout/MainLayout';
import { DashboardModule } from './features/dashboard/DashboardModule';
import { PlanningModule } from './features/planning/PlanningModule';
import { AnalyticsModule } from './features/analytics/AnalyticsModule';
import { ReportingModule } from './features/reporting/ReportingModule';
import { EmployeesModule } from './features/employees/EmployeesModule';
import { ApprovalsModule } from './features/approvals/ApprovalsModule';
import { TeamOverviewModule } from './features/team/TeamOverviewModule';
import { AlertsModule } from './features/alerts/AlertsModule';
import { AuditLogModule } from './features/audit/AuditLogModule';
import { BusinessRulesModule } from './features/settings/BusinessRulesModule';
import { EmployeeDashboard } from './features/employee/EmployeeDashboard';
import { EmployeePlanning } from './features/employee/EmployeePlanning';
import { EmployeeLeaves } from './features/employee/EmployeeLeaves';
import { EmployeeEquity } from './features/employee/EmployeeEquity';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Reset active tab when role changes to avoid 404-like states
  useEffect(() => {
    if (user?.role === 'EMPLOYEE') {
      setActiveTab('employee-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  }, [user?.role]);

  const renderContent = () => {
    switch (activeTab) {
      // Manager / Admin Views
      case 'dashboard': return <DashboardModule setActiveTab={setActiveTab} />;
      case 'approvals': return <ApprovalsModule />;
      case 'planning': return <PlanningModule />;
      case 'team': return <TeamOverviewModule />;
      case 'analytics': return <AnalyticsModule />;
      case 'reporting': return <ReportingModule />;
      case 'employees': return <EmployeesModule />;
      case 'alerts': return <AlertsModule />;
      case 'audit': return <AuditLogModule />;
      case 'settings': return <BusinessRulesModule />;
      
      // Employee Views
      case 'employee-dashboard': return <EmployeeDashboard />;
      case 'employee-planning': return <EmployeePlanning />;
      case 'employee-leaves': return <EmployeeLeaves />;
      case 'employee-equity': return <EmployeeEquity />;

      case 'leaves':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <span className="text-2xl">🌴</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Leaves Management</h2>
            <p className="text-slate-500 max-w-md">This module is currently under development. Here you will be able to manage leave requests and balances.</p>
          </div>
        );
      default:
        return user?.role === 'EMPLOYEE' ? <EmployeeDashboard /> : <DashboardModule setActiveTab={setActiveTab} />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
