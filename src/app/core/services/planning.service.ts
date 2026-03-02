import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private readonly base = `${API_BASE}/planning`;

  constructor(private http: HttpClient) {}

  generateWeek(request: GenerateWeekRequest): Observable<GenerateWeekResponse> {
    return this.http.post<GenerateWeekResponse>(`${this.base}/generate-week`, request);
  }
}
