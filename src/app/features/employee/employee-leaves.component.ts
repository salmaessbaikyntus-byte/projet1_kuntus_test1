import { Component, signal } from '@angular/core';
import { cn } from '../../shared/utils';

const LEAVE_REQUESTS = [
  { type: 'Annual', start: '2026-03-22', end: '2026-03-25', days: 4, status: 'Approved' },
  { type: 'Sick', start: '2026-02-10', end: '2026-02-10', days: 1, status: 'Approved' },
  { type: 'Annual', start: '2026-04-15', end: '2026-04-20', days: 6, status: 'Pending' },
];

@Component({
  selector: 'app-employee-leaves',
  standalone: true,
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">My Leaves</h1>
          <p class="text-slate-500">Manage your leave requests, balances, and history.</p>
        </div>
        <button (click)="showForm.set(true)" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">+ New Request</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Paid Leave</p>
          <span class="text-3xl font-bold text-slate-900">12.5j</span>
          <span class="text-xs text-slate-400 font-bold mb-1.5">Remaining</span>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Type</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Dates</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Duration</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (l of LEAVE_REQUESTS; track l.start) {
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4"><span class="text-sm font-medium text-slate-700">{{ l.type }} Leave</span></td>
                <td class="p-4 text-xs text-slate-600">{{ l.start }} → {{ l.end }}</td>
                <td class="p-4 text-xs font-bold text-slate-900">{{ l.days }} days</td>
                <td class="p-4">
                  <span [class]="cn('inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider', l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700')">{{ l.status }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm()) {
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" (click)="showForm.set(false)"></div>
        <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[110] overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-bold text-slate-900">New Leave Request</h3>
            <button (click)="showForm.set(false)" class="p-2 hover:bg-slate-200 rounded-full">×</button>
          </div>
          <div class="p-8 space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Leave Type</label>
              <select class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option>Annual Leave</option>
                <option>Sick Leave</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date</label>
                <input type="date" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">End Date</label>
                <input type="date" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
          <div class="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-4">
            <button (click)="showForm.set(false)" class="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white">Cancel</button>
            <button class="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700">Submit Request</button>
          </div>
        </div>
      }
    </div>
  `,
  imports: [],
})
export class EmployeeLeavesComponent {
  showForm = signal(false);
  LEAVE_REQUESTS = LEAVE_REQUESTS;
  cn = cn;
}
