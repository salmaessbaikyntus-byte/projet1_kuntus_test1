import { Component, input } from '@angular/core';
import { ReportGenerationStatus, GenerationStep } from '../../../core/services/reporting.service';
import { cn } from '../../../shared/utils';

const STEPS: GenerationStep[] = ['Collecte données', 'Calcul indicateurs', 'Mise en page', 'Finalisation'];

@Component({
  selector: 'app-report-generation-stepper',
  standalone: true,
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 class="mb-6 font-bold text-slate-900 dark:text-white">Génération du rapport</h3>

      @if (!status()) {
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Configurez un rapport et lancez la génération.
        </p>
      } @else {
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            @for (step of steps; track step; let i = $index) {
              <div class="flex flex-1 items-center">
                <div
                  [class]="cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold',
                    getStepState(step) === 'done'
                      ? 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-600'
                      : getStepState(step) === 'current'
                        ? 'border-indigo-500 bg-indigo-500 text-white dark:border-indigo-400 dark:bg-indigo-600'
                        : 'border-slate-200 text-slate-400 dark:border-slate-600'
                  )"
                >
                  {{ getStepState(step) === 'done' ? '✓' : i + 1 }}
                </div>
                @if (i < steps.length - 1) {
                  <div
                    [class]="cn(
                      'mx-2 h-0.5 flex-1',
                      getStepState(step) === 'done' ? 'bg-emerald-500 dark:bg-emerald-600' : 'bg-slate-200 dark:bg-slate-600'
                    )"
                  ></div>
                }
              </div>
            }
          </div>

          <div class="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
            <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
              Étape actuelle : {{ status()?.currentStep }}
            </p>
            <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
              <div
                class="h-full rounded-full bg-indigo-500 dark:bg-indigo-500"
                [style.width.%]="status()?.progress ?? 0"
              ></div>
            </div>
          </div>

          @if (status()?.error) {
            <div class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/30">
              <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ status()?.error }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class ReportGenerationStepperComponent {
  status = input<ReportGenerationStatus | null>(null);
  steps = STEPS;
  cn = cn;

  getStepState(step: GenerationStep): 'done' | 'current' | 'pending' {
    const s = this.status();
    if (!s) return 'pending';
    const idx = STEPS.indexOf(step);
    const curIdx = STEPS.indexOf(s.currentStep);
    if (idx < curIdx || s.status === 'Ready') return 'done';
    if (idx === curIdx) return 'current';
    return 'pending';
  }
}
