import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Info,
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn } from '../../shared/utils';

export function EmployeePlanning() {
  const [currentMonth, setCurrentMonth] = useState('April 2026');

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getShiftType = (day: number) => {
    if (day % 7 === 5 || day % 7 === 6) return 'OFF';
    if (day % 3 === 0) return 'A';
    if (day % 3 === 1) return 'B';
    return 'C';
  };

  const getShiftColor = (type: string) => {
    switch (type) {
      case 'A': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'B': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'C': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Planning</h1>
          <p className="text-slate-500">Consult your monthly schedule and shift details.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
          <span className="text-sm font-bold text-slate-700 px-4">{currentMonth}</span>
          <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {weekDays.map(day => (
            <div key={day} className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {days.map(day => {
            const shiftType = getShiftType(day);
            return (
              <div key={day} className="min-h-[120px] p-3 hover:bg-slate-50 transition-colors group relative">
                <span className="text-xs font-bold text-slate-400">{day}</span>
                <div className={cn(
                  "mt-2 p-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider text-center transition-all group-hover:scale-105",
                  getShiftColor(shiftType)
                )}>
                  {shiftType === 'OFF' ? 'Repos' : `Shift ${shiftType}`}
                </div>
                {shiftType !== 'OFF' && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[9px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {shiftType === 'A' ? '09:00 - 16:00' : '08:00 - 16:00'}
                    </p>
                    {day === 15 && (
                      <span className="inline-block px-1.5 py-0.5 bg-red-50 text-red-600 rounded-[4px] text-[8px] font-bold uppercase">
                        Préavis -1h
                      </span>
                    )}
                  </div>
                )}
                {day === 12 && (
                  <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                    <span className="bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Congé</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Legend</h4>
          <div className="space-y-3">
            {[
              { label: 'Shift A', color: 'bg-emerald-500' },
              { label: 'Shift B', color: 'bg-orange-500' },
              { label: 'Shift C', color: 'bg-blue-500' },
              { label: 'Repos', color: 'bg-slate-200' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", item.color)} />
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Shift Swap Center</h4>
          <div className="flex items-center gap-6">
            <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-900 mb-1">Exchangeable Shifts</p>
              <p className="text-[10px] text-slate-500">You have 3 shifts eligible for swap this month.</p>
              <button className="mt-3 text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                View Proposals <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900 mb-1">Intelligent Matching</p>
              <p className="text-[10px] text-slate-500">Our AI finds swaps that maintain your equity score.</p>
              <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Zap className="w-3 h-3" /> Propose Swap
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
          <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Quick Info</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Total Hours</span>
              <span className="text-sm font-bold">152h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Night Shifts</span>
              <span className="text-sm font-bold">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Weekends</span>
              <span className="text-sm font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
