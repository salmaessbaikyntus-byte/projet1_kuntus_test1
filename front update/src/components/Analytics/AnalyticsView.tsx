import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Scale, 
  ShieldCheck, 
  Euro, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Zap,
  Info
} from 'lucide-react';
import { KPICard } from '../Shared/KPICard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar,
  Cell
} from 'recharts';
import { cn, formatCurrency, formatPercent } from '../../lib/utils';
import { motion } from 'motion/react';

const HEATMAP_DATA = Array.from({ length: 7 }, (_, day) => 
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    value: Math.floor(Math.random() * 100)
  }))
).flat();

const ROTATION_DATA = [
  { name: 'Matin (06h-14h)', value: 45, color: '#10b981' },
  { name: 'Après-midi (14h-22h)', value: 38, color: '#3b82f6' },
  { name: 'Nuit (22h-06h)', value: 17, color: '#6366f1' },
];

const SKILLS_DATA = [
  { subject: 'Managers', A: 120, fullMark: 150 },
  { subject: 'Experts', A: 98, fullMark: 150 },
  { subject: 'Secouristes', A: 86, fullMark: 150 },
  { subject: 'Nouveaux', A: 99, fullMark: 150 },
  { subject: 'Séniors', A: 85, fullMark: 150 },
];

export const AnalyticsView: React.FC = () => {
  const [absenceSimulation, setAbsenceSimulation] = useState(0);

  const metrics = useMemo(() => {
    const baseCoverage = 98.4;
    const baseCost = 142500;
    const simulatedCoverage = Math.max(0, baseCoverage - (absenceSimulation * 1.2));
    const simulatedCost = baseCost - (absenceSimulation * 800);

    return {
      coverage: simulatedCoverage,
      cost: simulatedCost,
      equity: 84,
      compliance: simulatedCoverage > 90
    };
  }, [absenceSimulation]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Couverture Plateau" 
          value={formatPercent(metrics.coverage)}
          subtitle="Seuil critique: 90%"
          status={metrics.coverage > 98 ? 'success' : metrics.coverage > 90 ? 'warning' : 'danger'}
          icon={<Activity className="w-4 h-4" />}
          trend={{ value: 0.4, isPositive: true }}
        />
        <KPICard 
          title="Indice d'Équité" 
          value={`${metrics.equity}/100`}
          subtitle="Basé sur rotation shifts"
          status="success"
          icon={<Scale className="w-4 h-4" />}
        />
        <KPICard 
          title="Règle des 10%" 
          value={metrics.compliance ? "Conforme" : "Violation"}
          subtitle="Vérification temps réel"
          status={metrics.compliance ? 'success' : 'danger'}
          icon={<ShieldCheck className="w-4 h-4" />}
        />
        <KPICard 
          title="Coût RH Estimé" 
          value={formatCurrency(metrics.cost)}
          subtitle="Période en cours"
          status="neutral"
          icon={<Euro className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Analysis */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Densité de Présence</h3>
              <p className="text-[10px] text-slate-400 mt-1">Analyse horaire par jour de la semaine</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800" />
                <span className="text-[10px] text-slate-400">Faible</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
                <span className="text-[10px] text-slate-400">Forte</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-25 gap-1">
            <div className="col-span-1" /> {/* Spacer for Y axis labels */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="text-[8px] font-bold text-slate-400 text-center">{i}h</div>
            ))}
            
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, dIdx) => (
              <React.Fragment key={day}>
                <div className="text-[8px] font-bold text-slate-400 flex items-center">{day}</div>
                {Array.from({ length: 24 }).map((_, hIdx) => {
                  const val = Math.random() * 100;
                  return (
                    <div 
                      key={hIdx} 
                      className={cn(
                        "aspect-square rounded-[2px] transition-all hover:scale-125 hover:z-10 cursor-help",
                        val > 80 ? "bg-slate-900 dark:bg-white" :
                        val > 60 ? "bg-slate-700 dark:bg-slate-300" :
                        val > 40 ? "bg-slate-400 dark:bg-slate-500" :
                        val > 20 ? "bg-slate-200 dark:bg-slate-700" :
                        "bg-slate-50 dark:bg-slate-800"
                      )}
                      title={`${day} ${hIdx}h: ${Math.round(val)}%`}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Competency Radar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Radar Compétences</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS_DATA}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Radar
                  name="Effectif"
                  dataKey="A"
                  stroke="#0f172a"
                  fill="#0f172a"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Alerte Compétence</span>
              <span className="text-[10px] font-bold text-amber-500">Secouristes (-12%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-2/3" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rotation Histogram */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Répartition Rotation</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ROTATION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded shadow-lg">
                          <p className="text-[10px] font-bold text-slate-900 dark:text-white">{payload[0].name}</p>
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {ROTATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {ROTATION_DATA.map(item => (
              <div key={item.name} className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-400 uppercase truncate">{item.name.split(' ')[0]}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* What-If Simulation */}
        <div className="lg:col-span-2 bg-slate-900 dark:bg-white rounded-xl p-6 shadow-xl text-white dark:text-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-white/10 dark:bg-slate-900/10 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest">Module What-If</h3>
                <p className="text-[10px] opacity-60">Simulation d'impact opérationnel</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold uppercase tracking-tight">Taux d'absence simulé</label>
                    <span className="text-lg font-bold">{absenceSimulation}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    value={absenceSimulation}
                    onChange={(e) => setAbsenceSimulation(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/20 dark:bg-slate-900/20 rounded-lg appearance-none cursor-pointer accent-white dark:accent-slate-900"
                  />
                  <div className="flex justify-between mt-2 text-[8px] font-bold uppercase opacity-40">
                    <span>Nominal</span>
                    <span>Critique (30%)</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 dark:bg-slate-900/5 rounded-xl border border-white/10 dark:border-slate-900/10">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={cn("w-4 h-4 mt-0.5", absenceSimulation > 15 ? "text-rose-400" : "text-amber-400")} />
                    <div>
                      <p className="text-xs font-bold">Analyse des risques</p>
                      <p className="text-[10px] opacity-70 mt-1 leading-relaxed">
                        {absenceSimulation === 0 ? "Aucun risque détecté. Le planning est robuste." :
                         absenceSimulation < 10 ? "Impact mineur sur la couverture. Pas de violation de règle RH." :
                         absenceSimulation < 20 ? "Risque de sous-couverture sur les créneaux 14h-16h. Heures supp. à prévoir." :
                         "ALERTE CRITIQUE: Rupture de service probable. Violation de la règle des 10% sur 4 créneaux."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 dark:bg-slate-900/10 border border-white/10 dark:border-slate-900/10 flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase opacity-60">Couverture</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{formatPercent(metrics.coverage)}</span>
                    <div className="mt-2 w-full bg-white/10 dark:bg-slate-900/10 h-1 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-500", metrics.coverage > 90 ? "bg-emerald-400" : "bg-rose-400")} style={{ width: `${metrics.coverage}%` }} />
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 dark:bg-slate-900/10 border border-white/10 dark:border-slate-900/10 flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase opacity-60">Violations RH</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{absenceSimulation > 15 ? "4" : "0"}</span>
                    <p className="text-[8px] font-bold uppercase opacity-40 mt-1">Règles métier</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 dark:bg-slate-900/10 border border-white/10 dark:border-slate-900/10 flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase opacity-60">Coût d'Urgence</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">+{formatCurrency(absenceSimulation * 1200)}</span>
                    <p className="text-[8px] font-bold uppercase opacity-40 mt-1">Est. Intérim</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 dark:bg-slate-900/10 border border-white/10 dark:border-slate-900/10 flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase opacity-60">Risque Burnout</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{absenceSimulation > 20 ? "Élevé" : "Faible"}</span>
                    <p className="text-[8px] font-bold uppercase opacity-40 mt-1">Indice de charge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
