import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE } from './api.config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  cellId?: string;
  avatarUrl?: string;
}

export interface MeResponse {
  userId: string;
  email: string;
  name: string;
  role: string;
  cellId?: string;
  avatarUrl?: string;
}

const TOKEN_KEY = 'shiftmaster_token';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly base = `${API_BASE}/auth`;

  constructor(private http: HttpClient) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, req).pipe(
      tap((res) => this.setToken(res.token))
    );
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.base}/me`);
  }

  seedUsers(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/seed-users`, {});
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
