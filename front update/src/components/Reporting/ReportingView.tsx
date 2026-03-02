import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  Archive, 
  Clock, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  FileSearch,
  RefreshCw
} from 'lucide-react';
import { ReportCategory, ReportType, ReportStatus, ReportHistoryItem } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_HISTORY: ReportHistoryItem[] = [
  { id: 'REP-001', name: 'Planning Hebdomadaire S10', category: ReportCategory.PLANNING, period: '03/03 - 09/03', author: 'Système', status: ReportStatus.VALID, timestamp: 'Il y a 2h' },
  { id: 'REP-002', name: 'Audit Règle 10% - Février', category: ReportCategory.PERFORMANCE, period: '01/02 - 28/02', author: 'RH Admin', status: ReportStatus.OBSOLETE, timestamp: 'Hier' },
  { id: 'REP-003', name: 'Impact Absences Maladie Q1', category: ReportCategory.STAFF, period: '01/01 - 31/03', author: 'Directeur Op.', status: ReportStatus.VALID, timestamp: 'Il y a 3j' },
  { id: 'REP-004', name: 'Couverture Plateau - Étage 4', category: ReportCategory.PLANNING, period: '02/03', author: 'Système', status: ReportStatus.VALID, timestamp: 'Il y a 4j' },
];

export const ReportingView: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<ReportCategory>(ReportCategory.PLANNING);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    const interval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => setIsGenerating(false), 1000);
          return 3;
        }
        return prev + 1;
      });
    }, 800);
  };

  const steps = [
    "Collecte des données",
    "Calcul des indicateurs",
    "Mise en forme",
    "Finalisation document"
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Configuration Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {Object.values(ReportCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveDomain(cat)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                  activeDomain === cat 
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <select className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer text-slate-700 dark:text-slate-300">
              {Object.values(ReportType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Semaine courante</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Département: Support</span>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            Générer le rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation & Status */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-full max-w-md">
                  <h3 className="text-lg font-bold text-center mb-8 text-slate-900 dark:text-white">Génération en cours...</h3>
                  <div className="space-y-6">
                    {steps.map((step, idx) => (
                      <div key={step} className="flex items-center gap-4">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors",
                          generationStep > idx ? "bg-emerald-500 border-emerald-500 text-white" : 
                          generationStep === idx ? "border-slate-900 dark:border-white animate-pulse" : 
                          "border-slate-200 dark:border-slate-800 text-slate-300"
                        )}>
                          {generationStep > idx ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          generationStep >= idx ? "text-slate-900 dark:text-white" : "text-slate-400"
                        )}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Historique des rapports</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">ID</th>
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">Rapport</th>
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">Période</th>
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">Auteur</th>
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400">Statut</th>
                        <th className="pb-3 text-[10px] font-bold uppercase tracking-tighter text-slate-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {MOCK_HISTORY.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</span>
                              <span className="text-[10px] text-slate-400">{item.category}</span>
                            </div>
                          </td>
                          <td className="py-4 text-xs font-medium text-slate-600 dark:text-slate-400">{item.period}</td>
                          <td className="py-4 text-xs text-slate-500">{item.author}</td>
                          <td className="py-4">
                            <div className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                              item.status === ReportStatus.VALID ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                            )}>
                              {item.status === ReportStatus.OBSOLETE && <AlertCircle className="w-3 h-3" />}
                              {item.status}
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                                <Mail className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Aperçu rapide</h3>
            <FileSearch className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="aspect-[3/4] bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-20 bg-white dark:bg-slate-700 rounded shadow-lg mb-4 flex flex-col p-2 gap-1 overflow-hidden">
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded" />
              <div className="h-1 w-2/3 bg-slate-100 dark:bg-slate-600 rounded" />
              <div className="mt-2 grid grid-cols-2 gap-1">
                <div className="h-4 bg-slate-50 dark:bg-slate-800 rounded" />
                <div className="h-4 bg-slate-50 dark:bg-slate-800 rounded" />
              </div>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Sélectionnez un rapport</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">Visualisez les données critiques avant diffusion officielle.</p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">Dernière mise à jour</span>
              <span className="text-[10px] font-bold text-slate-900 dark:text-white">Aujourd'hui, 14:32</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">Intégrité des données</span>
              <span className="text-[10px] font-bold text-emerald-500">100% Vérifié</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
