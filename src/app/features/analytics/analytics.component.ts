import { Component, signal } from '@angular/core';
import { cn } from '../../shared/utils';

const DATA_COVERAGE = [
  { name: 'Mon', coverage: 92, target: 95 },
  { name: 'Tue', coverage: 94, target: 95 },
  { name: 'Wed', coverage: 98, target: 95 },
  { name: 'Thu', coverage: 91, target: 95 },
  { name: 'Fri', coverage: 95, target: 95 },
  { name: 'Sat', coverage: 88, target: 90 },
  { name: 'Sun', coverage: 85, target: 90 },
];

@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">RH Analytics Cockpit</h1>
        <p class="text-slate-500">Real-time workforce insights and predictive simulations.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (kpi of kpis; track kpi.label) {
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div [class]="'p-2 rounded-lg ' + kpi.bg">
                <span [innerHTML]="kpi.icon"></span>
              </div>
              <div [class]="'flex items-center text-xs font-bold ' + (kpi.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600')">{{ kpi.trend }}</div>
            </div>
            <p class="text-sm font-medium text-slate-500">{{ kpi.label }}</p>
            <p class="text-2xl font-bold text-slate-900 mt-1">{{ kpi.value }}</p>
          </div>
        }
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-8 space-y-8">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-slate-900 mb-8">Coverage vs Target</h3>
            <div class="h-80 flex items-end gap-2">
              @for (d of DATA_COVERAGE; track d.name) {
                <div class="flex-1 flex flex-col items-center gap-2">
                  <div class="w-full bg-slate-100 rounded-t flex flex-col justify-end" style="height: 200px">
                    <div class="bg-indigo-500 rounded-t" [style.height.%]="d.coverage"></div>
                  </div>
                  <span class="text-xs text-slate-500">{{ d.name }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4 space-y-8">
          <div class="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 class="text-xl font-bold mb-2">What-if Simulation</h3>
            <p class="text-slate-400 text-sm mb-8">Predict impact of workforce changes.</p>
            <div class="space-y-8">
              <div>
                <div class="flex justify-between mb-3">
                  <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Absenteeism Rate</label>
                  <span class="text-sm font-bold text-indigo-400">{{ absenteeismSim() }}%</span>
                </div>
                <input type="range" min="0" max="30" [value]="absenteeismSim()" (input)="absenteeismSim.set(+(\$any(\$event.target).value))" class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              </div>
              <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-all">Run Simulation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [],
})
export class AnalyticsComponent {
  absenteeismSim = signal(5);
  DATA_COVERAGE = DATA_COVERAGE;
  kpis = [
    { label: 'Avg Coverage', value: '93.4%', trend: '+2.1%', bg: 'bg-emerald-50', icon: '' },
    { label: 'Equity Index', value: '88/100', trend: '+5.4%', bg: 'bg-indigo-50', icon: '' },
    { label: 'Rule 10% Compliance', value: '98.2%', trend: '-0.4%', bg: 'bg-orange-50', icon: '' },
    { label: 'Est. Weekly Cost', value: '€42.5k', trend: '+1.2%', bg: 'bg-slate-50', icon: '' },
  ];
}
