import { Component } from '@angular/core';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-employee-planning',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">My Planning</h1>
          <p class="text-slate-500">Consult your monthly schedule and shift details.</p>
        </div>
        <div class="flex items-center gap-4 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <span class="text-sm font-bold text-slate-700 px-4">April 2026</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          @for (day of weekDays; track day) {
            <div class="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ day }}</div>
          }
        </div>
        <div class="grid grid-cols-7 divide-x divide-y divide-slate-100">
          @for (day of days; track day) {
            <div class="min-h-[120px] p-3 hover:bg-slate-50 transition-colors">
              <span class="text-xs font-bold text-slate-400">{{ day }}</span>
              <div [class]="cn('mt-2 p-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-center', getShiftType(day) === 'OFF' ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100')">
                {{ getShiftType(day) === 'OFF' ? 'Repos' : 'Shift ' + getShiftType(day) }}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [],
})
export class EmployeePlanningComponent {
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  days = Array.from({ length: 30 }, (_, i) => i + 1);

  getShiftType(day: number): string {
    if (day % 7 === 5 || day % 7 === 6) return 'OFF';
    if (day % 3 === 0) return 'A';
    if (day % 3 === 1) return 'B';
    return 'C';
  }
  cn = cn;
}
