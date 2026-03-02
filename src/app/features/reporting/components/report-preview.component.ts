import { Component, input } from '@angular/core';

@Component({
  selector: 'app-report-preview',
  standalone: true,
  template: `
    <div
      class="flex aspect-[210/297] max-h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
    >
      @if (pdfUrl()) {
        <img
          [src]="pdfUrl()"
          alt="Aperçu rapport"
          class="max-h-full w-auto object-contain"
        />
      } @else {
        <div class="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>
          <span class="text-sm font-medium">Aucun aperçu disponible</span>
          <span class="text-xs">Générez un rapport pour afficher la miniature</span>
        </div>
      }
    </div>
  `,
})
export class ReportPreviewComponent {
  pdfUrl = input<string | null>(null);
}
