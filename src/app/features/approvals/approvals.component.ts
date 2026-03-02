import { Component } from '@angular/core';

@Component({
  selector: 'app-approvals',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Approvals</h1>
        <p class="text-slate-500">Gérer les demandes en attente d'approbation.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <p class="text-slate-500">Aucune demande en attente.</p>
      </div>
    </div>
  `,
  imports: [],
})
export class ApprovalsComponent {}
