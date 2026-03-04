import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

export interface EmployeeListItem {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  cellId: string;
  role: string;
  status: string;
  contractType: string;
  seniority: string;
  equityScore: number;
  leaveBalance: number;
  skills: string[];
}

export interface EmployeeListResponse {
  items: EmployeeListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface EmployeeProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  cellId: string;
  avatarUrl?: string;
  role: string;
  status: string;
  contractType: string;
  seniority: string;
  equityScore: number;
  leaveBalance: number;
  skills: string[];
  availabilitySlots?: { dayOfWeek: number; startTime: string; endTime: string; isAvailable: boolean }[];
}

export interface OrganisationFilters {
  poles: string[];
  cellules: string[];
  departments: string[];
}

export interface CreateEmployeeRequest {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  cellId: string;
  role: string;
  contractType: string;
  seniority: string;
  leaveBalance: number;
  skills?: string[];
}

export interface UpdateEmployeeRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitle?: string;
  department?: string;
  cellId?: string;
  role?: string;
  status?: string;
  contractType?: string;
  seniority?: string;
  leaveBalance?: number;
  skills?: string[];
}

export interface EmployeeListParams {
  search?: string;
  pole?: string;
  cellule?: string;
  department?: string;
  role?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly base = `${API_BASE}/employees`;

  constructor(private http: HttpClient) {}

  getList(params: EmployeeListParams = {}): Observable<EmployeeListResponse> {
    let httpParams = new HttpParams();
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.pole) httpParams = httpParams.set('pole', params.pole);
    if (params.cellule) httpParams = httpParams.set('cellule', params.cellule);
    if (params.department) httpParams = httpParams.set('department', params.department);
    if (params.role) httpParams = httpParams.set('role', params.role);
    if (params.page != null) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize != null) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    return this.http.get<EmployeeListResponse>(this.base, { params: httpParams });
  }

  getOrganisationFilters(): Observable<OrganisationFilters> {
    return this.http.get<OrganisationFilters>(`${this.base}/organisation-filters`);
  }

  getById(id: string): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(`${this.base}/${id}`);
  }

  getMe(): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(`${this.base}/me`);
  }

  getMeEquity(cellId?: string): Observable<{ score: number; [key: string]: unknown }> {
    const params = cellId ? { cellId } : {};
    return this.http.get<{ score: number; [key: string]: unknown }>(`${this.base}/me/equity`, { params });
  }

  getEquity(id: string, cellId?: string): Observable<{ score: number; [key: string]: unknown }> {
    const params = cellId ? { cellId } : {};
    return this.http.get<{ score: number; [key: string]: unknown }>(`${this.base}/${id}/equity`, { params });
  }

  create(request: CreateEmployeeRequest): Observable<EmployeeProfile> {
    return this.http.post<EmployeeProfile>(this.base, request);
  }

  update(id: string, request: UpdateEmployeeRequest): Observable<EmployeeProfile> {
    return this.http.put<EmployeeProfile>(`${this.base}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
