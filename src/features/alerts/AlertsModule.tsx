import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Filter, 
  Search, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_ALERTS } from '../../shared/mockData';

export function AlertsModule() {
  const [filter, setFilter] = useState('All');

  const filteredAlerts = MOCK_ALERTS.filter(a => filter === 'All' || a.type === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alerts & Risks</h1>
          <p className="text-slate-500">Anticipate operational risks and compliance violations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 shadow-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Critical Alerts (1)
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['All', 'Coverage', 'Compliance', 'Overload', 'Equity'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                filter === f ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="h-6 w-px bg-slate-200 hidden md:block" />
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={cn(
              "bg-white rounded-xl border-l-4 shadow-sm overflow-hidden hover:shadow-md transition-all",
              alert.priority === 'P1' ? "border-l-red-500" : 
              alert.priority === 'P2' ? "border-l-orange-500" : "border-l-indigo-500"
            )}>
              <div className="p-6 flex items-start gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  alert.priority === 'P1' ? "bg-red-50 text-red-600" : 
                  alert.priority === 'P2' ? "bg-orange-50 text-orange-600" : "bg-indigo-50 text-indigo-600"
                )}>
                  {alert.type === 'Coverage' ? <AlertTriangle className="w-6 h-6" /> : 
                   alert.type === 'Compliance' ? <ShieldAlert className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900">{alert.message}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      alert.priority === 'P1' ? "bg-red-500 text-white" : 
                      alert.priority === 'P2' ? "bg-orange-500 text-white" : "bg-indigo-500 text-white"
                    )}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Team: <span className="font-semibold text-slate-700">{alert.team}</span> • {alert.time}</p>
                  
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                      <Info className="w-4 h-4" /> View Cause
                    </button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Simuler Correction
                    </button>
                    <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-2 ml-auto">
                      <Bell className="w-4 h-4" /> Notify Manager
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Risk Distribution</h3>
            <div className="space-y-6">
              {[
                { label: 'Coverage Risk', value: 15, color: 'bg-red-500' },
                { label: 'Compliance Risk', value: 8, color: 'bg-orange-500' },
                { label: 'Equity Risk', value: 22, color: 'bg-indigo-500' },
              ].map(risk => (
                <div key={risk.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">{risk.label}</span>
                    <span className="text-slate-900">{risk.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", risk.color)} style={{ width: `${risk.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Resolved Recently
            </h3>
            <div className="space-y-4">
              {[
                { msg: 'Night Shift Coverage Fixed', time: '2h ago' },
                { msg: 'Compliance Rule 10% Met', time: '5h ago' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs font-medium text-white/80">{r.msg}</p>
                  <span className="text-[10px] text-white/40">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
