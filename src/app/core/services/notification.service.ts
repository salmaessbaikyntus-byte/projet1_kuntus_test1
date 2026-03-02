import { Injectable, signal } from '@angular/core';
import { AlertSeverity } from '../../shared/models';

export interface AppNotification {
  id: string;
  type: 'kpi' | 'report' | 'alert';
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSignal = signal<AppNotification[]>([]);
  readonly notifications = this.notificationsSignal.asReadonly();

  /** Notifier un KPI critique */
  notifyKpiCritical(label: string, message: string): void {
    this.add({
      id: `kpi-${Date.now()}`,
      type: 'kpi',
      severity: 'critical',
      title: `KPI: ${label}`,
      message,
      timestamp: new Date(),
      read: false,
    });
  }

  /** Notifier rapport prêt */
  notifyReportReady(reportName: string): void {
    this.add({
      id: `report-${Date.now()}`,
      type: 'report',
      severity: 'info',
      title: 'Rapport prêt',
      message: `${reportName} a été généré.`,
      timestamp: new Date(),
      read: false,
    });
  }

  /** Alerte violation métier */
  notifyAlert(severity: AlertSeverity, message: string): void {
    this.add({
      id: `alert-${Date.now()}`,
      type: 'alert',
      severity,
      title: 'Alerte',
      message,
      timestamp: new Date(),
      read: false,
    });
  }

  private add(n: AppNotification): void {
    this.notificationsSignal.update((list) => [n, ...list].slice(0, 50));
  }

  markAsRead(id: string): void {
    this.notificationsSignal.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  clearAll(): void {
    this.notificationsSignal.set([]);
  }
}
