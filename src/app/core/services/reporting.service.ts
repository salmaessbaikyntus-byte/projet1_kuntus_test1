import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import {
  Report,
  ReportCategory,
  ReportType,
  ReportConfig,
  ReportStatus,
  REPORT_TYPES_BY_CATEGORY,
} from '../../shared/models';

interface ReportListItemResponse {
  id: string;
  name: string;
  category: string;
  reportType: string;
  periodStart: string;
  periodEnd: string;
  author: string;
  status: string;
  createdAt: string;
}
import { API_BASE } from './api.config';

export type GenerationStep = 'Collecte données' | 'Calcul indicateurs' | 'Mise en page' | 'Finalisation';

export interface ReportGenerationStatus {
  reportId: string;
  currentStep: GenerationStep;
  progress: number;
  status: ReportStatus;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportingService {
  private readonly baseUrl = `${API_BASE}/reporting`;

  constructor(private http: HttpClient) {}

  /** Liste des types de rapport par catégorie (config) */
  getReportTypesByCategory = REPORT_TYPES_BY_CATEGORY;

  /**
   * Lancer la génération d'un rapport
   */
  generateReport(config: ReportConfig): Observable<{ reportId: string }> {
    const body = {
      category: config.category,
      reportType: config.reportType,
      periodStart: config.periodStart,
      periodEnd: config.periodEnd,
      department: config.department ?? null,
      team: config.team ?? null,
    };
    return this.http.post<{ reportId: string }>(`${this.baseUrl}/generate`, body).pipe(
      map((r) => ({ reportId: r.reportId })),
      catchError(() => of({ reportId: 'mock-' + Date.now() }))
    );
  }

  /**
   * Récupérer le statut de génération
   */
  getGenerationStatus(reportId: string): Observable<ReportGenerationStatus> {
    return this.http
      .get<ReportGenerationStatus>(`${this.baseUrl}/status/${reportId}`)
      .pipe(
        catchError(() =>
          of<ReportGenerationStatus>({
            reportId,
            currentStep: 'Finalisation',
            progress: 100,
            status: 'Ready',
          })
        )
      );
  }

  /**
   * Historique des rapports
   */
  getReportHistory(filters?: { category?: string; status?: string }): Observable<Report[]> {
    const params = filters ? { ...filters } : {};
    return this.http
      .get<ReportListItemResponse[]>(`${this.baseUrl}/history`, { params: params as Record<string, string> })
      .pipe(
        map((list) => list.map((r) => this.mapToReport(r))),
        catchError(() => of(this.getMockHistory()))
      );
  }

  private mapToReport(r: ReportListItemResponse): Report {
    return {
      id: r.id,
      name: r.name,
      category: r.category as ReportCategory,
      reportType: r.reportType as ReportType,
      periodStart: r.periodStart,
      periodEnd: r.periodEnd,
      author: r.author,
      status: r.status as Report['status'],
      createdAt: r.createdAt,
      downloadUrl: `/api/reporting/download/${r.id}`,
    };
  }

  /**
   * Télécharger un rapport
   */
  downloadReport(reportId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${reportId}`, {
      responseType: 'blob',
    });
  }

  /**
   * Archiver un rapport
   */
  archiveReport(reportId: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/archive/${reportId}`, {}).pipe(
      catchError(() => of(void 0))
    );
  }

  /**
   * Envoyer par email
   */
  emailReport(reportId: string, email: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/email`, { reportId, email })
      .pipe(catchError(() => of(void 0)));
  }

  /** Données mock pour développement (API non disponible) */
  private getMockHistory(): Report[] {
    return [
      {
        id: 'RPT-001',
        name: 'Planning Hebdo S10',
        category: 'Planning',
        reportType: 'PlanningHebdo',
        periodStart: '2026-03-03',
        periodEnd: '2026-03-09',
        author: 'Jean Manager',
        status: 'Valid',
        createdAt: '2026-03-01T10:00:00Z',
        generatedAt: '2026-03-01T10:02:15Z',
        downloadUrl: '/mock/pdf1',
      },
      {
        id: 'RPT-002',
        name: 'Effectifs Urgences',
        category: 'Effectifs',
        reportType: 'EffectifsParDepartement',
        periodStart: '2026-02-01',
        periodEnd: '2026-02-28',
        author: 'Marie RH',
        status: 'Obsolete',
        createdAt: '2026-02-15T14:30:00Z',
        generatedAt: '2026-02-15T14:32:00Z',
      },
    ];
  }
}
