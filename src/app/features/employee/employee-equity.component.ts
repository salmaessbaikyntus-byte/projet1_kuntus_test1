import { Component } from '@angular/core';
import { MOCK_EMPLOYEES } from '../../shared/mock-data';
import { EquityWidgetComponent } from '../../shared/components/equity-widget/equity-widget.component';

const EQUITY_COMPONENTS = [
  { name: 'Saturday Rotation', value: 35, score: 95, color: '#6366f1' },
  { name: 'Night Shift Balance', value: 25, score: 82, color: '#10b981' },
  { name: 'Break Compliance', value: 20, score: 88, color: '#f59e0b' },
  { name: 'Availability', value: 20, score: 72, color: '#ef4444' },
];

@Component({
  selector: 'app-employee-equity',
  standalone: true,
  imports: [EquityWidgetComponent],
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-100">My Equity Analysis</h1>
          <p class="text-slate-400">Understand how your schedule is balanced compared to the team.</p>
        </div>
        <div class="flex items-center gap-3 bg-slate-900/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-700/50 shadow-lg">
          <span class="text-sm font-bold text-slate-200">Rank: 3rd / 24</span>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-4 space-y-8">
          <div class="bg-slate-900/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-lg text-center">
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Global Equity Score</h3>
            <div class="flex justify-center mb-4">
              <app-equity-widget [score]="employee.equityScore" />
            </div>
            <div class="text-2xl font-bold text-slate-100">{{ employee.equityScore }}%</div>
            <p class="mt-6 text-xs text-slate-400">Your score is calculated based on shift rotation, weekend fairness, and break compliance.</p>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-8 space-y-8">
          <div class="bg-slate-900/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-lg">
            <h3 class="font-bold text-slate-100 mb-8">Score Components</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (comp of EQUITY_COMPONENTS; track comp.name) {
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-300">{{ comp.name }}</span>
                    <span class="text-sm font-bold text-slate-100">{{ comp.score }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all" [style.width.%]="comp.score" [style.background-color]="comp.color"></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>Weight: {{ comp.value }}%</span>
                    <span [class]="comp.score > 85 ? 'text-emerald-600' : comp.score > 75 ? 'text-orange-600' : 'text-red-600'">
                      {{ comp.score > 85 ? 'Excellent' : comp.score > 75 ? 'Good' : 'Needs Work' }}
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [],
})
export class EmployeeEquityComponent {
  employee = MOCK_EMPLOYEES[0];
  EQUITY_COMPONENTS = EQUITY_COMPONENTS;
}
