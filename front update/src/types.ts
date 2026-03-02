/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ReportCategory {
  PLANNING = "Planning",
  STAFF = "Effectifs",
  LEAVE = "Congés",
  PERFORMANCE = "Performance",
}

export enum ReportType {
  DAILY_PLANNING = "Planning journalier",
  WEEKLY_PLANNING = "Planning hebdomadaire",
  TEN_PERCENT_RULE = "Règle des 10%",
  PLATEAU_COVERAGE = "Couverture plateau",
  KPI_PERFORMANCE = "KPI performance",
  SHIFT_EQUITY = "Équité horaires",
  SICK_LEAVE = "Absences maladie",
  PLANNING_IMPACT = "Impact planning",
}

export enum ReportStatus {
  VALID = "Valide",
  OBSOLETE = "Obsolète",
  GENERATING = "Génération...",
}

export interface ReportHistoryItem {
  id: string;
  name: string;
  category: ReportCategory;
  period: string;
  author: string;
  status: ReportStatus;
  timestamp: string;
}

export interface AnalyticsMetrics {
  coverageRate: number;
  equityIndex: number;
  tenPercentCompliance: boolean;
  estimatedHRCost: number;
}

export interface SimulationState {
  absenceRate: number;
  isSimulating: boolean;
}
