import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  Info, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { cn } from '../../shared/utils';
import { MOCK_EMPLOYEES } from '../../shared/mockData';

const EQUITY_COMPONENTS = [
  { name: 'Saturday Rotation', value: 35, score: 95, color: '#6366f1' },
  { name: 'Night Shift Balance', value: 25, score: 82, color: '#10b981' },
  { name: 'Break Compliance', value: 20, score: 88, color: '#f59e0b' },
  { name: 'Availability', value: 20, score: 72, color: '#ef4444' },
];

const EQUITY_HISTORY = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 80 },
  { month: 'Mar', score: 85 },
];

export function EmployeeEquity() {
  const employee = MOCK_EMPLOYEES[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Equity Analysis</h1>
          <p className="text-slate-500">Understand how your schedule is balanced compared to the team.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-bold text-slate-700">Rank: 3rd / 24</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Global Equity Score</h3>
            <div className="relative w-48 h-48 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: employee.equityScore }, { value: 100 - employee.equityScore }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#f1f5f9" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">{employee.equityScore}%</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">+5% vs Feb</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-500 max-w-[200px] mx-auto">
              Your score is calculated based on shift rotation, weekend fairness, and break compliance.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              How to improve?
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-white/90">Availability Gap</p>
                <p className="text-[10px] text-white/40 mt-1">Increasing your availability for Night shifts could boost your score by 4%.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-white/90">Saturday Rotation</p>
                <p className="text-[10px] text-white/40 mt-1">You are currently at 100% compliance for weekend fairness. Keep it up!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-8">Score Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EQUITY_COMPONENTS.map(comp => (
                <div key={comp.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full")} style={{ backgroundColor: comp.color }} />
                      <span className="text-sm font-bold text-slate-700">{comp.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{comp.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${comp.score}%`, backgroundColor: comp.color }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>Weight: {comp.value}%</span>
                    <span className={cn(
                      comp.score > 85 ? "text-emerald-600" : comp.score > 75 ? "text-orange-600" : "text-red-600"
                    )}>
                      {comp.score > 85 ? 'Excellent' : comp.score > 75 ? 'Good' : 'Needs Work'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-8">Equity History</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EQUITY_HISTORY}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
