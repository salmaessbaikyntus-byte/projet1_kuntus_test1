import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Package,
  ChevronRight,
  User
} from 'lucide-react';
import { ReportingView } from './components/Reporting/ReportingView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { cn } from './lib/utils';

type Module = 'reporting' | 'analytics';

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('analytics');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 flex flex-col",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-white dark:text-slate-900" />
          </div>
          {isSidebarOpen && <span className="font-black tracking-tighter text-xl uppercase italic">ShiftMaster</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveModule('analytics')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
              activeModule === 'analytics' 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-bold">Analytics</span>}
          </button>
          
          <button
            onClick={() => setActiveModule('reporting')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
              activeModule === 'reporting' 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <BarChart3 className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-bold">Reporting</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isSidebarOpen && <span className="text-sm font-bold">{isDarkMode ? 'Mode Clair' : 'Mode Sombre'}</span>}
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-bold">Paramètres</span>}
          </button>
          <div className="pt-2">
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800",
              !isSidebarOpen && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">Salma E.</span>
                  <span className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-tighter">RH Manager</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen flex flex-col",
        isSidebarOpen ? "pl-64" : "pl-20"
      )}>
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
            >
              <ChevronRight className={cn("w-4 h-4 transition-transform", isSidebarOpen && "rotate-180")} />
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              {activeModule === 'analytics' ? 'Tour de Contrôle' : 'Centre Documentaire'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher un employé, KPI, rapport..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-medium w-64 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                <Package className="w-4 h-4" />
                Export ZIP
              </button>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                {activeModule === 'analytics' ? 'Analytics & Performance' : 'Reporting & Audit RH'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                {activeModule === 'analytics' 
                  ? "Surveillez la santé opérationnelle de vos plateaux en temps réel." 
                  : "Générez et archivez vos documents réglementaires officiels."}
              </p>
            </header>

            {activeModule === 'analytics' ? <AnalyticsView /> : <ReportingView />}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>ShiftMaster v4.2.0</span>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Serveur: EU-WEST-1</span>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-emerald-500 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Système Opérationnel
            </span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Confidentialité</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
