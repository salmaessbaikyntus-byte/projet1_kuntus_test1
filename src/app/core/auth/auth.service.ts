import { Injectable, signal, computed } from '@angular/core';
import { User, Role } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
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

  logout(): void {
    this.userSignal.set(null);
  }
}
