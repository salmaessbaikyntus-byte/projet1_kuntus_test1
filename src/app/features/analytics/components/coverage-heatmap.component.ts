import { Component, input } from '@angular/core';
import { CoverageHeatmapData } from '../../../shared/models';
import { cn } from '../../../shared/utils';

@Component({
  selector: 'app-coverage-heatmap',
  standalone: true,
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 class="mb-6 font-bold text-slate-900 dark:text-white">Couverture vs cible</h3>
      @if (data()) {
        <div class="space-y-4">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th class="p-2 text-left font-medium text-slate-500 dark:text-slate-400"></th>
                  @for (day of data()!.days; track day) {
                    <th class="p-2 text-center font-medium text-slate-500 dark:text-slate-400">{{ day }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (shift of data()!.shifts; track shift; let i = $index) {
                  <tr>
                    <td class="p-2 font-medium text-slate-600 dark:text-slate-300">{{ shift }}</td>
                    @for (val of data()!.values[i]; track $index) {
                      <td class="p-2">
                        <div
                          [attr.title]="val + '%'"
                          [class]="cn(
                            'mx-auto h-8 min-w-[2rem] rounded flex items-center justify-center text-xs font-bold',
                            getHeatColor(val)
                          )"
                        >
                          {{ val }}
                        </div>
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Cible : {{ data()!.target }}%. Vert = au-dessus, Orange = proche, Rouge = sous cible.
          </p>
        </div>
      } @else {
        <p class="py-8 text-center text-slate-500 dark:text-slate-400">Chargement...</p>
      }
    </div>
  `,
})
export class CoverageHeatmapComponent {
  data = input<CoverageHeatmapData | null>(null);
  cn = cn;

  getHeatColor(val: number): string {
    const target = this.data()?.target ?? 95;
    if (val >= target) return 'bg-emerald-500 text-white dark:bg-emerald-600';
    if (val >= target - 5) return 'bg-amber-400 text-slate-900 dark:bg-amber-500';
    return 'bg-red-500 text-white dark:bg-red-600';
  }
}
