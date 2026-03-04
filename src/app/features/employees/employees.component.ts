import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService, EmployeeListItem, EmployeeProfile, OrganisationFilters, CreateEmployeeRequest, UpdateEmployeeRequest } from '../../core/services/employee.service';
import { cn } from '../../shared/utils';

@Component({
  selector: 'app-employees',
  standalone: true,
  template: `
    <div class="space-y-8 relative">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Employee Directory</h1>
          <p class="text-slate-500 dark:text-slate-400">Manage your workforce, skills, and contract details.</p>
        </div>
        <button type="button" (click)="openCreate()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Add Employee</button>
      </div>

      <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" placeholder="Search by name or email..." [ngModel]="searchQuery()" (ngModelChange)="onSearchChange(\$event)" class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
        </div>
        <select [ngModel]="filterPole()" (ngModelChange)="filterPole.set($event); load()" class="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white">
          <option value="">All Poles</option>
          @for (p of orgFilters()?.poles ?? []; track p) { <option [value]="p">{{ p }}</option> }
        </select>
        <select [ngModel]="filterCellule()" (ngModelChange)="filterCellule.set($event); load()" class="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white">
          <option value="">All Cellules</option>
          @for (c of orgFilters()?.cellules ?? []; track c) { <option [value]="c">{{ c }}</option> }
        </select>
        <select [ngModel]="filterRole()" (ngModelChange)="filterRole.set($event); load()" class="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white">
          <option value="">All Roles</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="RH">RH</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      @if (loading()) {
        <p class="text-slate-500">Loading...</p>
      } @else {
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Employee</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Role & Dept</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Skills</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                <th class="p-4 text-[10px] font-bold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              @for (emp of employees(); track emp.id) {
                <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">{{ emp.name.split(' ').map((n: string) => n[0]).join('').slice(0,2) }}</div>
                      <div>
                        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ emp.name }}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ emp.contractType }} • {{ emp.seniority }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ emp.jobTitle }}</p>
                    <p class="text-xs text-slate-400 dark:text-slate-500">{{ emp.department }}</p>
                  </td>
                  <td class="p-4">
                    <div class="flex flex-wrap gap-1">
                      @for (skill of emp.skills; track skill) {
                        <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded text-[10px] font-medium">{{ skill }}</span>
                      }
                    </div>
                  </td>
                  <td class="p-4">
                    <span [class]="cn('inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider', emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : emp.status === 'On Leave' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300')">{{ emp.status }}</span>
                  </td>
                  <td class="p-4">
                    <button type="button" (click)="openEdit(emp)" class="text-indigo-600 dark:text-indigo-400 text-sm font-medium mr-2">Edit</button>
                    <button type="button" (click)="confirmDelete(emp)" class="text-red-600 dark:text-red-400 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p class="text-sm text-slate-500 dark:text-slate-400">Total: {{ totalCount() }} • Page {{ page() }} of {{ totalPages() }}</p>
            <div class="flex gap-2">
              <button type="button" (click)="prevPage()" [disabled]="page() <= 1" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium disabled:opacity-50">Previous</button>
              <button type="button" (click)="nextPage()" [disabled]="page() >= totalPages()" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      }

      <!-- Detail / Edit panel -->
      @if (selectedProfile(); as profile) {
        <div class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" (click)="selectedProfile.set(null)"></div>
        <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-[70] flex flex-col">
          <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/30">
            <h3 class="font-bold text-slate-900 dark:text-white">{{ isEdit ? 'Edit Employee' : 'Employee Details' }}</h3>
            <button type="button" (click)="selectedProfile.set(null)" class="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors">×</button>
          </div>
          <div class="flex-1 overflow-y-auto p-8 space-y-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-4">{{ profile.firstName[0] }}{{ profile.lastName[0] }}</div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ profile.firstName }} {{ profile.lastName }}</h2>
              <p class="text-slate-500 dark:text-slate-400 font-medium">{{ profile.jobTitle }} • {{ profile.department }}</p>
              <div class="mt-4 flex gap-2">
                <span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">{{ profile.contractType }}</span>
                <span class="px-3 py-1 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wider">{{ profile.seniority }}</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (skill of profile.skills; track skill) {
                <div class="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">{{ skill }}</div>
              }
            </div>
          </div>
          <div class="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
            <button type="button" (click)="openEditFromProfile(profile)" class="w-full py-3 bg-slate-900 dark:bg-slate-600 text-white rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-500 transition-all">Edit Profile</button>
          </div>
        </div>
      }

      <!-- Create / Edit form modal -->
      @if (showForm(); as formState) {
        <div class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" (click)="closeForm()"></div>
        <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">{{ formState.isEdit ? 'Edit Employee' : 'Add Employee' }}</h3>
            <form (ngSubmit)="submitForm()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">First name</label>
                  <input type="text" [(ngModel)]="formState.firstName" name="firstName" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Last name</label>
                  <input type="text" [(ngModel)]="formState.lastName" name="lastName" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                <input type="email" [(ngModel)]="formState.email" name="email" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" [readonly]="formState.isEdit" required />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Job title</label>
                <input type="text" [(ngModel)]="formState.jobTitle" name="jobTitle" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Department</label>
                <input type="text" [(ngModel)]="formState.department" name="department" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Cellule</label>
                <select [(ngModel)]="formState.cellId" name="cellId" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                  @for (c of orgFilters()?.cellules ?? []; track c) { <option [value]="c">{{ c }}</option> }
                </select>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Contract</label>
                  <select [(ngModel)]="formState.contractType" name="contractType" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Seniority</label>
                  <select [(ngModel)]="formState.seniority" name="seniority" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              @if (formState.isEdit) {
                <div>
                  <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
                  <select [(ngModel)]="formState.status" name="status" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              }
              <div>
                <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Leave balance</label>
                <input type="number" step="0.5" [(ngModel)]="formState.leaveBalance" name="leaveBalance" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white" />
              </div>
              <div class="flex gap-2 justify-end pt-4">
                <button type="button" (click)="closeForm()" class="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete confirm -->
      @if (toDelete(); as emp) {
        <div class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" (click)="toDelete.set(null)"></div>
        <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <p class="text-slate-700 dark:text-slate-300">Delete employee <strong>{{ emp.name }}</strong>?</p>
            <div class="flex gap-2 justify-end mt-4">
              <button type="button" (click)="toDelete.set(null)" class="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">Cancel</button>
              <button type="button" (click)="doDelete(emp)" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  imports: [FormsModule],
})
export class EmployeesComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);

  loading = signal(true);
  employees = signal<EmployeeListItem[]>([]);
  totalCount = signal(0);
  page = signal(1);
  pageSize = 20;
  orgFilters = signal<OrganisationFilters | null>(null);
  searchQuery = signal('');
  filterPole = signal('');
  filterCellule = signal('');
  filterRole = signal('');
  selectedProfile = signal<EmployeeProfile | null>(null);
  toDelete = signal<EmployeeListItem | null>(null);

  showForm = signal<{
    isEdit: boolean;
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;
    cellId: string;
    role: string;
    status: string;
    contractType: string;
    seniority: string;
    leaveBalance: number;
  } | null>(null);

  isEdit = false;
  cn = cn;

  totalPages = computed(() => Math.max(1, Math.ceil(this.totalCount() / this.pageSize)));

  ngOnInit(): void {
    this.loadFilters();
    this.load();
  }

  loadFilters(): void {
    this.employeeService.getOrganisationFilters().subscribe({
      next: (f) => this.orgFilters.set(f),
      error: () => this.orgFilters.set({ poles: [], cellules: [], departments: [] }),
    });
  }

  load(): void {
    this.loading.set(true);
    this.employeeService.getList({
      search: this.searchQuery() || undefined,
      pole: this.filterPole() || undefined,
      cellule: this.filterCellule() || undefined,
      role: this.filterRole() || undefined,
      page: this.page(),
      pageSize: this.pageSize,
    }).subscribe({
      next: (res) => {
        this.employees.set(res.items);
        this.totalCount.set(res.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.employees.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
      },
    });
  }

  onSearchChange(q: string): void {
    this.searchQuery.set(q);
    this.page.set(1);
    this.load();
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.load();
    }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.load();
    }
  }

  openCreate(): void {
    const cellules = this.orgFilters()?.cellules ?? [];
    this.showForm.set({
      isEdit: false,
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      department: '',
      cellId: cellules[0] ?? '',
      role: 'EMPLOYEE',
      status: 'Active',
      contractType: 'CDI',
      seniority: 'Mid',
      leaveBalance: 10,
    });
  }

  openEdit(item: EmployeeListItem): void {
    this.employeeService.getById(item.id).subscribe({
      next: (profile) => {
        this.selectedProfile.set(profile);
        this.isEdit = true;
      },
    });
  }

  openEditFromProfile(profile: EmployeeProfile): void {
    this.selectedProfile.set(null);
    this.showForm.set({
      isEdit: true,
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      jobTitle: profile.jobTitle,
      department: profile.department,
      cellId: profile.cellId,
      role: profile.role,
      status: profile.status,
      contractType: profile.contractType,
      seniority: profile.seniority,
      leaveBalance: profile.leaveBalance,
    });
  }

  closeForm(): void {
    this.showForm.set(null);
  }

  submitForm(): void {
    const form = this.showForm();
    if (!form) return;
    if (form.isEdit && form.id) {
      this.employeeService.update(form.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        jobTitle: form.jobTitle,
        department: form.department,
        cellId: form.cellId,
        role: form.role,
        status: form.status,
        contractType: form.contractType,
        seniority: form.seniority,
        leaveBalance: form.leaveBalance,
      }).subscribe({
        next: () => { this.closeForm(); this.load(); },
        error: (err) => console.error(err),
      });
    } else {
      this.employeeService.create({
        userId: crypto.randomUUID(),
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        jobTitle: form.jobTitle,
        department: form.department,
        cellId: form.cellId,
        role: form.role,
        contractType: form.contractType,
        seniority: form.seniority,
        leaveBalance: form.leaveBalance,
      }).subscribe({
        next: () => { this.closeForm(); this.load(); },
        error: (err) => console.error(err),
      });
    }
  }

  confirmDelete(emp: EmployeeListItem): void {
    this.toDelete.set(emp);
  }

  doDelete(emp: EmployeeListItem): void {
    this.employeeService.delete(emp.id).subscribe({
      next: () => { this.toDelete.set(null); this.load(); },
      error: (err) => console.error(err),
    });
  }
}
