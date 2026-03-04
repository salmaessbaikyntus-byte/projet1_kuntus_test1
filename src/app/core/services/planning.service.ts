import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface GenerateWeekRequest {
  weekStart: string;
  cellId: string;
  employeeCount?: number;
}

export interface GenerateWeekResponse {
  planningId: string;
  weekStart: string;
  weekEnd: string;
  coveragePercent: number;
  pauseSensitivePercent: number;
  assignedCount: number;
  isCompliant: boolean;
}

export interface PlanningDaySlot {
  employeeId?: string;
  employeeName?: string;
  shiftType?: string;
  startTime?: string;
  endTime?: string;
}

export interface PlanningWeekResponse {
  weekStart: string;
  weekEnd: string;
  days: { date: string; slots: PlanningDaySlot[] }[];
}

export interface PlanningMonthResponse {
  year: number;
  month: number;
  weeks: PlanningWeekResponse[];
}

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private readonly base = `${API_BASE}/planning`;

  constructor(private http: HttpClient) {}

  getToday(): Observable<{ date: string; slots: PlanningDaySlot[] }> {
    return this.http.get<{ date: string; slots: PlanningDaySlot[] }>(`${this.base}/today`);
  }

  getWeek(weekStart: string): Observable<PlanningWeekResponse> {
    const params = new HttpParams().set('weekStart', weekStart);
    return this.http.get<PlanningWeekResponse>(`${this.base}/week`, { params });
  }

  getMonth(year: number, month: number): Observable<PlanningMonthResponse> {
    const params = new HttpParams().set('year', year.toString()).set('month', month.toString());
    return this.http.get<PlanningMonthResponse>(`${this.base}/month`, { params });
  }

  generateWeek(request: GenerateWeekRequest): Observable<GenerateWeekResponse> {
    return this.http.post<GenerateWeekResponse>(`${this.base}/generate-week`, request);
  }

  simulate(request: { weekStart: string; cellId: string; staffChangePercent?: number }): Observable<unknown> {
    return this.http.post<unknown>(`${this.base}/simulate`, request);
  }
}
