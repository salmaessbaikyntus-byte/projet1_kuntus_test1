import { Component, inject, OnInit, signal } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Alertes</h1>
        <p class="text-slate-500 dark:text-slate-400">Consulter et gérer les alertes système.</p>
      </div>
      @if (loading()) {
        <p class="text-slate-500 dark:text-slate-400">Chargement...</p>
      } @else {
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <h3 class="font-bold text-slate-900 dark:text-white">Alertes critiques</h3>
            <span class="px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-[10px] font-bold uppercase tracking-wider">{{ alerts().length }} alerte(s)</span>
          </div>
          <div class="divide-y divide-slate-100 dark:divide-slate-700">
            @for (alert of alerts(); track alert.id) {
              <div class="p-4 flex gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                <div [class]="alert.priority === 'P1' ? 'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'">
                  <span [innerHTML]="alertCircleIcon"></span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-bold text-slate-900 dark:text-white">{{ alert.title }}</p>
                    <span class="text-[10px] text-slate-400 font-medium">{{ alert.time }}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ alert.message }}</p>
                  <p class="text-[10px] text-slate-400 mt-1">{{ alert.team }} • {{ alert.type }}</p>
                </div>
              </div>
            }
          </div>
          @if (alerts().length === 0) {
            <div class="p-8 text-center text-slate-500 dark:text-slate-400">Aucune alerte pour le moment.</div>
          }
        </div>
      }
    </div>
  `,
  imports: [],
})
export class AlertsComponent implements OnInit {
  private readonly analytics = inject(AnalyticsService);

  loading = signal(true);
  alerts = signal<{ id: string; type: string; title: string; message: string; priority: string; time: string; team: string }[]>([]);

  alertCircleIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';

  ngOnInit(): void {
    this.analytics.getAlerts().subscribe({
      next: (a) => { this.alerts.set(a); this.loading.set(false); },
      error: () => { this.alerts.set([]); this.loading.set(false); },
    });
  }
}
