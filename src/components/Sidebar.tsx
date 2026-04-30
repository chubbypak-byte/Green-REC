import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Factory, 
  Award, 
  ShoppingCart, 
  BarChart3, 
  UserCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GLOBAL_DATA } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'ภาพรวม', path: '/', en: 'Overview' },
  { icon: Factory, label: 'ผู้ผลิต', path: '/producers', en: 'Producers' },
  { icon: Award, label: 'ใบรับรอง', path: '/certificates', en: 'Certificates' },
  { icon: ShoppingCart, label: 'ตลาด', path: '/market', en: 'Market' },
  { icon: BarChart3, label: 'รายงาน', path: '/reports', en: 'Reports' },
];

export const Sidebar = () => {
  return (
    <aside className="w-72 h-screen sidebar-gradient text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pea-green font-bold text-xl">
            G
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">GREEN REC</h1>
            <p className="text-[10px] text-emerald-300 font-medium tracking-widest uppercase">PEA Green Collect</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-white text-pea-green shadow-lg" 
                  : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
              <div className="flex flex-col">
                <span className="font-medium text-sm leading-none mb-1">{item.label}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">{item.en}</span>
              </div>
              {/* Active Indicator */}
              <div className="ml-auto opacity-0 group-[.active]:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/10 bg-black/10">
        <NavLink 
          to="/"
          className={({ isActive }) => cn(
            "flex items-center gap-4 mb-4 p-2 rounded-xl transition-all",
            isActive ? "bg-white/10" : "hover:bg-white/5"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center overflow-hidden">
             <UserCircle className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold truncate max-w-[120px]">{GLOBAL_DATA.user.name}</span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-tighter uppercase">My Account</span>
          </div>
        </NavLink>
        <button 
          onClick={() => window.location.href = '/login'}
          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-emerald-200 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
};
