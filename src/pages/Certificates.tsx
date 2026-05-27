import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const certificates = [
  { id: 'REC-2026-004', month: 'April 2026', amount: 1.965, status: 'Draft', date: 'Waiting for Meter' },
  { id: 'REC-2026-003', month: 'March 2026', amount: 1.920, status: 'Pending', date: 'Processing' },
  { id: 'REC-2026-002', month: 'February 2026', amount: 1.635, status: 'Issued', date: '10/03/2026' },
  { id: 'REC-2026-001', month: 'January 2026', amount: 2.095, status: 'Issued', date: '12/02/2026' },
];

export const Certificates = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Renewable Certificates</h1>
          <p className="text-slate-500">ตรวจสอบความถูกต้องและประวัติการออกใบรับรองพลังงานหมุนเวียน</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => navigate('/reports')}
             className="bg-white text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-2"
           >
              <ShieldCheck className="w-4 h-4" />
              Verify on Blockchain
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-md transition-all">
            <div className={`w-20 h-20 rounded-[28px] shrink-0 flex items-center justify-center transition-all ${
              cert.status === 'Issued' ? 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' :
              cert.status === 'Pending' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'
            }`}>
              <Award className="w-10 h-10" />
            </div>

            <div className="flex-1 space-y-1 text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-tighter">I-REC Tracking No.</span>
                 <p className="text-sm font-bold text-slate-900">{cert.id}</p>
               </div>
               <h3 className="text-xl font-display font-bold text-slate-700">{cert.month} production</h3>
               <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-pea-green"></div>
                    <span className="text-xs font-bold text-pea-green">{cert.amount} REC Units</span>
                  </div>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Issued on {cert.date}</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4 min-w-[200px]">
               <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                 cert.status === 'Issued' ? 'bg-emerald-100 text-emerald-700' :
                 cert.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
               }`}>
                 {cert.status === 'Issued' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                 {cert.status}
               </div>
               
               <div className="flex gap-2">
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-40 -mt-20"></div>
         <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative">
              <Award className="w-32 h-32 text-emerald-400 animate-pulse" />
              <ShieldCheck className="absolute -bottom-2 -right-2 w-10 h-10 text-white fill-emerald-500" />
            </div>
         </div>
         <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
            <h2 className="text-3xl font-display font-extrabold leading-tight">ใบรับรองพลังงานที่ผ่านการ Verified โดย PEA มีค่าเทียบเท่าทองคำในตลาด RE100</h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-xl">
               ทุกหน่วยการผลิตจะถูกติดตามด้วยระบบ Blockchain และ Metering อัจฉริยะแบบ Real-time 
               เพื่อให้มั่นใจว่าไม่มีการนับซ้ำ (Double Counting) และมีความโปร่งใสสูงสุดตามมาตรฐานสากล I-REC
            </p>
            <button 
              onClick={() => navigate('/register-asset')}
              className="px-8 py-4 bg-white text-pea-green rounded-2xl font-display font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
            >
               เข้าสู่หน้าลงทะเบียนผู้ผลิต
            </button>
         </div>
      </div>
    </div>
  );
};
