import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  MoreVertical,
  FileSpreadsheet,
  FileJson,
  Plus
} from 'lucide-react';
import { cn } from '../../shared/utils';

const REPORTS = [
  { id: 'R-2026-001', name: 'Monthly Planning Audit', category: 'Planning', period: 'Feb 2026', author: 'S. Martin', status: 'Valid' },
  { id: 'R-2026-002', name: 'Workforce Equity Report', category: 'Performance', period: 'Q1 2026', author: 'J. Doe', status: 'Valid' },
  { id: 'R-2026-003', name: 'Leave Balance Summary', category: 'Leaves', period: 'Jan 2026', author: 'A. Smith', status: 'Obsolete' },
  { id: 'R-2026-004', name: 'Skill Gap Analysis', category: 'Effectifs', period: 'Custom', author: 'S. Martin', status: 'Archived' },
];

export function ReportingModule() {
  const [activeTab, setActiveTab] = useState('Planning');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reporting Center</h1>
          <p className="text-slate-500">Official HR documentation, audit trails, and data exports.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          New Report
        </button>
      </div>

      {/* Configuration Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['Planning', 'Leaves', 'Performance', 'Workforce'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-slate-200 hidden md:block" />

        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter reports..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Generation Zone */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Generate Report</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="aspect-[3/4] bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
                <FileText className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-sm font-medium text-slate-500">Select parameters to preview report</p>
              </div>

              <div className="space-y-4">
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all">
                  Generate PDF
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                    <FileSpreadsheet className="w-3 h-3" /> Excel
                  </button>
                  <button className="py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                    <FileJson className="w-3 h-3" /> JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Report ID</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Label</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Period</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REPORTS.map(report => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-xs font-mono text-slate-500">{report.id}</td>
                    <td className="p-4">
                      <p className="text-sm font-semibold text-slate-900">{report.name}</p>
                      <p className="text-[10px] text-slate-400">By {report.author} • {report.category}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{report.period}</td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                        report.status === 'Valid' ? "bg-emerald-50 text-emerald-700" :
                        report.status === 'Obsolete' ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {report.status === 'Valid' ? <CheckCircle2 className="w-3 h-3" /> : 
                         report.status === 'Obsolete' ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-xs text-slate-500">Showing 4 of 128 reports</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium bg-white disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium bg-white">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
