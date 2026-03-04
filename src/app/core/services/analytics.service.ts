import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import {
  KpiData,
  CoverageHeatmapData,
  ShiftRotationHistogramData,
  SkillRadarData,
  SimulationInput,
  SimulationResult,
} from '../../shared/models';
import { API_BASE } from './api.config';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly baseUrl = `${API_BASE}/analytics`;

  constructor(private http: HttpClient) {}

  /**
   * KPIs décisionnels
   */
  getKpis(): Observable<KpiData[]> {
    return this.http.get<KpiData[]>(`${this.baseUrl}/kpis`).pipe(
      catchError(() => of(this.getMockKpis()))
    );
  }

  /**
   * Heatmap couverture
   */
  getCoverageHeatmap(): Observable<CoverageHeatmapData> {
    return this.http.get<CoverageHeatmapData>(`${this.baseUrl}/heatmap`).pipe(
      catchError(() => of(this.getMockHeatmap()))
    );
  }

  /**
   * Histogramme rotation des shifts
   */
  getShiftRotationHistogram(): Observable<ShiftRotationHistogramData> {
    return this.http
      .get<CoverageHeatmapData>(`${this.baseUrl}/heatmap`)
      .pipe(
        map((heatmap) => ({
          labels: heatmap.days.flatMap(() => heatmap.shifts),
          values: heatmap.values.flat().map((v) => Number(v)),
        }))
      )
      .pipe(catchError(() => of(this.getMockHistogram())));
  }

  /**
   * Radar compétences
   */
  getSkillRadar(): Observable<SkillRadarData> {
    return this.http
      .get<{ rankings?: { name: string; score: number }[] }>(`${this.baseUrl}/team-ranking`)
      .pipe(
        map((res) => ({
          labels: (res.rankings ?? []).map((r) => r.name).slice(0, 6),
          values: (res.rankings ?? []).map((r) => Number(r.score)).slice(0, 6),
          maxValue: 100,
        }))
      )
      .pipe(catchError(() => of(this.getMockRadar())));
  }

  /**
   * Simulation What-if
   */
  runSimulation(input: SimulationInput): Observable<SimulationResult> {
    return this.http
      .post<SimulationResult>(`${this.baseUrl}/simulate`, input)
      .pipe(catchError(() => of(this.getMockSimulationResult(input))));
  }

  /** Équité utilisateur (API existante) */
  getMyEquity(): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/my-equity`).pipe(catchError(() => of(null)));
  }

  /** Classement équipe (API existante) */
  getTeamRanking(): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/team-ranking`).pipe(catchError(() => of(null)));
  }

  /** Alertes dashboard (sous-effectif, conflits, conformité) */
  getAlerts(): Observable<{ id: string; type: string; title: string; message: string; priority: string; time: string; team: string }[]> {
    return this.http.get<{ id: string; type: string; title: string; message: string; priority: string; time: string; team: string }[]>(`${this.baseUrl}/alerts`).pipe(
      catchError(() => of([]))
    );
  }

  /** Activité récente (planning, rapports, congés) */
  getRecentActivity(): Observable<{ user: string; action: string; target: string; time: string }[]> {
    return this.http.get<{ user: string; action: string; target: string; time: string }[]>(`${this.baseUrl}/recent-activity`).pipe(
      catchError(() => of([]))
    );
  }

  /** Journal d'audit */
  getAuditLog(): Observable<{ id: string; user: string; action: string; target: string; timestamp: string; isSensitive: boolean }[]> {
    return this.http.get<{ id: string; user: string; action: string; target: string; timestamp: string; isSensitive: boolean }[]>(`${this.baseUrl}/audit-log`).pipe(
      catchError(() => of([]))
    );
  }

  private getMockKpis(): KpiData[] {
    return [
      { type: 'Coverage', label: 'Taux couverture plateau', value: 93.4, unit: '%', trend: 2.1, status: 'ok', thresholdMin: 90 },
      { type: 'EquityIndex', label: 'Indice équité', value: 88, unit: '/100', trend: 5.4, status: 'ok', thresholdMin: 70 },
      { type: 'RuleCompliance', label: 'Respect règle 10 %', value: 98.2, unit: '%', trend: -0.4, status: 'ok', thresholdMin: 95 },
      { type: 'EstimatedCost', label: 'Coût RH estimé', value: 42500, unit: '€/sem', trend: 1.2, status: 'warning' },
    ];
  }

  private getMockHeatmap(): CoverageHeatmapData {
    return {
      days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      shifts: ['Matin', 'Après-midi', 'Nuit'],
      values: [
        [92, 94, 98, 91, 95, 88, 85],
        [90, 93, 96, 89, 94, 86, 82],
        [88, 91, 95, 87, 92, 84, 80],
      ],
      target: 95,
    };
  }

  private getMockHistogram(): ShiftRotationHistogramData {
    return {
      labels: ['M', 'A', 'N', 'M', 'A', 'N', 'M'],
      values: [12, 8, 6, 14, 9, 7, 11],
    };
  }

  private getMockRadar(): SkillRadarData {
    return {
      labels: ['ICU', 'Triage', 'Pédiatrie', 'X-Ray', 'Chirurgie', 'Administratif'],
      values: [85, 78, 72, 90, 65, 88],
      maxValue: 100,
    };
  }

  private getMockSimulationResult(input: SimulationInput): SimulationResult {
    const impact = -input.staffChangePercent * 1.2;
    return {
      coverageImpact: impact,
      ruleViolations: input.staffChangePercent < -5 ? 2 : 0,
      alerts:
        input.staffChangePercent < -10
          ? [{ severity: 'critical' as const, message: 'Règle 10% potentiellement violée' }]
          : [],
      estimatedCostChange: -input.staffChangePercent * 500,
    };
  }
}
