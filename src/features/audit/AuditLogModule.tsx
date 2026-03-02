import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  User, 
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../shared/utils';
import { MOCK_AUDIT } from '../../shared/mockData';

export function AuditLogModule() {
  const [search, setSearch] = useState('');

  const filteredLogs = MOCK_AUDIT.filter(log => 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.user.toLowerCase().includes(search.toLowerCase()) ||
    log.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Log & Traceability</h1>
          <p className="text-slate-500">Full history of system actions for compliance and audit purposes.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <FileText className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs by user, action, or target..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Timestamp</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">User</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Action</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Target</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Security</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-xs font-mono text-slate-500">{log.timestamp}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {log.user[0]}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{log.user}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-semibold text-slate-900">{log.action}</span>
                </td>
                <td className="p-4 text-sm text-slate-600">{log.target}</td>
                <td className="p-4 text-right">
                  {log.isSensitive ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-700 rounded text-[10px] font-bold uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" /> Sensitive
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> Standard
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filteredLogs.length} of 1,240 events</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium bg-white disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
