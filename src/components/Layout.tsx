import React from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      <Sidebar />
      
      <main className="flex-1 ml-72">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-full w-96">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาข้อมูล, ใบรับรอง, ผู้ผลิต..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-pea-green transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Status</p>
                  <p className="text-xs font-medium text-slate-900">เชื่อมต่อ PEA Grid</p>
               </div>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Alert Bar */}
      <div className="fixed bottom-0 right-0 left-72 bg-emerald-900/90 backdrop-blur text-white py-2 px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
          <p className="text-xs font-medium">คุณมีใบรับรอง 3 รายการที่รอการตรวจสอบ (Waiting for Verify)</p>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded hover:bg-white hover:text-emerald-900 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};
