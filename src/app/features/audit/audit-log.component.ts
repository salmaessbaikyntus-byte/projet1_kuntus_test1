import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../core/services/analytics.service';

interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  isSensitive: boolean;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Audit Log & Traceability</h1>
          <p class="text-slate-500 dark:text-slate-400">Full history of system actions for compliance and audit purposes.</p>
        </div>
        <div class="flex gap-3">
          <button type="button" class="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white">Export CSV</button>
          <button type="button" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Export PDF</button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-4">
        <input type="text" placeholder="Search logs..." [ngModel]="search()" (ngModelChange)="search.set($event)" class="w-full max-w-md pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
      </div>

      @if (loading()) {
        <p class="text-slate-500 dark:text-slate-400">Loading...</p>
      } @else {
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Timestamp</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">User</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Action</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Target</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Security</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              @for (log of filteredLogs(); track log.id) {
                <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td class="p-4 text-xs font-mono text-slate-500 dark:text-slate-400">{{ log.timestamp }}</td>
                  <td class="p-4">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 bg-slate-100 dark:bg-slate-600 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">{{ log.user[0] }}</div>
                      <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ log.user }}</span>
                    </div>
                  </td>
                  <td class="p-4"><span class="text-sm font-semibold text-slate-900 dark:text-white">{{ log.action }}</span></td>
                  <td class="p-4 text-sm text-slate-600 dark:text-slate-400">{{ log.target }}</td>
                  <td class="p-4 text-right">
                    @if (log.isSensitive) {
                      <span class="inline-flex px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-[10px] font-bold uppercase tracking-wider">Sensitive</span>
                    } @else {
                      <span class="inline-flex px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider">Standard</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  imports: [FormsModule],
})
export class AuditLogComponent implements OnInit {
  private readonly analytics = inject(AnalyticsService);

  loading = signal(true);
  search = signal('');
  logs = signal<AuditLogEntry[]>([]);

  filteredLogs = computed(() => {
    const s = this.search().toLowerCase();
    const list = this.logs();
    if (!s) return list;
    return list.filter((log) =>
      log.action.toLowerCase().includes(s) ||
      log.user.toLowerCase().includes(s) ||
      log.target.toLowerCase().includes(s)
    );
  });

  ngOnInit(): void {
    this.analytics.getAuditLog().subscribe({
      next: (entries) => {
        this.logs.set(entries);
        this.loading.set(false);
      },
      error: () => {
        this.logs.set([]);
        this.loading.set(false);
      },
    });
  }
}
