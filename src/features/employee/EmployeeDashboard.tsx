import React from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Bell, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Palmtree,
  Info,
  Users
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_EMPLOYEES, MOCK_ALERTS } from '../../shared/mockData';

export function EmployeeDashboard() {
  const employee = MOCK_EMPLOYEES[0]; // Alice Durand for demo

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, {employee.firstName}</h1>
          <p className="text-slate-500">Here's your schedule and status for today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">March 1st, 2026</p>
          <p className="text-xs text-slate-500">17:25 PM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mon Shift Aujourd'hui */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">My Shift Today</h3>
            <Clock className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-2xl font-bold mb-1">09:00 → 16:00</p>
          <p className="text-indigo-100 text-xs mb-4">Shift A • Emergency Ward</p>
          <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">In Progress</span>
        </div>

        {/* Solde Congé */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Leave Balance</h3>
            <Palmtree className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">{employee.leaveBalance}j</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">Remaining</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-4">Next: Mar 22 → Mar 25</p>
        </div>

        {/* Score Équité */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Equity Score</h3>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - employee.equityScore / 100)} className="text-indigo-600" />
              </svg>
              <span className="absolute text-[10px] font-bold">{employee.equityScore}%</span>
            </div>
            <div>
              <span className="text-xs text-emerald-600 font-bold">+5% this month</span>
              <button className="block text-[10px] text-indigo-600 hover:underline font-bold mt-0.5 flex items-center gap-1">
                Why this score? <Info className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Alertes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Notifications</h3>
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <p className="text-[10px] font-bold text-slate-700">Shift Modified (Wed)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-bold text-slate-700">Leave Approved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Planning Semaine */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Weekly Schedule</h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                Full Calendar <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className={cn(
                    "flex-1 min-w-[100px] p-4 rounded-xl border transition-all",
                    i === 0 ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100" : "bg-slate-50 border-slate-100"
                  )}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{day}</p>
                    <p className="text-sm font-bold text-slate-900">{i === 0 ? '09:00 - 16:00' : i === 5 || i === 6 ? 'OFF' : '08:00 - 16:00'}</p>
                    <div className={cn(
                      "mt-3 h-1.5 w-8 rounded-full",
                      i === 5 || i === 6 ? "bg-slate-200" : "bg-indigo-500"
                    )} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mes Congés Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">My Leave Requests</h3>
                <button className="text-xs font-bold text-indigo-600 hover:underline">New Request</button>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { type: 'Annual', date: 'Mar 22 - 25', status: 'Approved' },
                  { type: 'Sick', date: 'Feb 10', status: 'Approved' },
                  { type: 'Annual', date: 'Apr 15 - 20', status: 'Pending' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{l.type} Leave</p>
                      <p className="text-[10px] text-slate-500">{l.date}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      l.status === 'Approved' ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                    )}>
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mon Score Équité Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Equity Breakdown</h3>
                <span className="text-xs font-bold text-indigo-600">3rd / 24</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Saturday Rotation', value: 95 },
                  { label: 'Break Compliance', value: 88 },
                  { label: 'Shift Variety', value: 72 },
                ].map(stat => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase tracking-widest">{stat.label}</span>
                      <span className="text-slate-900">{stat.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center group">
                <Palmtree className="w-6 h-6 mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Request Leave</p>
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-center group">
                <ArrowRight className="w-6 h-6 mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Swap Shift</p>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Team Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Team Coverage</span>
                </div>
                <span className="text-xs font-bold text-emerald-900">94%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Who's working now</p>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
