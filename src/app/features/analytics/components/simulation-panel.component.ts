import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimulationInput, SimulationResult } from '../../../shared/models';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { cn } from '../../../shared/utils';

@Component({
  selector: 'app-simulation-panel',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="rounded-xl border border-slate-200 bg-slate-900 p-6 text-white dark:border-slate-700">
      <h3 class="text-xl font-bold mb-2">Simulation What-if</h3>
      <p class="text-slate-400 text-sm mb-6">Prédire l'impact des changements d'effectifs.</p>

      <div class="space-y-6">
        <div>
          <div class="flex justify-between mb-3">
            <label class="text-xs font-bold uppercase tracking-widest text-slate-400">
              Variation effectif (%)
            </label>
            <span class="text-sm font-bold text-indigo-400">{{ staffChangePercent() }}%</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="5"
            [ngModel]="staffChangePercent()"
            (ngModelChange)="staffChangePercent.set(Number($event))"
            class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div class="flex justify-between text-xs text-slate-500 mt-1">
            <span>-30%</span>
            <span>0%</span>
            <span>+30%</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between mb-3">
            <label class="text-xs font-bold uppercase tracking-widest text-slate-400">
              Taux absentéisme (%)
            </label>
            <span class="text-sm font-bold text-indigo-400">{{ absenteeismRate() }}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            [ngModel]="absenteeismRate()"
            (ngModelChange)="absenteeismRate.set(Number($event))"
            class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <button
          type="button"
          (click)="runSimulation()"
          [disabled]="loading()"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-bold text-sm transition-all"
        >
          {{ loading() ? 'Simulation...' : 'Lancer la simulation' }}
        </button>

        @if (result()) {
          <div class="space-y-3 pt-4 border-t border-slate-700">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Résultats</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="rounded bg-slate-800 p-2">
                <span class="text-slate-400">Impact couverture</span>
                <p [class]="cn(
                  'font-bold',
                  (result()!.coverageImpact ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                )">
                  {{ (result()!.coverageImpact ?? 0) >= 0 ? '+' : '' }}{{ result()!.coverageImpact }}%
                </p>
              </div>
              <div class="rounded bg-slate-800 p-2">
                <span class="text-slate-400">Violations règles</span>
                <p class="font-bold" [class]="(result()!.ruleViolations ?? 0) > 0 ? 'text-amber-400' : 'text-emerald-400'">
                  {{ result()!.ruleViolations }}
                </p>
              </div>
            </div>
            @if ((result()!.alerts?.length ?? 0) > 0) {
              <div class="space-y-1">
                @for (a of result()!.alerts; track $index) {
                  <div
                    [class]="cn(
                      'rounded p-2 text-xs',
                      a.severity === 'critical' && 'bg-red-900/50 text-red-300',
                      a.severity === 'warning' && 'bg-amber-900/50 text-amber-300',
                      a.severity === 'info' && 'bg-slate-700 text-slate-300'
                    )"
                  >
                    {{ a.message }}
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class SimulationPanelComponent {
  staffChangePercent = signal(0);
  absenteeismRate = signal(5);
  loading = signal(false);
  result = signal<SimulationResult | null>(null);

  cn = cn;
  readonly Number = Number;

  constructor(private analytics: AnalyticsService) {}

  runSimulation(): void {
    this.loading.set(true);
    this.result.set(null);
    const input: SimulationInput = {
      staffChangePercent: Number(this.staffChangePercent()),
      absenteeismRate: Number(this.absenteeismRate()),
    };
    this.analytics.runSimulation(input).subscribe({
      next: (r) => {
        this.result.set(r);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
