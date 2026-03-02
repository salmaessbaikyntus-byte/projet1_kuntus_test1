import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Settings2, 
  History,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../shared/utils';
import { MOCK_KPIS } from '../../shared/mockData';

export function PlanningModule() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState('Week 10 - 2026');

  const steps = [
    { label: 'Data Collection', status: 'completed' },
    { label: 'Constraint Analysis', status: 'completed' },
    { label: 'AI Generation', status: 'active' },
    { label: 'Validation & Publishing', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Planning Generation</h1>
          <p className="text-slate-500">Configure and generate optimized schedules for your teams.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 flex items-center gap-2">
            <History className="w-4 h-4" />
            History
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
            <Play className="w-4 h-4" />
            Generate Planning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Configuration Column */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-indigo-600" />
              Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Week</label>
                <select 
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Week 10 - 2026</option>
                  <option>Week 11 - 2026</option>
                  <option>Week 12 - 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                  <option>Emergency Ward</option>
                  <option>Radiology</option>
                  <option>Pediatrics</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">Simulation Mode</span>
                  <button 
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      isSimulating ? "bg-indigo-600" : "bg-slate-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      isSimulating ? "left-6" : "left-1"
                    )} />
                  </button>
                </div>
                <p className="text-xs text-slate-400">Run generation without affecting live schedules.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Zone */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Coverage</span>
                <Info className="w-3 h-3 text-slate-300" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-900">{MOCK_KPIS.coverage}%</span>
                <span className="text-xs text-emerald-600 font-medium mb-1">+2.4%</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Equity Score</span>
                <Info className="w-3 h-3 text-slate-300" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-900">{MOCK_KPIS.equityScore}/100</span>
                <span className="text-xs text-slate-400 font-medium mb-1">Target: 85</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Assigned</span>
                <Users className="w-4 h-4 text-slate-300" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{MOCK_KPIS.assignedEmployees}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Compliance</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-700">Rule 10% Met</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Schedule Preview</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" /> Morning
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">
                  <div className="w-2 h-2 rounded-full bg-orange-500" /> Afternoon
                </div>
              </div>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Employee</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <th key={day} className="p-4 text-[10px] font-bold text-slate-400 uppercase text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                            E{i}
                          </div>
                          <span className="text-sm font-medium text-slate-700">Employee {i}</span>
                        </div>
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7].map(d => (
                        <td key={d} className="p-2">
                          <div className={cn(
                            "h-8 rounded-md flex items-center justify-center text-[10px] font-bold",
                            Math.random() > 0.3 
                              ? (Math.random() > 0.5 ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-orange-50 text-orange-700 border border-orange-100")
                              : "bg-slate-50 text-slate-300 border border-dashed border-slate-200"
                          )}>
                            {Math.random() > 0.3 ? (Math.random() > 0.5 ? '08-16' : '14-22') : 'OFF'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Logs & Status Zone */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-6">Generation Progress</h3>
            <div className="space-y-6">
              {steps.map((s, idx) => (
                <div key={s.label} className="flex gap-4 relative">
                  {idx !== steps.length - 1 && (
                    <div className={cn(
                      "absolute left-[11px] top-6 w-[2px] h-6",
                      s.status === 'completed' ? "bg-emerald-500" : "bg-slate-100"
                    )} />
                  )}
                  <div className={cn(
                    "w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10",
                    s.status === 'completed' ? "bg-emerald-500 text-white" : 
                    s.status === 'active' ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-100 text-slate-400"
                  )}>
                    {s.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      s.status === 'pending' ? "text-slate-400" : "text-slate-900"
                    )}>{s.label}</p>
                    <p className="text-[10px] text-slate-400">
                      {s.status === 'completed' ? 'Finished at 14:22' : s.status === 'active' ? 'In progress...' : 'Waiting...'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider">System Alerts</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs font-medium text-white/90">3 slots uncovered in Night Shift</p>
                <p className="text-[10px] text-white/40 mt-1">Requires manual override or extra staff.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs font-medium text-white/90">Skill gap detected: Radiology</p>
                <p className="text-[10px] text-white/40 mt-1">Only 1 senior technician available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
