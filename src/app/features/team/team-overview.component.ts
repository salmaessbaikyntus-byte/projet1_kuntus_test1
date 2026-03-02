import { Component } from '@angular/core';

@Component({
  selector: 'app-team-overview',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Vue d'ensemble de l'équipe</h1>
        <p class="text-slate-500">Gestion et aperçu de votre équipe.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <p class="text-slate-500">Contenu de la vue d'ensemble de l'équipe.</p>
      </div>
    </div>
  `,
  imports: [],
})
export class TeamOverviewComponent {}
