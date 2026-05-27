import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  UploadCloud,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export const RegisterAsset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deviceType: 'solar',
    capacity: '',
    inverterBrand: '',
    serialNumber: '',
    scod: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[50px] shadow-2xl flex flex-col items-center text-center max-w-md border border-slate-100"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-inner">
             <CheckCircle className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-display font-extrabold text-slate-900 mb-4">ลงทะเบียนสำเร็จ!</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-10">
            คำขอลงทะเบียนอุปกรณ์ของคุณถูกส่งเข้าระบบเรียบร้อยแล้ว <br/>
            ระบบจะตรวจสอบข้อมูลจาก Inverter อัตโนมัติภายใน 24 ชั่วโมง
          </p>
          <button 
            onClick={() => navigate('/producers')}
            className="w-full py-4 bg-pea-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20"
          >
            ไปที่หน้าอุปกรณ์ของฉัน
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-pea-green font-bold text-[10px] uppercase tracking-widest mb-2 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        ย้อนกลับ (Back)
      </button>

      <div>
        <h1 className="text-4xl font-display font-extrabold text-slate-900 mb-2">ลงทะเบียนอุปกรณ์ใหม่</h1>
        <p className="text-slate-500 font-medium text-sm">ง่ายและรวดเร็ว เพียงเชื่อมต่อผ่าน Serial Number ของ Inverter</p>
      </div>

      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
         <form onSubmit={handleSubmit} className="space-y-8">
           
           {/* Section 1: Basic Info */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <label className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pea-green" /> ข้อมูลทั่วไป
                 </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ประเภทพลังงาน</label>
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20 text-slate-700 font-medium"
                    value={formData.deviceType}
                    onChange={e => setFormData({...formData, deviceType: e.target.value})}
                  >
                     <option value="solar">Solar Rooftop / Solar Farm</option>
                     <option value="wind">Wind Turbine</option>
                     <option value="hydro">Hydro Power</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">กำลังการผลิตติดตั้ง (kW)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20 placeholder:text-slate-400 font-medium" 
                    placeholder="เช่น 150.5" 
                    value={formData.capacity}
                    onChange={e => setFormData({...formData, capacity: e.target.value})}
                  />
                </div>
              </div>
           </div>

           <hr className="border-slate-50" />

           {/* Section 2: Inverter Details */}
           <div className="space-y-6">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <UploadCloud className="w-4 h-4 text-pea-green" /> การเชื่อมต่อ Inverter
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ยี่ห้อ (Brand)</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20 placeholder:text-slate-400 font-medium" 
                    placeholder="เช่น SG110CX" 
                    value={formData.inverterBrand}
                    onChange={e => setFormData({...formData, inverterBrand: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Serial Number (สำคัญ)*</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20 placeholder:text-slate-400 font-medium" 
                    placeholder="เลข S/N เพื่อดึงข้อมูล" 
                    value={formData.serialNumber}
                    onChange={e => setFormData({...formData, serialNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">วันที่เริ่มจ่ายไฟ (SCOD)</label>
                  <input 
                    required 
                    type="date" 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20 text-slate-700 font-medium" 
                    value={formData.scod}
                    onChange={e => setFormData({...formData, scod: e.target.value})}
                  />
                </div>
              </div>
           </div>

           <div className="pt-6">
             <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-5 bg-pea-green text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-emerald-900/10 hover:bg-emerald-800 disabled:opacity-50 transition-all active:scale-[0.98]"
             >
                {isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ลงทะเบียนและเชื่อมต่อข้อมูล'}
             </button>
             <p className="text-center text-xs text-slate-400 mt-4">
                ระบบจะดึงข้อมูลมิเตอร์และรายละเอียดอัตโนมัติจาก PEA API ด้วย Serial Number
             </p>
           </div>
         </form>
      </div>
    </div>
  );
};

