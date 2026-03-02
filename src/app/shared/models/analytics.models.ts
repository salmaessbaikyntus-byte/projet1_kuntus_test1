/**
 * Modèles et enums pour le module Analytics
 * ShiftMaster Enterprise SaaS
 */

export type KpiType = 'Coverage' | 'EquityIndex' | 'RuleCompliance' | 'EstimatedCost';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface KpiData {
  type: KpiType;
  label: string;
  value: number | string;
  unit: string;
  trend?: number;
  status: 'ok' | 'warning' | 'error';
  thresholdMin?: number;
  thresholdMax?: number;
}

export interface CoverageHeatmapData {
  days: string[];
  shifts: string[];
  values: number[][];
  target: number;
}

export interface ShiftRotationHistogramData {
  labels: string[];
  values: number[];
}

export interface SkillRadarData {
  labels: string[];
  values: number[];
  maxValue: number;
}

export interface SimulationInput {
  staffChangePercent: number;
  absenteeismRate?: number;
  scenarioName?: string;
}

export interface SimulationResult {
  coverageImpact: number;
  ruleViolations: number;
  alerts: { severity: AlertSeverity; message: string }[];
  estimatedCostChange?: number;
}
