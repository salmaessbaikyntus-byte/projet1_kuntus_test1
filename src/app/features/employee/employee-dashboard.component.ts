import { Component } from '@angular/core';
import { MOCK_EMPLOYEES } from '../../shared/mock-data';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Hello, {{ employee.firstName }}</h1>
          <p class="text-slate-500">Here's your schedule and status for today.</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-slate-900">March 1st, 2026</p>
          <p class="text-xs text-slate-500">17:25 PM</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-80 mb-4">My Shift Today</h3>
          <p class="text-2xl font-bold mb-1">09:00 → 16:00</p>
          <p class="text-indigo-100 text-xs mb-4">Shift A • Emergency Ward</p>
          <span class="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">In Progress</span>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Leave Balance</h3>
          <div class="flex items-end gap-2">
            <span class="text-3xl font-bold text-slate-900">{{ employee.leaveBalance }}j</span>
            <span class="text-xs text-slate-400 font-bold mb-1.5">Remaining</span>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Equity Score</h3>
          <div class="flex items-center gap-4">
            <div class="relative w-12 h-12 flex items-center justify-center">
              <span class="text-2xl font-bold text-slate-900">{{ employee.equityScore }}%</span>
            </div>
            <span class="text-xs text-emerald-600 font-bold">+5% this month</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100">
          <h3 class="font-bold text-slate-900">Weekly Schedule</h3>
        </div>
        <div class="p-6">
          <div class="flex gap-4 overflow-x-auto pb-2">
            @for (day of weekDays; track day; let i = $index) {
              <div [class]="cn('flex-1 min-w-[100px] p-4 rounded-xl border transition-all', i === 0 ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' : 'bg-slate-50 border-slate-100')">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{{ day }}</p>
                <p class="text-sm font-bold text-slate-900">{{ i === 0 ? '09:00 - 16:00' : (i === 5 || i === 6) ? 'OFF' : '08:00 - 16:00' }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [],
})
export class EmployeeDashboardComponent {
  employee = MOCK_EMPLOYEES[0];
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  cn = cn;
}
