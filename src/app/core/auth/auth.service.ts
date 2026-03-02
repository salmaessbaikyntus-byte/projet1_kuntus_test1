import { Injectable, signal } from '@angular/core';
import { User, Role } from '../../shared/types';
import { AuthApiService } from '../services/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApiService) {}
  private userSignal = signal<User | null>({
    id: '1',
    name: 'Jean Manager',
    email: 'jean.manager@shiftmaster.com',
    role: 'MANAGER',
  });

  readonly user = this.userSignal.asReadonly();

  login(role: Role): void {
    this.userSignal.set({
      id: '1',
      name: `User ${role}`,
      email: `${role.toLowerCase()}@shiftmaster.com`,
      role,
    });
  }

  updateUser(user: Partial<User> & { id: string; name: string; email: string; role: Role }): void {
    this.userSignal.set(user as User);
  }

  logout(): void {
    this.authApi.clearToken();
    this.userSignal.set(null);
  }
}
