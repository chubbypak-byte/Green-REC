import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Factory, 
  Award, 
  BarChart3, 
  UserCircle,
  LogOut,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '../context/AppContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'ภาพรวม', path: '/', en: 'Overview' },
  { icon: Factory, label: 'ผู้ผลิต', path: '/producers', en: 'Producers' },
  { icon: Award, label: 'ใบรับรอง', path: '/certificates', en: 'Certificates' },
  { icon: BarChart3, label: 'รายงาน', path: '/reports', en: 'Reports' },
  { icon: PhoneCall, label: 'ติดต่อเรา', path: '/contact', en: 'Contact' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { globalData } = useAppContext();

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-[#A1D7B8] to-slate-50 border-r border-emerald-200/50 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-pea-green rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            G
          </div>
          <div className="text-pea-green">
            <h1 className="font-display font-bold text-lg leading-tight text-slate-900">GREEN REC</h1>
            <p className="text-[10px] font-bold tracking-widest uppercase">PEA Green Collect</p>
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
                  ? "bg-pea-green text-white shadow-lg" 
                  : "text-slate-600 hover:bg-white/40 hover:text-pea-green"
              )}
            >
              <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
              <div className="flex flex-col">
                <span className="font-medium text-sm leading-none mb-1">{item.label}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-70 font-bold">{item.en}</span>
              </div>
              {/* Active Indicator */}
              <div className="ml-auto opacity-0 group-[.active]:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-emerald-200/50 bg-white/20">
        <NavLink 
          to="/profile"
          className={({ isActive }) => cn(
            "flex items-center gap-4 mb-4 p-2 rounded-xl transition-all",
            isActive ? "bg-white/40" : "hover:bg-white/30"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-pea-green/10 border border-pea-green/20 flex items-center justify-center overflow-hidden">
             <UserCircle className="w-6 h-6 text-pea-green" />
          </div>
          <div className="flex flex-col text-slate-700">
            <span className="text-sm font-semibold truncate max-w-[120px] text-slate-900">{globalData.user.name}</span>
            <span className="text-[10px] font-bold tracking-tighter uppercase text-pea-green">My Account</span>
          </div>
        </NavLink>
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-500 hover:text-pea-green transition-colors"
        >
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
};
