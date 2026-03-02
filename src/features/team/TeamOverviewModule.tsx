import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_EMPLOYEES } from '../../shared/mockData';

export function TeamOverviewModule() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Overview</h1>
          <p className="text-slate-500">Real-time operational status and human health of your team.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" /> View Team Planning
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Team Capacity</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">18/20</span>
            <span className="text-xs text-orange-600 font-bold mb-1.5">2 on leave</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Equity</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">84%</span>
            <span className="text-xs text-emerald-600 font-bold mb-1.5">+3% this week</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Workload Risk</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">Low</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">No overload detected</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-200 h-full rounded-full" style={{ width: '20%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-slate-900">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_EMPLOYEES.map(emp => (
              <div key={emp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 font-bold text-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</h4>
                    <p className="text-xs text-slate-500">{emp.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-600">{emp.equityScore}%</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Equity</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Weekly Load</span>
                    <span className="font-bold text-slate-700">38h / 40h</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      emp.status === 'Active' ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                    )}>
                      {emp.status}
                    </span>
                    <button className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                      View Schedule <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Availability vs Needs
            </h3>
            <div className="space-y-6">
              {['Morning', 'Afternoon', 'Night'].map(shift => (
                <div key={shift} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">{shift}</span>
                    <span className="text-white">95% Covered</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={cn(
                        "flex-1 rounded-full",
                        i < 9 ? "bg-indigo-500" : "bg-white/10"
                      )} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Upcoming Absences</h3>
            <div className="space-y-4">
              {[
                { name: 'Diana Rossi', date: 'Mar 5 - Mar 12', type: 'Annual Leave' },
                { name: 'Bob Lefebvre', date: 'Mar 8', type: 'Sick Leave' },
              ].map((abs, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 text-xs font-bold border border-slate-100">
                    {abs.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{abs.name}</p>
                    <p className="text-[10px] text-slate-500">{abs.date} • {abs.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
