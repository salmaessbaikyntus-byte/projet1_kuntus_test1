import { Component } from '@angular/core';

@Component({
  selector: 'app-reporting',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Rapports</h1>
        <p class="text-slate-500">Générer et consulter les rapports.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <p class="text-slate-500">Module de reporting.</p>
      </div>
    </div>
  `,
  imports: [],
})
export class ReportingComponent {}
