/**
 * Modèles et enums pour le module Reporting
 * ShiftMaster Enterprise SaaS
 */

export type ReportCategory = 'Planning' | 'Effectifs' | 'Congés' | 'Performance';

export type ReportType =
  | 'PlanningHebdo'
  | 'PlanningMensuel'
  | 'EffectifsParDepartement'
  | 'EffectifsParEquipe'
  | 'CongesUtilises'
  | 'SoldeConges'
  | 'PerformanceEquipe'
  | 'PerformanceIndividuelle';

export type ReportStatus = 'Draft' | 'Generating' | 'Ready' | 'Valid' | 'Obsolete' | 'Error';

export interface ReportConfig {
  category: ReportCategory;
  reportType: ReportType;
  periodStart: string;
  periodEnd: string;
  department?: string;
  team?: string;
  employeeId?: string;
}

export interface Report {
  id: string;
  name: string;
  category: ReportCategory;
  reportType: ReportType;
  periodStart: string;
  periodEnd: string;
  author: string;
  status: ReportStatus;
  createdAt: string;
  generatedAt?: string;
  errorMessage?: string;
  downloadUrl?: string;
}

/** Configuration des types de rapport par catégorie (pilotée par enum/config) */
export const REPORT_TYPES_BY_CATEGORY: Record<ReportCategory, ReportType[]> = {
  Planning: ['PlanningHebdo', 'PlanningMensuel'],
  Effectifs: ['EffectifsParDepartement', 'EffectifsParEquipe'],
  Congés: ['CongesUtilises', 'SoldeConges'],
  Performance: ['PerformanceEquipe', 'PerformanceIndividuelle'],
};
