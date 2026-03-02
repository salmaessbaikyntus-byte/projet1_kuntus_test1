import React from 'react';
import { cn } from '../../lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  trend,
  status = 'neutral',
  icon,
}) => {
  const statusColors = {
    success: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
    warning: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
    danger: 'text-rose-500 border-rose-500/20 bg-rose-500/5',
    neutral: 'text-slate-400 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50',
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between min-h-[120px]">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {trend && (
          <span className={cn(
            "text-xs font-medium",
            trend.isPositive ? "text-emerald-500" : "text-rose-500"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-1 flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", statusColors[status].split(' ')[0].replace('text-', 'bg-'))} />
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
