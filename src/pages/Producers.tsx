import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Factory, 
  MapPin, 
  Cpu, 
  Award, 
  Plus, 
  MoreVertical, 
  Zap, 
  Eye, 
  Edit3, 
  Trash2, 
  Power,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const Producers = () => {
  const navigate = useNavigate();
  const { globalData, updateAsset, removeAsset } = useAppContext();
  const assets = globalData.assets;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
     const asset = assets.find(a => a.id === id);
     if (asset) {
       updateAsset(id, { status: asset.status === 'Active' ? 'Inactive' : 'Active' });
     }
  };

  const handleDelete = (id: string) => {
     if (window.confirm('คุณต้องการลบอุปกรณ์นี้ใช่หรือไม่? ข้อมูลทั้งหมดจะถูกลบถาวร')) {
        removeAsset(id);
        setActiveMenu(null);
     }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Registered Assets</h1>
          <p className="text-slate-500">จัดการอุปกรณ์และแหล่งผลิตพลังงานหมุนเวียนที่ลงทะเบียนไว้</p>
        </div>
        <button 
          onClick={() => navigate('/register-asset')}
          className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-pea-green transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          ลงทะเบียนอุปกรณ์ใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 relative group overflow-visible hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Header with Switch and Menu */}
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${asset.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                     <button 
                       onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(asset.id);
                       }}
                       className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                          asset.status === 'Active' 
                             ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                             : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                       }`}
                     >
                       <Power className="w-3 h-3" />
                       {asset.status === 'Active' ? 'Active' : 'Paused'}
                     </button>
                  </div>
               </div>
               
               <div className="relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === asset.id ? null : asset.id)}
                    className="p-3 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-xl transition-all"
                  >
                     <MoreVertical className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                     {activeMenu === asset.id && (
                        <>
                           <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
                           <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                           >
                              <button 
                                onClick={() => navigate(`/assets/${asset.id}`)}
                                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-pea-green transition-all border-b border-slate-50 text-left"
                              >
                                 <Eye className="w-4 h-4" />
                                 ดูรายละเอียดเชิงลึก
                              </button>
                              <button 
                                onClick={() => navigate(`/register-asset?id=${asset.id}`)}
                                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-pea-green transition-all border-b border-slate-50 text-left"
                              >
                                 <Edit3 className="w-4 h-4" />
                                 แก้ไขข้อมูลอุปกรณ์
                              </button>
                              <button 
                                onClick={() => handleDelete(asset.id)}
                                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all text-left"
                              >
                                 <Trash2 className="w-4 h-4" />
                                 ลบอุปกรณ์ถาวร
                              </button>
                           </motion.div>
                        </>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            <div className="space-y-6">
              <div 
                onClick={() => navigate(`/assets/${asset.id}`)}
                className="cursor-pointer group/content"
              >
                <div className="flex items-center gap-2 mb-1">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Meter ID: {asset.meterId}</p>
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 truncate flex items-center gap-2 group-hover/content:text-pea-green transition-colors" title={(asset as any).name || asset.type}>
                  {(asset as any).name || asset.type}
                  <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover/content:opacity-100 group-hover/content:translate-x-0 transition-all" />
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{asset.type}</p>
                <a 
                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(asset.location)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="text-sm font-medium text-slate-500 mt-2 flex items-center gap-1.5 truncate hover:text-pea-green transition-colors inline-flex" 
                   title={asset.location}
                >
                   <MapPin className="w-4 h-4 flex-shrink-0" />
                   <span className="truncate">{asset.location}</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 py-8 border-y border-slate-50">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ขนาดติดตั้ง</p>
                    <p className="text-lg font-bold text-slate-900">{asset.capacity}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ผลิตได้/เดือน</p>
                    <p className="text-lg font-bold text-pea-green">{asset.production.toLocaleString()} {globalData.stats.unit}</p>
                 </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => navigate(`/assets/${asset.id}/history`)}
                  className="flex-1 py-4 rounded-2xl bg-white border border-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                   <Award className="w-4 h-4" />
                   History
                </button>
                <button 
                   onClick={() => navigate(`/assets/${asset.id}`)}
                   className="flex-1 py-4 rounded-2xl bg-pea-green text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10"
                >
                   Details
                </button>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => navigate('/register-asset')}
          className="bg-slate-50/50 rounded-[40px] p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-6 group hover:border-emerald-300 hover:bg-emerald-50/20 transition-all min-h-[440px]"
        >
           <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-all shadow-sm border border-slate-100">
              <Plus className="w-10 h-10" />
           </div>
           <div className="text-center">
              <p className="font-bold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">Add New Asset</p>
              <p className="text-xs text-slate-400 font-medium max-w-[180px] mt-2">เพิ่มแผงโซล่าร์เซลล์ หรือกังหันลมของคุณเข้าระบบ</p>
           </div>
        </button>
      </div>
    </div>
  );
};
