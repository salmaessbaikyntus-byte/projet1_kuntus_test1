import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthApiService } from '../../core/services/auth-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Role } from '../../shared/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <div class="mb-8 flex items-center justify-center gap-3">
          <div class="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">S</div>
          <span class="text-2xl font-bold text-slate-900 dark:text-white">ShiftMaster</span>
        </div>

        <h1 class="text-center text-xl font-bold text-slate-900 dark:text-white mb-2">Connexion</h1>
        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">Entrez vos identifiants</p>

        @if (error()) {
          <div class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {{ error() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              [placeholder]="placeholderEmail"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mot de passe</label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Démo : {{ demoCredentials }}
          </p>
          <button
            type="submit"
            [disabled]="loading()"
            class="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {{ loading() ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  placeholderEmail = 'admin@shiftmaster.com';
  demoCredentials = 'admin@shiftmaster.com / ShiftMaster123!';
  email = 'admin@shiftmaster.com';
  password = 'ShiftMaster123!';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.authApi.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.login(res.role as Role);
        this.auth.updateUser({
          id: res.userId,
          name: res.name,
          email: res.email,
          role: res.role as Role,
        });
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Identifiants incorrects');
        this.loading.set(false);
      },
    });
  }
}
