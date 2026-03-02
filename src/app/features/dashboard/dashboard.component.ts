import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MOCK_KPIS } from '../../shared/mock-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Welcome back, Manager</h1>
          <p class="text-slate-500">Here's what's happening with your workforce today.</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-slate-900">March 1st, 2026</p>
          <p class="text-xs text-slate-500">16:52 PM</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Next Planning
          </h3>
          <p class="text-indigo-100 text-sm mb-6">Week 11 generation is ready to be processed.</p>
          <button (click)="goToPlanning()" class="px-4 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all">
            Start Generation
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Coverage</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-3xl font-bold text-slate-900">{{ MOCK_KPIS.coverage }}%</span>
            <span class="text-xs text-emerald-600 font-bold mb-1.5">+2.4% vs last week</span>
          </div>
          <div class="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="bg-emerald-500 h-full rounded-full" [style.width.%]="MOCK_KPIS.coverage"></div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider">Equity Score</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-3xl font-bold text-slate-900">{{ MOCK_KPIS.equityScore }}</span>
            <span class="text-xs text-slate-400 font-bold mb-1.5">Target: 85</span>
          </div>
          <div class="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div class="bg-indigo-500 h-full rounded-full" [style.width.%]="MOCK_KPIS.equityScore"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-slate-900">Critical Alerts</h3>
            <span class="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold uppercase tracking-wider">3 Urgent</span>
          </div>
          <div class="p-0 divide-y divide-slate-50">
            @for (alert of alerts; track alert.title) {
              <div class="p-4 flex gap-4 hover:bg-slate-50/50 transition-colors">
                <div [class]="alert.type === 'error' ? 'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-50 text-red-600' : 'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-50 text-orange-600'">
                  <span [innerHTML]="alert.type === 'error' ? alertCircleIcon : zapIcon"></span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-bold text-slate-900">{{ alert.title }}</p>
                    <span class="text-[10px] text-slate-400 font-medium">{{ alert.time }}</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-0.5">{{ alert.desc }}</p>
                </div>
              </div>
            }
          </div>
          <button class="w-full p-4 text-xs font-bold text-indigo-600 hover:bg-slate-50 border-t border-slate-100 transition-all" routerLink="/alerts">View All Alerts</button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-slate-900">Recent Activity</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="p-6 space-y-6">
            @for (activity of activities; track activity.user) {
              <div class="flex gap-4 relative">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-500">{{ activity.user[0] }}</div>
                <div>
                  <p class="text-xs text-slate-600">
                    <span class="font-bold text-slate-900">{{ activity.user }}</span> {{ activity.action }} <span class="font-bold text-slate-900">{{ activity.target }}</span>
                  </p>
                  <p class="text-[10px] text-slate-400 mt-1">{{ activity.time }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [RouterLink],
})
export class DashboardComponent {
  MOCK_KPIS = MOCK_KPIS;

  alerts = [
    { title: 'Night Shift Understaffed', desc: 'Radiology dept needs 2 more staff for Wed.', time: '2h ago', type: 'error' as const },
    { title: 'Leave Request Conflict', desc: 'Alice and Bob requested same dates.', time: '4h ago', type: 'warning' as const },
    { title: 'Compliance Warning', desc: 'Rule 10% risk for Emergency ward.', time: '1d ago', type: 'warning' as const },
  ];

  activities = [
    { user: 'Admin', action: 'published planning', target: 'Week 09', time: '10 min ago' },
    { user: 'System', action: 'generated report', target: 'Equity Q1', time: '1h ago' },
    { user: 'Manager', action: 'approved leave', target: 'Alice Durand', time: '3h ago' },
  ];

  alertCircleIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
  zapIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

  constructor(private router: Router) {}

  goToPlanning(): void {
    this.router.navigate(['/planning']);
  }
}
