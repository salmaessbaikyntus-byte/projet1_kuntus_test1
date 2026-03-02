import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_EMPLOYEES } from '../../shared/mock-data';
import { Employee } from '../../shared/types';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-employees',
  standalone: true,
  template: `
    <div class="space-y-8 relative">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Employee Directory</h1>
          <p class="text-slate-500">Manage your workforce, skills, and contract details.</p>
        </div>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Add Employee</button>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" placeholder="Search by name, role, or department..." [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set(\$event)" class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Employee</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Role & Dept</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Skills</th>
              <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (emp of filteredEmployees(); track emp.id) {
              <tr class="hover:bg-slate-50/50 transition-colors cursor-pointer" (click)="selectedEmployee.set(emp)">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">{{ emp.firstName[0] }}{{ emp.lastName[0] }}</div>
                    <div>
                      <p class="text-sm font-semibold text-slate-900">{{ emp.firstName }} {{ emp.lastName }}</p>
                      <p class="text-xs text-slate-500">{{ emp.contractType }} • {{ emp.seniority }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4">
                  <p class="text-sm font-medium text-slate-700">{{ emp.jobTitle }}</p>
                  <p class="text-xs text-slate-400">{{ emp.department }}</p>
                </td>
                <td class="p-4">
                  <div class="flex flex-wrap gap-1">
                    @for (skill of emp.skills; track skill) {
                      <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{{ skill }}</span>
                    }
                  </div>
                </td>
                <td class="p-4">
                  <span [class]="cn('inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : emp.status === 'On Leave' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-600')">{{ emp.status }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (selectedEmployee(); as emp) {
        <div class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" (click)="selectedEmployee.set(null)"></div>
        <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-bold text-slate-900">Employee Details</h3>
            <button (click)="selectedEmployee.set(null)" class="p-2 hover:bg-slate-200 rounded-full transition-colors">×</button>
          </div>
          <div class="flex-1 overflow-y-auto p-8 space-y-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-4">{{ emp.firstName[0] }}{{ emp.lastName[0] }}</div>
              <h2 class="text-xl font-bold text-slate-900">{{ emp.firstName }} {{ emp.lastName }}</h2>
              <p class="text-slate-500 font-medium">{{ emp.jobTitle }} • {{ emp.department }}</p>
              <div class="mt-4 flex gap-2">
                <span class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">{{ emp.contractType }}</span>
                <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">{{ emp.seniority }}</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (skill of emp.skills; track skill) {
                <div class="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700">{{ skill }}</div>
              }
            </div>
          </div>
          <div class="p-6 border-t border-slate-100 bg-slate-50/50">
            <button class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">Edit Profile</button>
          </div>
        </div>
      }
    </div>
  `,
  imports: [FormsModule],
})
export class EmployeesComponent {
  searchQuery = signal('');
  selectedEmployee = signal<Employee | null>(null);

  filteredEmployees = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return MOCK_EMPLOYEES.filter(
      (emp) => `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) || emp.jobTitle.toLowerCase().includes(q)
    );
  });
  cn = cn;
}
