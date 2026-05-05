import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const CertificateViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/certificates')}
            className="p-3 bg-white rounded-xl text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900">Certificate Preview</h1>
            <p className="text-sm text-slate-500 font-medium tracking-wide">รูปแบบใบรับรองมาตรฐาน I-REC</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="bg-white text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Printer className="w-4 h-4" />
              Print
           </button>
           <button className="bg-pea-green text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-sm shadow-emerald-900/10">
              <Download className="w-4 h-4" />
              Download PDF
           </button>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        {/* Certificate A4 Size Container */}
        <div className="w-full max-w-[1000px] aspect-[1.414] bg-white shadow-2xl relative p-16 flex flex-col items-center justify-center text-center">
           {/* Border Layer */}
           <div className="absolute inset-4 border-[1px] border-pea-green/30 pointer-events-none"></div>
           <div className="absolute inset-5 border-[3px] border-double border-pea-green/40 pointer-events-none"></div>
           
           <div className="absolute top-16 left-16">
              <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center relative shadow-inner">
                 <ShieldCheck className="w-14 h-14 text-pea-green" />
                 <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                 </div>
              </div>
           </div>
           
           <div className="absolute top-16 right-16 text-right">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Certificate No.</p>
              <p className="text-sm font-mono font-bold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                 {id || 'REC-2024-00X'}
              </p>
           </div>
           
           <div className="space-y-8 flex-1 flex flex-col justify-center items-center relative z-10 w-full pt-10">
             <div className="space-y-3">
                 <h2 className="text-[44px] font-display font-black text-slate-900 tracking-tight leading-none uppercase">
                   INTERNATIONAL REC STANDARD
                 </h2>
                 <p className="text-xl font-bold tracking-[0.2em] text-pea-green uppercase">
                   Energy Attribute Certificate
                 </p>
             </div>
             
             <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-pea-green my-8 rounded-full"></div>
             
             <div className="space-y-4 max-w-3xl">
                 <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">This is to certify that</p>
                 <h3 className="text-[40px] font-display font-extrabold text-slate-800 leading-none">Solar Farm Alpha Co., Ltd.</h3>
                 <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">has successfully generated and injected into the grid</p>
             </div>
             
             <div className="py-8 px-16 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                <span className="text-[64px] font-display font-black text-pea-green leading-none">145</span>
                <span className="text-2xl font-bold text-slate-600 ml-4 uppercase tracking-[0.2em]">MWh</span>
             </div>
             
             <p className="text-slate-600 text-lg max-w-2xl leading-loose">
                of eligible energy from renewable energy sources located at 
                <strong className="text-slate-900 font-bold"> Chonburi, Thailand</strong> during the period of 
                <strong className="text-slate-900 font-bold"> February 2024</strong>.
             </p>
             
             <div className="grid grid-cols-2 gap-24 mt-16 w-full max-w-2xl">
                <div className="text-center space-y-3 font-mono">
                   <div className="w-full border-b-2 border-slate-800 pb-3 h-16 flex items-end justify-center relative">
                       {/* Simulate Signature */}
                       <span className="font-['Brush_Script_MT',cursive] text-4xl text-slate-700 opacity-80 absolute bottom-1 -rotate-3">Somchai E.</span>
                   </div>
                   <p className="text-sm font-bold text-slate-800">Dr. Somchai Energy</p>
                   <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Authorized Signature</p>
                </div>
                <div className="text-center space-y-3 font-mono">
                   <div className="w-full border-b-2 border-slate-800 pb-3 h-16 flex items-end justify-center">
                       <p className="text-lg font-bold text-slate-800">{new Date().toLocaleDateString('en-GB')}</p>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-7">Date of Issue</p>
                </div>
             </div>
           </div>
           
           <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-10 pointer-events-none">
              <Award className="w-[400px] h-[400px]" />
           </div>
        </div>
      </div>
    </div>
  );
};
