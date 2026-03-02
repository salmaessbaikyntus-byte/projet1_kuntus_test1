import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_AUDIT } from '../../shared/mock-data';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Audit Log & Traceability</h1>
          <p class="text-slate-500">Full history of system actions for compliance and audit purposes.</p>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50">Export CSV</button>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Export PDF</button>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <input type="text" placeholder="Search logs..." [ngModel]="search()" (ngModelChange)="search.set(\$event)" class="w-full max-w-md pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Timestamp</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">User</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Action</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Target</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Security</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (log of filteredLogs(); track log.id) {
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 text-xs font-mono text-slate-500">{{ log.timestamp }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">{{ log.user[0] }}</div>
                    <span class="text-sm font-medium text-slate-700">{{ log.user }}</span>
                  </div>
                </td>
                <td class="p-4"><span class="text-sm font-semibold text-slate-900">{{ log.action }}</span></td>
                <td class="p-4 text-sm text-slate-600">{{ log.target }}</td>
                <td class="p-4 text-right">
                  @if (log.isSensitive) {
                    <span class="inline-flex px-2 py-1 bg-red-50 text-red-700 rounded text-[10px] font-bold uppercase tracking-wider">Sensitive</span>
                  } @else {
                    <span class="inline-flex px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider">Standard</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  imports: [FormsModule],
})
export class AuditLogComponent {
  search = signal('');
  MOCK_AUDIT = MOCK_AUDIT;

  filteredLogs = () => {
    const s = this.search().toLowerCase();
    return MOCK_AUDIT.filter((log) => log.action.toLowerCase().includes(s) || log.user.toLowerCase().includes(s) || log.target.toLowerCase().includes(s));
  };
}
