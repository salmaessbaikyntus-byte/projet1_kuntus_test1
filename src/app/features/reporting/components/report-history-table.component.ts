import { Component, input, output } from '@angular/core';
import { Report, ReportStatus } from '../../../shared/models';
import { cn } from '../../../shared/utils';

@Component({
  selector: 'app-report-history-table',
  standalone: true,
  template: `
    <div class="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-800">
      <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h3 class="font-bold text-slate-900 dark:text-white">Historique des rapports</h3>
      </div>

      @if (loading()) {
        <div class="flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
        </div>
      } @else if (error()) {
        <div class="px-6 py-8 text-center text-sm text-red-600 dark:text-red-400">
          {{ error() }}
        </div>
      } @else {
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">ID</th>
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">Nom</th>
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">Catégorie</th>
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">Période</th>
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">Auteur</th>
                <th class="px-6 py-3 text-left font-bold text-slate-600 dark:text-slate-400">Statut</th>
                <th class="px-6 py-3 text-right font-bold text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (r of reports(); track r.id) {
                <tr class="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/30">
                  <td class="px-6 py-3">
                    <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-slate-700 dark:text-slate-300">
                      {{ r.id }}
                    </span>
                  </td>
                  <td class="px-6 py-3 font-medium text-slate-900 dark:text-white">{{ r.name }}</td>
                  <td class="px-6 py-3 text-slate-600 dark:text-slate-400">{{ r.category }}</td>
                  <td class="px-6 py-3 text-slate-600 dark:text-slate-400">
                    {{ r.periodStart }} → {{ r.periodEnd }}
                  </td>
                  <td class="px-6 py-3 text-slate-600 dark:text-slate-400">{{ r.author }}</td>
                  <td class="px-6 py-3">
                    <span
                      [attr.title]="r.status === 'Obsolete' ? 'Données périmées, régénérer recommandé' : null"
                      [class]="cn(
                        'inline-flex rounded px-2 py-0.5 text-xs font-bold',
                        r.status === 'Valid' || r.status === 'Ready'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : r.status === 'Obsolete'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                            : r.status === 'Generating'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      )"
                    >
                      {{ r.status }}
                    </span>
                  </td>
                  <td class="px-6 py-3 text-right">
                    <div class="flex justify-end gap-2">
                      @if (r.status === 'Valid' || r.status === 'Ready') {
                        <button
                          type="button"
                          (click)="download.emit(r)"
                          class="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-600 dark:hover:text-indigo-400"
                          title="Télécharger"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        </button>
                      }
                      <button
                        type="button"
                        (click)="archive.emit(r)"
                        class="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                        title="Archiver"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>
                      </button>
                      <button
                        type="button"
                        (click)="emailReport.emit(r)"
                        class="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                        title="Envoyer par email"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Aucun rapport dans l'historique.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class ReportHistoryTableComponent {
  reports = input<Report[]>([]);
  loading = input(false);
  error = input<string | null>(null);
  download = output<Report>();
  archive = output<Report>();
  emailReport = output<Report>();

  cn = cn;
}
