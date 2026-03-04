import { Component, output, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ReportCategory,
  ReportType,
  ReportConfig,
  REPORT_TYPES_BY_CATEGORY,
} from '../../../shared/models';
import { cn } from '../../../shared/utils';

const CATEGORIES: ReportCategory[] = ['Planning', 'Effectifs', 'Congés', 'Performance'];
const DEPARTMENTS = ['Urgences', 'Radiologie', 'Pédiatrie', 'Bloc opératoire'];
const TEAMS = ['Équipe A', 'Équipe B', 'Équipe C'];

@Component({
  selector: 'app-reporting-config-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div class="flex flex-wrap items-end gap-4">
        <!-- Tabs catégories -->
        <div class="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
          @for (cat of categories; track cat) {
            <button
              type="button"
              (click)="category.set(cat)"
              [class]="cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                category() === cat
                  ? 'bg-white text-indigo-600 shadow dark:bg-slate-600 dark:text-indigo-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              )"
            >
              {{ cat }}
            </button>
          }
        </div>

        <!-- Type de rapport -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Type de rapport
          </label>
          <select
            [ngModel]="reportType()"
            (ngModelChange)="onReportTypeChange($event)"
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            @for (t of reportTypes(); track t) {
              <option [value]="t">{{ formatReportType(t) }}</option>
            }
          </select>
        </div>

        <!-- Période -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Du
          </label>
          <input
            type="date"
            [ngModel]="periodStart()"
            (ngModelChange)="periodStart.set($event)"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Au
          </label>
          <input
            type="date"
            [ngModel]="periodEnd()"
            (ngModelChange)="periodEnd.set($event)"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <!-- Filtre département -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Département
          </label>
          <select
            [ngModel]="department()"
            (ngModelChange)="department.set($event)"
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option value="">Tous</option>
            @for (d of departments; track d) {
              <option [value]="d">{{ d }}</option>
            }
          </select>
        </div>

        <!-- Filtre équipe -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Équipe
          </label>
          <select
            [ngModel]="team()"
            (ngModelChange)="team.set($event)"
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option value="">Toutes</option>
            @for (t of teams; track t) {
              <option [value]="t">{{ t }}</option>
            }
          </select>
        </div>

        <button
          type="button"
          (click)="onGenerate()"
          class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Générer
        </button>
      </div>
    </div>
  `,
})
export class ReportingConfigBarComponent {
  categories = CATEGORIES;
  departments = DEPARTMENTS;
  teams = TEAMS;

  category = signal<ReportCategory>('Planning');
  reportType = signal<ReportType>('PlanningHebdo');
  periodStart = signal(this.getDefaultStart());
  periodEnd = signal(this.getDefaultEnd());
  department = signal('');
  team = signal('');

  reportTypes = computed(() => REPORT_TYPES_BY_CATEGORY[this.category()]);
  configGenerate = output<ReportConfig>();

  cn = cn;

  constructor() {
    effect(() => {
      const cat = this.category();
      const types = REPORT_TYPES_BY_CATEGORY[cat];
      if (types && !types.includes(this.reportType())) {
        this.reportType.set(types[0]);
      }
    });
  }

  onReportTypeChange(value: string): void {
    this.reportType.set(value as ReportType);
  }

  onGenerate(): void {
    this.configGenerate.emit({
      category: this.category(),
      reportType: this.reportType(),
      periodStart: this.periodStart(),
      periodEnd: this.periodEnd(),
      department: this.department() || undefined,
      team: this.team() || undefined,
    });
  }

  formatReportType(t: ReportType): string {
    return t.replace(/([A-Z])/g, ' $1').trim();
  }

  private getDefaultStart(): string {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().slice(0, 10);
  }

  private getDefaultEnd(): string {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
}
