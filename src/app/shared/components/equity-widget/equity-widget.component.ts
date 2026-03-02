import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20

@Component({
  selector: 'app-equity-widget',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-14 h-14 flex items-center justify-center">
      <svg class="w-full h-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          stroke-width="4"
          fill="transparent"
          class="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          stroke-width="4"
          fill="transparent"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset()"
          class="text-indigo-600 dark:text-indigo-400 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span class="absolute text-[10px] font-bold text-slate-900 dark:text-slate-100">{{ score() }}%</span>
    </div>
  `,
  styles: [],
})
export class EquityWidgetComponent {
  score = input<number>(0);

  protected readonly circumference = CIRCUMFERENCE;

  protected readonly dashOffset = computed(() => {
    const s = this.score() ?? 0;
    const clamped = Math.min(100, Math.max(0, s));
    return CIRCUMFERENCE * (1 - clamped / 100);
  });
}
