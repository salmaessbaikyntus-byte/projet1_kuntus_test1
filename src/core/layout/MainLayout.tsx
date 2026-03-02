import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarRange, 
  BarChart3, 
  FileText, 
  Users, 
  Palmtree, 
  Menu, 
  X, 
  Bell, 
  Search, 
  ChevronRight, 
  LogOut, 
  User as UserIcon, 
  Moon, 
  Sun,
  CheckCircle2,
  History,
  Settings2
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { cn } from '../../shared/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MainLayout({ children, activeTab, setActiveTab }: LayoutProps) {
  const { user, logout, login } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, roles: ['MANAGER', 'ADMIN'] },
    { id: 'approvals', name: 'Approvals', icon: CheckCircle2, roles: ['MANAGER', 'ADMIN'] },
    { id: 'planning', name: 'Planning', icon: CalendarRange, roles: ['MANAGER', 'ADMIN'] },
    { id: 'team', name: 'Team Overview', icon: Users, roles: ['MANAGER', 'ADMIN'] },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, roles: ['MANAGER', 'ADMIN'] },
    { id: 'reporting', name: 'Reporting', icon: FileText, roles: ['MANAGER', 'ADMIN', 'AUDITOR'] },
    { id: 'alerts', name: 'Alerts & Risks', icon: Bell, roles: ['MANAGER', 'ADMIN'] },
    { id: 'audit', name: 'Audit Log', icon: History, roles: ['ADMIN', 'AUDITOR'] },
    { id: 'settings', name: 'Business Rules', icon: Settings2, roles: ['ADMIN'] },
    { id: 'employee-dashboard', name: 'My Portal', icon: UserIcon, roles: ['EMPLOYEE'] },
    { id: 'employee-planning', name: 'My Planning', icon: CalendarRange, roles: ['EMPLOYEE'] },
    { id: 'employee-leaves', name: 'My Leaves', icon: Palmtree, roles: ['EMPLOYEE'] },
  ];

  const filteredNavigation = navigation.filter(item => item.roles.includes(user?.role || ''));

  return (
    <div className={cn("min-h-screen flex bg-[#F8FAFC]", isDarkMode && "dark bg-slate-950 text-slate-100")}>
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900">ShiftMaster</span>}
        </div>

        <div className="p-4 border-b border-slate-100">
          <select 
            value={user?.role} 
            onChange={(e) => login(e.target.value as any)}
            className={cn(
              "w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500",
              !isSidebarOpen && "hidden"
            )}
          >
            <option value="MANAGER">Manager View</option>
            <option value="EMPLOYEE">Employee View</option>
            <option value="ADMIN">Admin View</option>
            <option value="AUDITOR">Auditor View</option>
          </select>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                activeTab === item.id 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isSidebarOpen && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-sm mt-1"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center text-sm text-slate-500">
              <span>ShiftMaster</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-slate-900 font-medium capitalize">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:text-slate-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
