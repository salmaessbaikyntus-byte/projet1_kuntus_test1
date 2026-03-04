import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { API_BASE } from './api.config';

/** Compte démo utilisable quand le backend est injoignable (mode démo frontend). */
const DEMO_EMAIL = 'admin@shiftmaster.com';
const DEMO_PASSWORD = 'ShiftMaster123!';

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
      tap((res) => this.setToken(res.token)),
      catchError((err) => {
        const useDemo = req.email === DEMO_EMAIL && req.password === DEMO_PASSWORD;
        const connectionFailed = err?.status === 0 || err?.error?.toString?.()?.includes('ProgressEvent');
        if (useDemo && connectionFailed) {
          const mock: LoginResponse = {
            token: 'demo-token-' + Date.now(),
            userId: 'demo-admin',
            email: DEMO_EMAIL,
            name: 'Admin Demo',
            role: 'ADMIN',
          };
          this.setToken(mock.token);
          return of(mock);
        }
        throw err;
      })
    );
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.base}/me`).pipe(
      catchError((err) => {
        const token = this.getToken();
        if (token?.startsWith('demo-token-')) {
          return of<MeResponse>({
            userId: 'demo-admin',
            email: DEMO_EMAIL,
            name: 'Admin Demo',
            role: 'ADMIN',
          });
        }
        throw err;
      })
    );
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
