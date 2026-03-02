import { Component, signal, effect, OnInit, OnDestroy } from '@angular/core';
import { ReportConfig } from '../../shared/models';
import {
  ReportingService,
  ReportGenerationStatus,
} from '../../core/services/reporting.service';
import { Report } from '../../shared/models';
import { ReportingConfigBarComponent } from './components/reporting-config-bar.component';
import { ReportGenerationStepperComponent } from './components/report-generation-stepper.component';
import { ReportPreviewComponent } from './components/report-preview.component';
import { ReportHistoryTableComponent } from './components/report-history-table.component';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [
    ReportingConfigBarComponent,
    ReportGenerationStepperComponent,
    ReportPreviewComponent,
    ReportHistoryTableComponent,
  ],
  template: `
    <div class="space-y-8">
      <header>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Centre documentaire RH</h1>
        <p class="text-slate-500 dark:text-slate-400">
          Configurez, générez et consultez vos rapports.
        </p>
      </header>

      <!-- Zone configuration -->
      <app-reporting-config-bar (configGenerate)="onConfigGenerate($event)" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Zone génération & statut -->
        <div class="lg:col-span-2">
          <app-report-generation-stepper [status]="generationStatus()" />
        </div>

        <!-- Zone preview -->
        <div>
          <app-report-preview [pdfUrl]="previewUrl()" />
        </div>
      </div>

      <!-- Zone historique -->
      <app-report-history-table
        [reports]="reports()"
        [loading]="historyLoading()"
        [error]="historyError()"
        (download)="onDownload($event)"
        (archive)="onArchive($event)"
        (emailReport)="onEmail($event)"
      />
    </div>
  `,
})
export class ReportingComponent implements OnInit, OnDestroy {
  private pollIntervalId: ReturnType<typeof setInterval> | null = null;
  generationStatus = signal<ReportGenerationStatus | null>(null);
  previewUrl = signal<string | null>(null);
  reports = signal<Report[]>([]);
  historyLoading = signal(false);
  historyError = signal<string | null>(null);

  constructor(private reporting: ReportingService) {
    effect(() => {
      const s = this.generationStatus();
      if (s?.status === 'Ready') {
        this.previewUrl.set(s.reportId ? `/api/reporting/preview/${s.reportId}` : null);
      }
    });
  }

  ngOnInit(): void {
    this.loadHistory();
  }

  onConfigGenerate(config: ReportConfig): void {
    this.reporting.generateReport(config).subscribe(({ reportId }) => {
      this.generationStatus.set({
        reportId,
        currentStep: 'Collecte données',
        progress: 0,
        status: 'Generating',
      });
      this.pollStatus(reportId);
    });
  }

  private pollStatus(reportId: string): void {
    this.clearPoll();
    this.pollIntervalId = setInterval(() => {
      this.reporting.getGenerationStatus(reportId).subscribe((s) => {
        this.generationStatus.set(s);
        if (s.status === 'Ready' || s.status === 'Error') {
          this.clearPoll();
        }
      });
    }, 1500);
  }

  private clearPoll(): void {
    if (this.pollIntervalId) {
      clearInterval(this.pollIntervalId);
      this.pollIntervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearPoll();
  }

  loadHistory(): void {
    this.historyLoading.set(true);
    this.historyError.set(null);
    this.reporting.getReportHistory().subscribe({
      next: (list) => {
        this.reports.set(list);
        this.historyLoading.set(false);
      },
      error: () => {
        this.historyError.set('Impossible de charger l\'historique');
        this.historyLoading.set(false);
      },
    });
  }

  onDownload(r: Report): void {
    this.reporting.downloadReport(r.id).subscribe((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${r.name}.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  onArchive(r: Report): void {
    this.reporting.archiveReport(r.id).subscribe(() => this.loadHistory());
  }

  onEmail(r: Report): void {
    const email = prompt('Adresse email de destination :');
    if (email) {
      this.reporting.emailReport(r.id, email).subscribe();
    }
  }
}
