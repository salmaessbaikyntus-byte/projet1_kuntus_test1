import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService, EmployeeProfile } from '../../core/services/employee.service';
import { EquityWidgetComponent } from '../../shared/components/equity-widget/equity-widget.component';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [EquityWidgetComponent],
  template: `
    <div class="space-y-8">
      @if (loading()) {
        <p class="text-slate-500">Loading...</p>
      } @else if (profile(); as employee) {
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Hello, {{ employee.firstName }}</h1>
            <p class="text-slate-500 dark:text-slate-400">Here's your schedule and status for today.</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ today }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ time }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <h3 class="text-sm font-bold uppercase tracking-wider opacity-80 mb-4">My Shift Today</h3>
            <p class="text-2xl font-bold mb-1">09:00 → 16:00</p>
            <p class="text-indigo-100 text-xs mb-4">Shift A • {{ employee.department }}</p>
            <span class="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">In Progress</span>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Leave Balance</h3>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ employee.leaveBalance }}j</span>
              <span class="text-xs text-slate-400 font-bold mb-1.5">Remaining</span>
            </div>
          </div>
          <div class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg shadow-slate-900/20">
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Equity Score</h3>
            <div class="flex items-center gap-4">
              <app-equity-widget [score]="employee.equityScore" />
              <span class="text-xs text-emerald-400 font-bold">+5% this month</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 dark:border-slate-700">
            <h3 class="font-bold text-slate-900 dark:text-white">Weekly Schedule</h3>
          </div>
          <div class="p-6">
            <div class="flex gap-4 overflow-x-auto pb-2">
              @for (day of weekDays; track day; let i = $index) {
                <div [class]="cn('flex-1 min-w-[100px] p-4 rounded-xl border transition-all', i === 0 ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 ring-2 ring-indigo-100 dark:ring-indigo-900/50' : 'bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-600')">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{{ day }}</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ i === 0 ? '09:00 - 16:00' : (i === 5 || i === 6) ? 'OFF' : '08:00 - 16:00' }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      } @else {
        <p class="text-slate-500">No profile found. Please log in as an employee.</p>
      }
    </div>
  `,
})
export class EmployeeDashboardComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);

  loading = signal(true);
  profile = signal<EmployeeProfile | null>(null);
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  cn = cn;

  ngOnInit(): void {
    this.employeeService.getMe().subscribe({
      next: (p) => { this.profile.set(p); this.loading.set(false); },
      error: () => { this.profile.set(null); this.loading.set(false); },
    });
  }
}
