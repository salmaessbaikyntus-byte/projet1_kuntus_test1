import React from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_KPIS } from '../../shared/mockData';

export function DashboardModule({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Manager</h1>
          <p className="text-slate-500">Here's what's happening with your workforce today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">March 1st, 2026</p>
          <p className="text-xs text-slate-500">16:52 PM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Next Planning
          </h3>
          <p className="text-indigo-100 text-sm mb-6">Week 11 generation is ready to be processed.</p>
          <button 
            onClick={() => setActiveTab('planning')}
            className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all"
          >
            Start Generation <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Coverage</h3>
            <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">{MOCK_KPIS.coverage}%</span>
            <span className="text-xs text-emerald-600 font-bold mb-1.5">+2.4% vs last week</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${MOCK_KPIS.coverage}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Equity Score</h3>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">{MOCK_KPIS.equityScore}</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">Target: 85</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${MOCK_KPIS.equityScore}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Critical Alerts</h3>
            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold uppercase tracking-wider">3 Urgent</span>
          </div>
          <div className="p-0 divide-y divide-slate-50">
            {[
              { title: 'Night Shift Understaffed', desc: 'Radiology dept needs 2 more staff for Wed.', time: '2h ago', type: 'error' },
              { title: 'Leave Request Conflict', desc: 'Alice and Bob requested same dates.', time: '4h ago', type: 'warning' },
              { title: 'Compliance Warning', desc: 'Rule 10% risk for Emergency ward.', time: '1d ago', type: 'warning' },
            ].map((alert, i) => (
              <div key={i} className="p-4 flex gap-4 hover:bg-slate-50/50 transition-colors">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  alert.type === 'error' ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                )}>
                  {alert.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">{alert.title}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full p-4 text-xs font-bold text-indigo-600 hover:bg-slate-50 border-t border-slate-100 transition-all">
            View All Alerts
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Activity</h3>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="p-6 space-y-6">
            {[
              { user: 'Admin', action: 'published planning', target: 'Week 09', time: '10 min ago' },
              { user: 'System', action: 'generated report', target: 'Equity Q1', time: '1h ago' },
              { user: 'Manager', action: 'approved leave', target: 'Alice Durand', time: '3h ago' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 2 && <div className="absolute left-4 top-8 w-px h-6 bg-slate-100" />}
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-500">
                  {activity.user[0]}
                </div>
                <div>
                  <p className="text-xs text-slate-600">
                    <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} <span className="font-bold text-slate-900">{activity.target}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
