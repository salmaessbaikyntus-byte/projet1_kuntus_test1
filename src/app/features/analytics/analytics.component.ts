import { Component, signal, OnInit } from '@angular/core';
import {
  KpiData,
  CoverageHeatmapData,
  ShiftRotationHistogramData,
  SkillRadarData,
} from '../../shared/models';
import { AnalyticsService } from '../../core/services/analytics.service';
import { KpiCardComponent } from './components/kpi-card.component';
import { CoverageHeatmapComponent } from './components/coverage-heatmap.component';
import { ShiftRotationHistogramComponent } from './components/shift-rotation-histogram.component';
import { SkillRadarChartComponent } from './components/skill-radar-chart.component';
import { SimulationPanelComponent } from './components/simulation-panel.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    KpiCardComponent,
    CoverageHeatmapComponent,
    ShiftRotationHistogramComponent,
    SkillRadarChartComponent,
    SimulationPanelComponent,
  ],
  template: `
    <div class="space-y-8">
      <header>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Tour de contrôle RH</h1>
        <p class="text-slate-500 dark:text-slate-400">
          Visualisation, alertes et simulation décisionnelle.
        </p>
      </header>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (kpi of kpis(); track kpi.type) {
          <app-kpi-card [kpi]="kpi" />
        }
      </div>

      @if (loading()) {
        <div class="flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
        </div>
      } @else {
        <div class="grid grid-cols-12 gap-8">
          <!-- Graphiques -->
          <div class="col-span-12 lg:col-span-8 space-y-8">
            <app-coverage-heatmap [data]="heatmapData()" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <app-shift-rotation-histogram [data]="histogramData()" />
              <app-skill-radar-chart [data]="radarData()" />
            </div>
          </div>

          <!-- Module What-if -->
          <div class="col-span-12 lg:col-span-4">
            <app-simulation-panel />
          </div>
        </div>
      }
    </div>
  `,
})
export class AnalyticsComponent implements OnInit {
  kpis = signal<KpiData[]>([]);
  heatmapData = signal<CoverageHeatmapData | null>(null);
  histogramData = signal<ShiftRotationHistogramData | null>(null);
  radarData = signal<SkillRadarData | null>(null);
  loading = signal(true);

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.analytics.getKpis().subscribe((k) => {
      this.kpis.set(k);
    });

    this.analytics.getCoverageHeatmap().subscribe((h) => {
      this.heatmapData.set(h);
    });

    this.analytics.getShiftRotationHistogram().subscribe((h) => {
      this.histogramData.set(h);
    });

    this.analytics.getSkillRadar().subscribe((r) => {
      this.radarData.set(r);
    });

    // Simulate loading complete when all data received
    setTimeout(() => this.loading.set(false), 500);
  }
}
