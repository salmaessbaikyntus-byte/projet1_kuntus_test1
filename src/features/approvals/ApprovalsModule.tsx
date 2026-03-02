import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Filter,
  Search,
  History,
  Info
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_APPROVALS } from '../../shared/mockData';

export function ApprovalsModule() {
  const [filter, setFilter] = useState('All');

  const filteredApprovals = MOCK_APPROVALS.filter(app => filter === 'All' || app.type === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Decision Cockpit</h1>
          <p className="text-slate-500">Review and approve pending requests from your team.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-700">{MOCK_APPROVALS.length} Pending Decisions</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['All', 'Leave', 'Shift Swap', 'Planning'].map(f => (
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
            placeholder="Search requests..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {filteredApprovals.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-200 transition-all group">
              <div className="p-6 flex items-start gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  req.type === 'Leave' ? "bg-blue-50 text-blue-600" :
                  req.type === 'Shift Swap' ? "bg-orange-50 text-orange-600" : "bg-indigo-50 text-indigo-600"
                )}>
                  {req.type === 'Leave' ? <Clock className="w-6 h-6" /> : 
                   req.type === 'Shift Swap' ? <ArrowRight className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900">{req.details}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      req.priority === 'High' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {req.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">Requested by <span className="font-semibold text-slate-700">{req.requester}</span> • {req.date}</p>
                  
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button className="px-4 py-2 text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center gap-2">
                      <Info className="w-4 h-4" /> View Impact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              Recent Decisions
            </h3>
            <div className="space-y-4">
              {[
                { user: 'Alice Durand', action: 'Approved Leave', time: '10 min ago' },
                { user: 'Bob Lefebvre', action: 'Rejected Swap', time: '1h ago' },
                { user: 'Charlie Moreau', action: 'Approved Planning', time: '3h ago' },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="text-xs font-bold">{d.user}</p>
                    <p className="text-[10px] text-white/40">{d.action}</p>
                  </div>
                  <span className="text-[10px] text-white/40">{d.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Decision Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-700">Responsiveness</p>
                <p className="text-2xl font-bold text-emerald-900">92%</p>
                <p className="text-[10px] text-emerald-600 mt-1">Average decision time: 45 min</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-xs font-bold text-indigo-700">Swap Autonomy</p>
                <p className="text-2xl font-bold text-indigo-900">65%</p>
                <p className="text-[10px] text-indigo-600 mt-1">Self-resolved by team members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
