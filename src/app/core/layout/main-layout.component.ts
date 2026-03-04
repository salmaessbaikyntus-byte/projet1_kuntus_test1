import { Component, signal, computed, effect, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AuthApiService } from '../services/auth-api.service';
import { ThemeService } from '../services/theme.service';
import { NotificationSignalService } from '../services/notification-signal.service';
import { TranslateService } from '../services/translate.service';
import { Role } from '../../shared/types';
import { cn } from '../../shared/utils';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface NavItem {
  id: string;
  name: string;
  route: string;
  icon: string;
  roles: Role[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, TranslatePipe],
  template: `
    <div class="min-h-screen flex bg-[#F8FAFC] dark:bg-slate-900">
      <aside [class]="cn('bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col z-50', isSidebarOpen() ? 'w-64' : 'w-20')">
        <div class="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <img src="assets/images/logo-kyntus.png" alt="Kyntus Morocco" class="h-9 w-auto object-contain dark:brightness-0 dark:invert" />
          @if (isSidebarOpen()) {
            <span class="font-bold text-lg tracking-tight text-slate-900 dark:text-white truncate">{{ 'app.name' | translate: translate.lang() }}</span>
          }
        </div>

        <div class="p-4 border-b border-slate-100 dark:border-slate-700">
          <select
            [ngModel]="auth.user()?.role"
            (ngModelChange)="onRoleChange($event)"
            [class.hidden]="!isSidebarOpen()"
            class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="MANAGER">{{ 'roles.manager' | translate: translate.lang() }}</option>
            <option value="RH">{{ 'roles.rh' | translate: translate.lang() }}</option>
            <option value="EMPLOYEE">{{ 'roles.employee' | translate: translate.lang() }}</option>
            <option value="ADMIN">{{ 'roles.admin' | translate: translate.lang() }}</option>
            <option value="AUDITOR">{{ 'roles.auditor' | translate: translate.lang() }}</option>
          </select>
        </div>

        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          @for (item of filteredNavigation(); track item.id) {
            <a
              [routerLink]="item.route"
              routerLinkActive="bg-indigo-50 text-indigo-700"
              [routerLinkActiveOptions]="{exact: item.route === '/dashboard' || item.route === '/employee-dashboard'}"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium block text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            >
              <span class="shrink-0" [innerHTML]="item.icon"></span>
              @if (isSidebarOpen()) {
                <span>{{ 'nav.' + item.id | translate: translate.lang() }}</span>
              }
            </a>
          }
        </nav>

        <div class="p-4 border-t border-slate-100 dark:border-slate-700">
          <button class="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm" (click)="theme.toggle()">
            <span [innerHTML]="theme.isDarkMode() ? sunIcon : moonIcon"></span>
            @if (isSidebarOpen()) {
              <span>{{ (theme.isDarkMode() ? 'layout.lightMode' : 'layout.darkMode') | translate: translate.lang() }}</span>
            }
          </button>
          <button class="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-sm mt-1" (click)="logout()">
            <span [innerHTML]="logoutIcon"></span>
            @if (isSidebarOpen()) {
              <span>{{ 'layout.logout' | translate: translate.lang() }}</span>
            }
          </button>
        </div>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 shrink-0">
          <div class="flex items-center gap-4">
            <button (click)="toggleSidebar()" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <span [innerHTML]="isSidebarOpen() ? menuCloseIcon : menuIcon"></span>
            </button>
            <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <img src="assets/images/logo-kyntus.png" alt="Kyntus" class="h-6 w-auto object-contain dark:brightness-0 dark:invert" />
              <span>{{ 'app.name' | translate: translate.lang() }}</span>
              <span class="mx-1" [innerHTML]="chevronIcon"></span>
              <span class="text-slate-900 dark:text-white font-medium">{{ currentTabKey() | translate: translate.lang() }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
              <button type="button" (click)="translate.use('fr')" [class]="translate.lang() === 'fr' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'" class="px-3 py-1.5 text-xs font-medium transition-colors">FR</button>
              <button type="button" (click)="translate.use('en')" [class]="translate.lang() === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'" class="px-3 py-1.5 text-xs font-medium transition-colors">EN</button>
            </div>
            <div class="relative hidden md:block">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" [innerHTML]="searchIcon"></span>
              <input
                type="text"
                [placeholder]="'layout.searchPlaceholder' | translate: translate.lang()"
                class="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
            <button class="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
              <span [innerHTML]="bellIcon"></span>
              @if (notificationService.unreadCount() > 0) {
                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              }
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ auth.user()?.name }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ auth.user()?.role }}</p>
              </div>
              <div class="w-9 h-9 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300">
                <span [innerHTML]="userIcon"></span>
              </div>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-8">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = signal(true);

  // SVG Icons
  menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>';
  menuCloseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  chevronIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
  searchIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  bellIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';
  userIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
  logoutIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';

  navigation: NavItem[] = [
    { id: 'dashboard', name: 'Dashboard', route: '/dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>', roles: ['MANAGER', 'ADMIN', 'RH'] },
    { id: 'approvals', name: 'Approvals', route: '/approvals', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>', roles: ['MANAGER', 'ADMIN', 'RH'] },
    { id: 'planning', name: 'Planning', route: '/planning', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>', roles: ['MANAGER', 'ADMIN'] },
    { id: 'team', name: 'Team Overview', route: '/team', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', roles: ['MANAGER', 'ADMIN', 'RH'] },
    { id: 'analytics', name: 'Analytics', route: '/analytics', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>', roles: ['MANAGER', 'ADMIN', 'RH'] },
    { id: 'reporting', name: 'Reporting', route: '/reporting', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>', roles: ['MANAGER', 'ADMIN', 'RH', 'AUDITOR'] },
    { id: 'alerts', name: 'Alerts & Risks', route: '/alerts', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>', roles: ['MANAGER', 'ADMIN'] },
    { id: 'audit', name: 'Audit Log', route: '/audit', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l2 2"/><circle cx="12" cy="12" r="10"/></svg>', roles: ['ADMIN', 'AUDITOR'] },
    { id: 'settings', name: 'Business Rules', route: '/settings', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>', roles: ['ADMIN'] },
    { id: 'employee-dashboard', name: 'My Portal', route: '/employee-dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', roles: ['EMPLOYEE'] },
    { id: 'employee-planning', name: 'My Planning', route: '/employee-planning', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>', roles: ['EMPLOYEE'] },
    { id: 'employee-leaves', name: 'My Leaves', route: '/employee-leaves', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>', roles: ['EMPLOYEE'] },
  ];

  filteredNavigation = computed(() => {
    const role = this.auth.user()?.role;
    return this.navigation.filter((item) => role && item.roles.includes(role));
  });

  currentTabLabel = computed(() => {
    const url = this.router.url.split('?')[0];
    const item = this.navigation.find((n) => n.route === url || (url.startsWith(n.route) && n.route !== '/'));
    return item?.name?.replace(' ', '-')?.toLowerCase() ?? 'dashboard';
  });

  currentTabKey = computed(() => {
    const url = this.router.url.split('?')[0];
    const item = this.navigation.find((n) => n.route === url || (url.startsWith(n.route) && n.route !== '/'));
    return item ? 'nav.' + item.id : 'nav.dashboard';
  });

  readonly notificationService = inject(NotificationSignalService);
  readonly translate = inject(TranslateService);

  constructor(
    public auth: AuthService,
    public authApi: AuthApiService,
    public theme: ThemeService,
    public router: Router
  ) {
    effect(() => {
      const role = this.auth.user()?.role;
      const url = this.router.url.split('?')[0];
      if (!role) return;
      if (role === 'EMPLOYEE' && !url.startsWith('/employee')) {
        this.router.navigate(['/employee-dashboard']);
      } else if (role !== 'EMPLOYEE' && url.startsWith('/employee')) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {
    if (this.authApi.getToken()) {
      this.authApi.me().subscribe({
        next: (me) => {
          this.auth.updateUser({
            id: me.userId,
            name: me.name,
            email: me.email,
            role: me.role as Role,
          });
        },
      });
    }
  }

  cn = cn;

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onRoleChange(role: Role): void {
    this.auth.login(role);
    if (role === 'EMPLOYEE') {
      this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}