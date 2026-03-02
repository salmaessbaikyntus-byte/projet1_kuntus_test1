import React, { useState } from 'react';
import { 
  Settings2, 
  Save, 
  History, 
  Play, 
  Info, 
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '../../shared/utils';

export function BusinessRulesModule() {
  const [rules, setRules] = useState({
    maxBreakPercent: 10,
    minCoveragePercent: 90,
    equityWeight: 0.7,
    weekendRotation: true,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Business Rules Configuration</h1>
          <p className="text-slate-500">Define the core logic and constraints for your workforce planning.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 flex items-center gap-2">
            <History className="w-4 h-4" /> Version History
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Active Constraints
              </h3>
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-widest">v2.4.0 Active</span>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700">Max Break %</label>
                    <span className="text-sm font-bold text-indigo-600">{rules.maxBreakPercent}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="25" 
                    value={rules.maxBreakPercent}
                    onChange={(e) => setRules({...rules, maxBreakPercent: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400">Maximum percentage of staff allowed on break simultaneously.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700">Min Coverage Threshold</label>
                    <span className="text-sm font-bold text-indigo-600">{rules.minCoveragePercent}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="70" 
                    max="100" 
                    value={rules.minCoveragePercent}
                    onChange={(e) => setRules({...rules, minCoveragePercent: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400">Alert threshold for understaffing in any given shift.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700">Equity Weighting</label>
                    <span className="text-sm font-bold text-indigo-600">{rules.equityWeight}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={rules.equityWeight}
                    onChange={(e) => setRules({...rules, equityWeight: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400">Importance of equity vs efficiency in AI generation (0-1).</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="text-sm font-bold text-slate-700">Weekend Rotation</label>
                    <p className="text-[10px] text-slate-400">Enforce fair distribution of weekend shifts.</p>
                  </div>
                  <button 
                    onClick={() => setRules({...rules, weekendRotation: !rules.weekendRotation})}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      rules.weekendRotation ? "bg-indigo-600" : "bg-slate-200"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      rules.weekendRotation ? "left-6" : "left-1"
                    )} />
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2">
                  <Play className="w-4 h-4" /> Test Rules in Simulation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-300" />
              Rule Impact Analysis
            </h3>
            <p className="text-indigo-100 text-xs mb-6">Current rules favor <span className="font-bold">Equity</span> over <span className="font-bold">Cost</span>.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-200">Est. Generation Time</span>
                <span className="font-bold">~45s</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-200">Constraint Strictness</span>
                <span className="font-bold">Medium-High</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Recent Changes
            </h3>
            <div className="space-y-4">
              {[
                { user: 'Admin', change: 'Updated Coverage Threshold', time: '2d ago' },
                { user: 'Admin', change: 'Enabled Weekend Rotation', time: '1w ago' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{c.change}</p>
                    <p className="text-[10px] text-slate-500">By {c.user} • {c.time}</p>
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
