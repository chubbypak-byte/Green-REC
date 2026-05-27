import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, TreeDeciduous, Wind, CloudRain, ArrowRight, Download, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { GLOBAL_DATA } from '../constants';

const data = GLOBAL_DATA.chartData.map(d => ({
  month: d.name,
  co2: d.energy * 0.5
}));

const totalCo2 = data.reduce((sum, item) => sum + item.co2, 0);

export const Reports = () => {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Reports & Dashboard</h1>
          <p className="text-slate-500">รายงานการผลิต การออกใบรับรอง และความยั่งยืนของคุณ</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-white text-pea-green border border-pea-green px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shadow-sm disabled:opacity-50 min-w-[200px] justify-center"
        >
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-pea-green/30 border-t-pea-green rounded-full animate-spin"></div>
              กำลังเตรียมไฟล์...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export Excel Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'ผลิตได้เพิ่มเดือนนี้', value: GLOBAL_DATA.stats.productionThisMonth, unit: GLOBAL_DATA.stats.unit, icon: <Leaf className="w-5 h-5 text-emerald-500" />, sub: '+12% จากเดือนที่แล้ว' },
          { label: 'ลงทะเบียน REC', value: GLOBAL_DATA.stats.recIssued, unit: GLOBAL_DATA.stats.unit, icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, sub: 'ดำเนินการสำเร็จแล้ว' },
          { label: 'ขายได้ทั้งหมด', value: GLOBAL_DATA.stats.recSold, unit: GLOBAL_DATA.stats.unit, icon: <ArrowRight className="w-5 h-5 text-purple-500" />, sub: `รายได้ ${GLOBAL_DATA.stats.revenue} THB` },
          { label: 'ยอดคงเหลือ', value: GLOBAL_DATA.stats.recBalance, unit: GLOBAL_DATA.stats.unit, icon: <Clock className="w-5 h-5 text-amber-500" />, sub: 'รอดำเนินการขาย' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                   {stat.value}
                   <span className="text-xs font-bold text-slate-400 ml-2">{stat.unit}</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">{stat.sub}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-emerald-900 text-white p-10 rounded-[40px] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pea-emerald/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pea-emerald/5 rounded-full -ml-32 -mb-32 blur-2xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full w-fit">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">Impact Summary 2025-2026</span>
            </div>
            
            <div>
              <p className="text-emerald-100/70 font-display text-lg">คุณช่วยลดการปล่อย CO₂ ไปแล้วทั้งหมด</p>
              <h2 className="text-8xl font-display font-extrabold flex items-baseline gap-4 mt-2">
                {totalCo2.toLocaleString()}
                <span className="text-3xl font-bold opacity-40">กิโลกรัม / CO₂</span>
              </h2>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-emerald-400">
                    <TreeDeciduous className="w-5 h-5" />
                    <span className="text-xl font-bold">{Math.round(totalCo2 / 20).toLocaleString()}</span>
                 </div>
                 <p className="text-[10px] uppercase font-bold text-emerald-100/50 leading-relaxed">เทียบเท่าการปลูกต้นไม้ (ต้น)</p>
               </div>
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-emerald-400">
                    <Wind className="w-5 h-5" />
                    <span className="text-xl font-bold">{Math.round(totalCo2 / 2.3).toLocaleString()}</span>
                 </div>
                 <p className="text-[10px] uppercase font-bold text-emerald-100/50 leading-relaxed">ชดเชยการใช้น้ำมัน (ลิตร)</p>
               </div>
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-emerald-400">
                    <CloudRain className="w-5 h-5" />
                    <span className="text-xl font-bold">{(totalCo2 * 0.05).toFixed(1)}</span>
                 </div>
                 <p className="text-[10px] uppercase font-bold text-emerald-100/50 leading-relaxed">การกักเก็บนํ้าฝนตามธรรมชาติ (ม.³)</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xl font-display font-bold text-slate-900 mb-8">Green Energy Mix</h3>
          <div className="space-y-8 flex-1">
            {[
              { type: 'Solar', pct: 100, color: 'bg-emerald-500' },
              { type: 'Wind', pct: 0, color: 'bg-emerald-700' },
              { type: 'Hydro', pct: 0, color: 'bg-emerald-900' },
            ].map(item => (
              <div key={item.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{item.type}</span>
                  <span className="text-sm font-bold text-pea-green">{item.pct}%</span>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-xl font-display font-bold text-slate-900">Carbon Avoided Trend</h3>
           <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-pea-emerald"></div> 2025-2026 Data
              </span>
           </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="co2" 
                stroke="#10B981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorCo2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AnimatePresence>
        {downloadSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-12 right-12 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl flex items-center gap-5 z-[100] border border-white/10"
          >
            <div className="w-12 h-12 bg-pea-green rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/20">
               <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight">ดาวน์โหลดเสร็จสิ้น!</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Report.xlsx saved to your device.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
