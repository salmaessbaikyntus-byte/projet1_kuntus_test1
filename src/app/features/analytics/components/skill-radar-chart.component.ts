import { Component, input, computed } from '@angular/core';
import { SkillRadarData } from '../../../shared/models';

@Component({
  selector: 'app-skill-radar-chart',
  standalone: true,
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 class="mb-6 font-bold text-slate-900 dark:text-white">Compétences par axe</h3>
      @if (data()) {
        <div class="aspect-square max-w-xs mx-auto relative">
          <svg viewBox="0 0 200 200" class="w-full h-full">
            <!-- Grille polygonale -->
            @for (level of [0.25, 0.5, 0.75, 1]; track level) {
              <polygon
                [attr.points]="getPolygonPoints(level, 0)"
                fill="none"
                stroke="currentColor"
                stroke-opacity="0.2"
                class="text-slate-300 dark:text-slate-600"
              />
            }
            <!-- Polygone données -->
            <polygon
              [attr.points]="dataPoints()"
              fill="rgba(99, 102, 241, 0.2)"
              stroke="rgb(99, 102, 241)"
              stroke-width="2"
              class="dark:stroke-indigo-400"
            />
            <!-- Labels -->
            @for (label of data()!.labels; track $index; let i = $index) {
              <text
                [attr.x]="100 + 110 * Math.cos(getAngle(i))"
                [attr.y]="100 - 110 * Math.sin(getAngle(i))"
                class="fill-slate-600 dark:fill-slate-400 text-[10px]"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                {{ label }}
              </text>
            }
          </svg>
        </div>
      } @else {
        <p class="py-8 text-center text-slate-500 dark:text-slate-400">Chargement...</p>
      }
    </div>
  `,
})
export class SkillRadarChartComponent {
  data = input<SkillRadarData | null>(null);
  readonly Math = Math;

  dataPoints = computed(() => {
    const d = this.data();
    if (!d || d.labels.length === 0) return '';
    const n = d.labels.length;
    const max = d.maxValue || 100;
    return Array.from({ length: n }, (_, i) => {
      const r = 80 * (d.values[i] / max);
      const a = this.getAngle(i);
      return `${100 + r * Math.cos(a)},${100 - r * Math.sin(a)}`;
    }).join(' ');
  });

  getAngle(i: number): number {
    const d = this.data();
    const n = d?.labels.length ?? 1;
    return (Math.PI * 2 * i) / n - Math.PI / 2;
  }

  getPolygonPoints(level: number, _: number): string {
    const d = this.data();
    const n = d?.labels.length ?? 6;
    const r = 80 * level;
    return Array.from({ length: n }, (_, i) => {
      const a = this.getAngle(i);
      return `${100 + r * Math.cos(a)},${100 - r * Math.sin(a)}`;
    }).join(' ');
  }
}
