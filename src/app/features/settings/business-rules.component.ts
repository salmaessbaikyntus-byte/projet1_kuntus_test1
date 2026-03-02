import { Component, signal } from '@angular/core';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-business-rules',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Business Rules Configuration</h1>
          <p class="text-slate-500">Define the core logic and constraints for your workforce planning.</p>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50">Version History</button>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Save Changes</button>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-8 space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 class="font-bold text-slate-900">Active Constraints</h3>
              <span class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-widest">v2.4.0 Active</span>
            </div>
            <div class="p-8 space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-bold text-slate-700">Max Break %</label>
                    <span class="text-sm font-bold text-indigo-600">{{ rules().maxBreakPercent }}%</span>
                  </div>
                  <input type="range" min="5" max="25" [value]="rules().maxBreakPercent" (input)="updateRules({maxBreakPercent: +\$any(\$event.target).value})" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-bold text-slate-700">Min Coverage Threshold</label>
                    <span class="text-sm font-bold text-indigo-600">{{ rules().minCoveragePercent }}%</span>
                  </div>
                  <input type="range" min="70" max="100" [value]="rules().minCoveragePercent" (input)="updateRules({minCoveragePercent: +\$any(\$event.target).value})" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label class="text-sm font-bold text-slate-700">Weekend Rotation</label>
                    <p class="text-[10px] text-slate-400">Enforce fair distribution of weekend shifts.</p>
                  </div>
                  <button (click)="updateRules({weekendRotation: !rules().weekendRotation})" [class]="cn('w-10 h-5 rounded-full transition-colors relative', rules().weekendRotation ? 'bg-indigo-600' : 'bg-slate-200')">
                    <div [class]="cn('absolute top-1 w-3 h-3 bg-white rounded-full transition-all', rules().weekendRotation ? 'left-6' : 'left-1')"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [],
})
export class BusinessRulesComponent {
  rules = signal({
    maxBreakPercent: 10,
    minCoveragePercent: 90,
    equityWeight: 0.7,
    weekendRotation: true,
  });

  updateRules(partial: Partial<{ maxBreakPercent: number; minCoveragePercent: number; weekendRotation: boolean }>): void {
    this.rules.update((r) => ({ ...r, ...partial }));
  }
  cn = cn;
}
