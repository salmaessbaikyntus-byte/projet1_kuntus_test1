import React, { useState } from 'react';
import { 
  Palmtree, 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Info,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../shared/utils';

export function EmployeeLeaves() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Leaves</h1>
          <p className="text-slate-500">Manage your leave requests, balances, and history.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Paid Leave</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">12.5j</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">Remaining</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sick Leave</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">2j</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">Taken this year</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: '20%' }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Special Leave</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">0j</span>
            <span className="text-xs text-slate-400 font-bold mb-1.5">Available</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-200 h-full rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Request History</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">All</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">Pending</button>
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Type</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Dates</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Duration</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { type: 'Annual', start: '2026-03-22', end: '2026-03-25', days: 4, status: 'Approved' },
                    { type: 'Sick', start: '2026-02-10', end: '2026-02-10', days: 1, status: 'Approved' },
                    { type: 'Annual', start: '2026-04-15', end: '2026-04-20', days: 6, status: 'Pending' },
                  ].map((l, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Palmtree className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm font-medium text-slate-700">{l.type} Leave</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-600">{l.start} → {l.end}</td>
                      <td className="p-4 text-xs font-bold text-slate-900">{l.days} days</td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                          l.status === 'Approved' ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                        )}>
                          {l.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {l.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-xs font-bold text-slate-400 hover:text-slate-600">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-400" />
              Leave Policy
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-white/90">Notice Period</p>
                <p className="text-[10px] text-white/40 mt-1">Requests must be submitted at least 15 days in advance.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-white/90">Validation Flow</p>
                <p className="text-[10px] text-white/40 mt-1">Manager approval required. HR validation for {'>'} 10 days.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Important Dates
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Public Holiday</span>
                <span className="font-bold">May 1st</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Team Blackout</span>
                <span className="font-bold">Jun 15 - 20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" onClick={() => setShowForm(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">New Leave Request</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Leave Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Special Leave</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Justification</label>
                  <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-xs text-slate-400 hover:bg-slate-50 transition-all">
                    Upload Document
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comment</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 h-24 resize-none" placeholder="Optional..."></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-all">Cancel</button>
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Submit Request</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
