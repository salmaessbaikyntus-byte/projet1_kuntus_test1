import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_KPIS } from '../../shared/mock-data';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-planning',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Planning Generation</h1>
          <p class="text-slate-500">Configure and generate optimized schedules for your teams.</p>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 flex items-center gap-2">History</button>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm">Generate Planning</button>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-3 space-y-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 class="font-semibold text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-600"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Configuration
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Week</label>
                <select [(ngModel)]="selectedWeek" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Week 10 - 2026</option>
                  <option>Week 11 - 2026</option>
                  <option>Week 12 - 2026</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                <select class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Emergency Ward</option>
                  <option>Radiology</option>
                  <option>Pediatrics</option>
                </select>
              </div>
              <div class="pt-4 border-t border-slate-100">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-medium text-slate-700">Simulation Mode</span>
                  <button (click)="isSimulating.set(!isSimulating())" [class]="cn('w-10 h-5 rounded-full transition-colors relative', isSimulating() ? 'bg-indigo-600' : 'bg-slate-200')">
                    <div [class]="cn('absolute top-1 w-3 h-3 bg-white rounded-full transition-all', isSimulating() ? 'left-6' : 'left-1')"></div>
                  </button>
                </div>
                <p class="text-xs text-slate-400">Run generation without affecting live schedules.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-500 uppercase">Coverage</span>
              </div>
              <div class="flex items-end gap-2">
                <span class="text-2xl font-bold text-slate-900">{{ MOCK_KPIS.coverage }}%</span>
                <span class="text-xs text-emerald-600 font-medium mb-1">+2.4%</span>
              </div>
            </div>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-500 uppercase">Equity Score</span>
              </div>
              <div class="flex items-end gap-2">
                <span class="text-2xl font-bold text-slate-900">{{ MOCK_KPIS.equityScore }}/100</span>
                <span class="text-xs text-slate-400 font-medium mb-1">Target: 85</span>
              </div>
            </div>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-500 uppercase">Assigned</span>
              </div>
              <div class="text-2xl font-bold text-slate-900">{{ MOCK_KPIS.assignedEmployees }}</div>
            </div>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-500 uppercase">Compliance</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-emerald-700">Rule 10% Met</span>
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Schedule Preview</h3>
            </div>
            <div class="p-0 overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-100">
                    <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Employee</th>
                    @for (day of days; track day) {
                      <th class="p-4 text-[10px] font-bold text-slate-400 uppercase text-center">{{ day }}</th>
                    }
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @for (i of [1,2,3,4,5]; track i) {
                    <tr class="hover:bg-slate-50/50 transition-colors">
                      <td class="p-4">
                        <div class="flex items-center gap-3">
                          <div class="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">E{{ i }}</div>
                          <span class="text-sm font-medium text-slate-700">Employee {{ i }}</span>
                        </div>
                      </td>
                      @for (d of [1,2,3,4,5,6,7]; track d) {
                        <td class="p-2">
                          <div [class]="d % 3 === 0 ? 'h-8 rounded-md flex items-center justify-center text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100' : 'h-8 rounded-md flex items-center justify-center text-[10px] font-bold bg-slate-50 text-slate-300 border border-dashed border-slate-200'">
                            {{ d % 3 === 0 ? '08-16' : 'OFF' }}
                          </div>
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-3 space-y-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-slate-900 mb-6">Generation Progress</h3>
            <div class="space-y-6">
              @for (s of steps; track s.label; let idx = $index) {
                <div class="flex gap-4 relative">
                  <div [class]="s.status === 'completed' ? 'w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 bg-emerald-500 text-white' : s.status === 'active' ? 'w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 bg-indigo-600 text-white animate-pulse' : 'w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 bg-slate-100 text-slate-400'">
                    {{ s.status === 'completed' ? '✓' : idx + 1 }}
                  </div>
                  <div>
                    <p [class]="s.status === 'pending' ? 'text-sm font-medium text-slate-400' : 'text-sm font-medium text-slate-900'">{{ s.label }}</p>
                    <p class="text-[10px] text-slate-400">{{ s.status === 'completed' ? 'Finished at 14:22' : s.status === 'active' ? 'In progress...' : 'Waiting...' }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-orange-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <h4 class="text-sm font-bold uppercase tracking-wider">System Alerts</h4>
            </div>
            <div class="space-y-3">
              <div class="p-3 bg-white/5 rounded-lg border border-white/10">
                <p class="text-xs font-medium text-white/90">3 slots uncovered in Night Shift</p>
                <p class="text-[10px] text-white/40 mt-1">Requires manual override or extra staff.</p>
              </div>
              <div class="p-3 bg-white/5 rounded-lg border border-white/10">
                <p class="text-xs font-medium text-white/90">Skill gap detected: Radiology</p>
                <p class="text-[10px] text-white/40 mt-1">Only 1 senior technician available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [FormsModule],
})
export class PlanningComponent {
  MOCK_KPIS = MOCK_KPIS;
  isSimulating = signal(false);
  selectedWeek = 'Week 10 - 2026';
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  steps = [
    { label: 'Data Collection', status: 'completed' as const },
    { label: 'Constraint Analysis', status: 'completed' as const },
    { label: 'AI Generation', status: 'active' as const },
    { label: 'Validation & Publishing', status: 'pending' as const },
  ];
  cn = cn;
}
