import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Alertes</h1>
        <p class="text-slate-500">Consulter et gérer les alertes système.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <p class="text-slate-500">Liste des alertes.</p>
      </div>
    </div>
  `,
  imports: [],
})
export class AlertsComponent {}
