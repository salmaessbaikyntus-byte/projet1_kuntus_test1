import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { cn } from '../../shared/utils';

const DATA_COVERAGE = [
  { name: 'Mon', coverage: 92, target: 95 },
  { name: 'Tue', coverage: 94, target: 95 },
  { name: 'Wed', coverage: 98, target: 95 },
  { name: 'Thu', coverage: 91, target: 95 },
  { name: 'Fri', coverage: 95, target: 95 },
  { name: 'Sat', coverage: 88, target: 90 },
  { name: 'Sun', coverage: 85, target: 90 },
];

const DATA_SKILLS = [
  { subject: 'Emergency', A: 120, fullMark: 150 },
  { subject: 'Surgery', A: 98, fullMark: 150 },
  { subject: 'Radiology', A: 86, fullMark: 150 },
  { subject: 'Pediatrics', A: 99, fullMark: 150 },
  { subject: 'ICU', A: 85, fullMark: 150 },
];

export function AnalyticsModule() {
  const [absenteeismSim, setAbsenteeismSim] = useState(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">RH Analytics Cockpit</h1>
        <p className="text-slate-500">Real-time workforce insights and predictive simulations.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Coverage', value: '93.4%', trend: '+2.1%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Equity Index', value: '88/100', trend: '+5.4%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Rule 10% Compliance', value: '98.2%', trend: '-0.4%', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Est. Weekly Cost', value: '€42.5k', trend: '+1.2%', icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-bold",
                kpi.trend.startsWith('+') ? "text-emerald-600" : "text-red-600"
              )}>
                {kpi.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900">Coverage vs Target</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" /> Coverage
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-slate-200 rounded-full" /> Target
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA_COVERAGE}>
                  <defs>
                    <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="coverage" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCoverage)" />
                  <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Skill Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DATA_SKILLS}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748b'}} />
                    <Radar name="Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Shift Rotation Density</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_COVERAGE}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip />
                    <Bar dataKey="coverage" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* What-if Simulation */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -mr-16 -mt-16" />
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              What-if Simulation
            </h3>
            <p className="text-slate-400 text-sm mb-8">Predict impact of workforce changes before they happen.</p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Absenteeism Rate</label>
                  <span className="text-sm font-bold text-indigo-400">{absenteeismSim}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={absenteeismSim}
                  onChange={(e) => setAbsenteeismSim(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-300">Remove key skills (Radiology)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-300">Simulate public holiday</span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
                Run Simulation
              </button>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Delta Coverage</span>
                  <span className="text-sm font-bold text-red-400">-{absenteeismSim * 1.2}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Operational Risk</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                    absenteeismSim > 15 ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
                  )}>
                    {absenteeismSim > 15 ? 'Critical' : 'Moderate'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Insights</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Equity is up 5%</span> this month due to better rotation in Night shifts.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Overtime risk</span> detected for 3 employees in Emergency ward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
