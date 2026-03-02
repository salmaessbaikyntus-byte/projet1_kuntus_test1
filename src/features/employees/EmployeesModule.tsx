import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Briefcase, 
  GraduationCap,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_EMPLOYEES } from '../../shared/mockData';
import { Employee } from '../../shared/types';

export function EmployeesModule() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Directory</h1>
          <p className="text-slate-500">Manage your workforce, skills, and contract details.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
          Add Employee
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, role, or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-indigo-500">
            <option>All Departments</option>
            <option>Emergency</option>
            <option>Radiology</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Employee</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Role & Dept</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Skills</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmployees.map(emp => (
              <tr 
                key={emp.id} 
                className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                onClick={() => setSelectedEmployee(emp)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                      {emp.firstName[0]}{emp.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                      <p className="text-xs text-slate-500">{emp.contractType} • {emp.seniority}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-slate-700">{emp.jobTitle}</p>
                  <p className="text-xs text-slate-400">{emp.department}</p>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {emp.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    emp.status === 'Active' ? "bg-emerald-50 text-emerald-700" :
                    emp.status === 'On Leave' ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Detail Drawer */}
      {selectedEmployee && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" 
            onClick={() => setSelectedEmployee(null)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Employee Details</h3>
              <button onClick={() => setSelectedEmployee(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-indigo-200">
                  {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                <p className="text-slate-500 font-medium">{selectedEmployee.jobTitle} • {selectedEmployee.department}</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedEmployee.contractType}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedEmployee.seniority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
                  <Phone className="w-4 h-4" /> Call
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map(skill => (
                      <div key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> Professional Info
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-600">Seniority Level</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{selectedEmployee.seniority}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-600">Location</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">Main Campus</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
