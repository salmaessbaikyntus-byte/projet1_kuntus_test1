import { Component, input } from '@angular/core';
import { ShiftRotationHistogramData } from '../../../shared/models';

@Component({
  selector: 'app-shift-rotation-histogram',
  standalone: true,
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 class="mb-6 font-bold text-slate-900 dark:text-white">Répartition rotations</h3>
      @if (data()) {
        <div class="h-64 flex items-end gap-2">
          @for (v of data()!.values; track $index; let i = $index) {
            <div
              class="flex-1 flex flex-col items-center gap-2 group"
              [attr.title]="data()!.labels[i] + ': ' + v"
            >
              <div
                class="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-500"
                [style.height.%]="getHeight(v)"
              ></div>
              <span class="text-xs text-slate-500 dark:text-slate-400">{{ data()!.labels[i] }}</span>
            </div>
          }
        </div>
      } @else {
        <p class="py-8 text-center text-slate-500 dark:text-slate-400">Chargement...</p>
      }
    </div>
  `,
})
export class ShiftRotationHistogramComponent {
  data = input<ShiftRotationHistogramData | null>(null);

  getHeight(v: number): number {
    const d = this.data();
    if (!d || d.values.length === 0) return 0;
    const max = Math.max(...d.values);
    return max > 0 ? (v / max) * 100 : 0;
  }
}
