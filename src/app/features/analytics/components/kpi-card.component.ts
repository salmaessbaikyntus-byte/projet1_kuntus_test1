import { Component, input } from '@angular/core';
import { KpiData } from '../../../shared/models';
import { cn } from '../../../shared/utils';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div
      [class]="cn(
        'rounded-xl border p-6 transition-colors',
        'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
        kpi().status === 'error' && 'border-red-200 dark:border-red-800/50',
        kpi().status === 'warning' && 'border-amber-200 dark:border-amber-800/50'
      )"
    >
      <div class="flex items-center justify-between mb-4">
        <div
          [class]="cn(
            'p-2 rounded-lg',
            kpi().status === 'ok' && 'bg-emerald-50 dark:bg-emerald-900/30',
            kpi().status === 'warning' && 'bg-amber-50 dark:bg-amber-900/30',
            kpi().status === 'error' && 'bg-red-50 dark:bg-red-900/30'
          )"
        >
          <span
            [class]="cn(
              kpi().status === 'ok' && 'text-emerald-600 dark:text-emerald-400',
              kpi().status === 'warning' && 'text-amber-600 dark:text-amber-400',
              kpi().status === 'error' && 'text-red-600 dark:text-red-400'
            )"
            [innerHTML]="iconSvg"
          ></span>
        </div>
        @if (kpi().trend !== undefined) {
          <span
            [class]="cn(
              'text-xs font-bold',
              (kpi().trend ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            )"
          >
            {{ (kpi().trend ?? 0) >= 0 ? '+' : '' }}{{ kpi().trend }}%
          </span>
        }
      </div>
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ kpi().label }}</p>
      <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {{ formatValue(kpi().value) }}{{ kpi().unit }}
      </p>
    </div>
  `,
})
export class KpiCardComponent {
  kpi = input.required<KpiData>();

  iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`;

  cn = cn;

  formatValue(v: number | string): string {
    if (typeof v === 'number') {
      return v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(v);
    }
    return String(v);
  }
}
