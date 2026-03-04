import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
          [attr.stroke-dashoffset]="getDashOffset()"
          class="text-indigo-600 dark:text-indigo-400 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span class="absolute text-[10px] font-bold text-slate-900 dark:text-slate-100">{{ displayScore }}%</span>
    </div>
  `,
  styles: [],
})
export class EquityWidgetComponent {
  @Input() score = 0;

  protected readonly circumference = CIRCUMFERENCE;

  protected get displayScore(): number {
    return Math.min(100, Math.max(0, this.score ?? 0));
  }

  protected getDashOffset(): number {
    return CIRCUMFERENCE * (1 - this.displayScore / 100);
  }
}
