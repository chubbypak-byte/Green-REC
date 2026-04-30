import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-10 space-y-8">
           <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pea-green/10 text-pea-green mb-4">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-display font-bold text-slate-900">PEA Green Collect</h1>
              <p className="text-slate-500 text-sm">เข้าสู่ระบบเพื่อจัดการพลังงานสะอาดของคุณ</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">อีเมล (Email)</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                       required
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20"
                       placeholder="your@email.com"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">รหัสผ่าน (Password)</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                       required
                       type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20"
                       placeholder="••••••••"
                    />
                 </div>
              </div>

              <button 
                 type="submit"
                 className="w-full py-4 bg-pea-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                 <LogIn className="w-4 h-4" />
                 เข้าสู่ระบบ (Sign In)
              </button>
           </form>

           <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white px-4 text-slate-300">หรือ (OR)</span></div>
           </div>

           <div className="space-y-3">
              <button 
                 onClick={() => navigate('/registration')}
                 className="w-full py-4 bg-white text-pea-green border-2 border-pea-green rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                 <UserPlus className="w-4 h-4" />
                 ลงทะเบียนผู้ใช้ใหม่
              </button>
              <p className="text-center text-[10px] text-slate-400 font-medium">
                 ยังไม่เคยลงทะเบียนผู้ใช้ไฟฟ้า? เริ่มต้นใช้งานได้ทันที
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
