import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Cpu, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Barcode, 
  Navigation, 
  Wifi, 
  Highlighter,
  Settings,
  Power
} from 'lucide-react';
import { GLOBAL_DATA } from '../constants';
import { motion } from 'motion/react';

export const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = GLOBAL_DATA.assets.find(a => a.id === id);
  const [currentStatus, setCurrentStatus] = useState(asset?.status || 'Active');

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-400">ไม่พบข้อมูลอุปกรณ์</h2>
        <button onClick={() => navigate('/producers')} className="text-pea-green font-bold">กลับไปหน้าผู้ผลิต</button>
      </div>
    );
  }

  const toggleStatus = () => {
    setCurrentStatus(prev => prev === 'Active' ? 'Inactive' : 'Active');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/producers')}
            className="p-3 bg-white rounded-xl text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">{asset.name}</h1>
            <p className="text-slate-500 font-medium flex items-center gap-1">
              <span className="uppercase tracking-widest text-[10px] font-bold text-slate-400">Asset ID:</span>
              <span className="text-sm font-mono text-slate-600">{asset.id}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
             <Settings className="w-4 h-4" />
             Edit Info
           </button>
           <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 ${currentStatus === 'Active' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-rose-500/20'}`}>
              <Activity className="w-4 h-4" />
              {currentStatus === 'Active' ? 'System Online' : 'System Paused'}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Technical Specification */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-pea-green text-white rounded-2xl shadow-lg shadow-emerald-900/10">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">ข้อมูลทางเทคนิค (Technical Specification)</h2>
                <p className="text-sm text-slate-400">รายละเอียดศักยภาพและรุ่นของอุปกรณ์</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Highlighter className="w-3 h-3 text-emerald-500" />
                   ประเภทเทคโนโลยี
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.technology}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Zap className="w-3 h-3 text-amber-500" />
                   กำลังการผลิตติดตั้ง (Installed Capacity)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.capacity}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3 text-blue-500" />
                   แผงโซลาร์ (Solar Modules)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.techSpec.modules}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-3 h-3 text-purple-500" />
                   อินเวอร์เตอร์ (Inverter Model)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.techSpec.inverter}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Barcode className="w-3 h-3 text-slate-500" />
                   หมายเลขซีเรียล (Serial Number)
                </p>
                <p className="text-lg font-mono font-bold text-slate-900">{asset.techSpec.serialNumber}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Calendar className="w-3 h-3 text-rose-500" />
                   วันที่เริ่มดำเนินการ (COD)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.techSpec.cod}</p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Location & Connectivity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-900/10">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">สถานที่และการเชื่อมต่อ (Location & Connectivity)</h2>
                <p className="text-sm text-slate-400">ตำแหน่งที่ตั้งและสถานะการเชื่อมต่อโครงข่าย</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Navigation className="w-3 h-3 text-rose-500" />
                   พิกัด GPS (Latitude/Longitude)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.connection.gps}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <MapPin className="w-3 h-3 text-emerald-500" />
                   ที่อยู่ติดตั้ง (Installation Address)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.location}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Barcode className="w-3 h-3 text-slate-500" />
                   รหัสเครื่องวัด (Meter ID)
                </p>
                <p className="text-lg font-mono font-bold text-slate-900">{asset.meterId}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Wifi className="w-3 h-3 text-blue-500" />
                   จุดเชื่อมโยง (Interconnection)
                </p>
                <p className="text-lg font-bold text-slate-900">{asset.connection.interconnectionPoint}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Status Column */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-8">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Real-time Performance</p>
                <div className="space-y-6">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Grid Voltage</p>
                      <p className="text-3xl font-display font-bold transition-all duration-300">
                        {currentStatus === 'Active' ? asset.connection.voltage : '0V'}
                      </p>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Network Status</p>
                      <div className="flex items-center gap-2 mt-1">
                         <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStatus === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                         <p className="text-lg font-bold transition-all duration-300">
                           {currentStatus === 'Active' ? 'Online' : 'Offline'}
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-white/10">
                <div className="bg-white/5 rounded-2xl p-4 space-y-4">
                   <div className="flex items-center justify-between">
                      <p className="text-xs font-bold">Pause Device Mode</p>
                      <button 
                        onClick={toggleStatus}
                        className={`w-10 h-6 rounded-full p-1 transition-all duration-300 ${currentStatus === 'Active' ? 'bg-emerald-500' : 'bg-slate-700'}`}
                      >
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${currentStatus === 'Active' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-500 leading-relaxed">
                      เมื่อเปิดโหมดหยุดใช้งานชั่วคราว อุปกรณ์จะหยุดส่งข้อมูลการผลิตเข้าสู่ระบบ REC โดยที่คุณไม่ต้องลบข้อมูลอุปกรณ์ทิ้ง
                   </p>
                </div>
             </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-pea-green shadow-sm">
                   <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-900">Certified Producer</p>
                   <p className="text-xs text-slate-500 mt-1">แหล่งผลิตนี้ได้รับการระบุพิกัดและยืนยันตัวตนกับ PEA แล้ว</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
