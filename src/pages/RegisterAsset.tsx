import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  MapPin, 
  Cpu, 
  FileText, 
  Save, 
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RegisterAsset = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gridVoltage: 'low',
    totalCapacity: '',
    scod: '',
    panelBrand: '',
    panelModel: '',
    panelQty: '',
    panelType: 'mono',
    inverterBrand: '',
    inverterModel: '',
    inverterQty: '',
    inverterCapacity: '',
    inverterVoltage: '',
    inverterPhase: '3',
    transformerKva: '',
    panelCapacityPerUnit: '',
    installationArea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
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
            เจ้าหน้าที่จะทำการตรวจสอบ Meter ภายใน 3-5 วันทำการ (เลขอาราบิก)
          </p>
          <button 
            onClick={() => navigate('/producers')}
            className="w-full py-4 bg-pea-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20"
          >
            Go to Producers
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-pea-green font-bold text-[10px] uppercase tracking-widest mb-4">
        <ArrowLeft className="w-4 h-4" />
        ถอยกลับ (Back)
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900">Register Technical Asset</h1>
          <p className="text-slate-500 font-medium">รายละเอียดของระบบผลิตไฟฟ้าเพื่อเชื่อมต่อระบบโครงข่าย (PEA)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1 space-y-4">
           {['โครงข่ายไฟฟ้า', 'รายละเอียดแผง Solar', 'Inverter & อื่นๆ'].map((label, i) => (
             <div key={label} className={`p-6 rounded-3xl border-2 transition-all ${step === i+1 ? 'border-pea-green bg-white shadow-lg' : 'border-transparent bg-slate-50 opacity-40'}`}>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Step {i+1}</p>
                <p className="font-bold text-slate-900 text-sm">{label}</p>
             </div>
           ))}
        </div>

        <div className="md:col-span-3 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col">
           <form onSubmit={handleSubmit} className="space-y-8 flex-1">
             {step === 1 && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">1) ส่วนของสถานที่และระบบไฟฟ้า</label>
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                      <p className="text-xs font-bold text-slate-600">รับไฟจากระบบไฟฟ้าแรงดัน</p>
                      <div className="flex flex-col gap-2">
                        {['low', 'high'].map(v => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setFormData({...formData, gridVoltage: v})}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${formData.gridVoltage === v ? 'border-pea-green bg-white text-pea-green' : 'border-slate-100 bg-transparent text-slate-400'}`}
                          >
                             <span className="text-sm font-bold">{v === 'low' ? 'ต่ำกว่า 400 โวลต์' : 'ตั้งแต่ 22 กิโลโวลต์ ขึ้นไป'}</span>
                             {formData.gridVoltage === v && <CheckCircle className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">1.1 กำลังการผลิตติดตั้ง (kW)</label>
                      <input required type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="เช่น 500 kW" defaultValue={formData.totalCapacity} onBlur={e => setFormData({...formData, totalCapacity: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">1.2 วันเริ่มต้นเชื่อมต่อ (SCOD)</label>
                      <input required type="date" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" defaultValue={formData.scod} onBlur={e => setFormData({...formData, scod: e.target.value})} />
                    </div>
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="w-full py-5 bg-pea-green text-white rounded-3xl font-bold text-sm uppercase tracking-widest mt-10 shadow-lg shadow-emerald-900/10">หน้าถัดไป (Panel Detail)</button>
               </motion.div>
             )}

             {step === 2 && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h4 className="text-xl font-display font-bold">2) รายละเอียดแผงพลังงานแสงอาทิตย์</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ยี่ห้อ (Brand)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="เช่น LONGi" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">รุ่น (Model)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="เช่น LR5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">จำนวน (แผง)</label>
                      <input required type="number" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="ใส่ตัวเลข" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ขนาด/แผง (Watts)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="เช่น 550 W" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ขนาดพื้นที่ติดตั้งรวม (ตารางเมตร)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="ตารางเมตร" />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ชนิดแผง (Solar Type)</label>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Mono-Crystalline', 'Poly-Crystalline', 'Thin film'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({...formData, panelType: t})}
                            className={`p-4 rounded-xl border-2 text-xs font-bold transition-all ${formData.panelType === t ? 'border-pea-green bg-emerald-50 text-pea-green' : 'border-slate-50 text-slate-400'}`}
                          >
                             {t}
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="flex gap-4 pt-10">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-3xl font-bold text-sm uppercase">ย้อนกลับ</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-[2] py-5 bg-pea-green text-white rounded-3xl font-bold text-sm uppercase">ถัดไป (Inverter)</button>
                  </div>
               </motion.div>
             )}

             {step === 3 && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h4 className="text-xl font-display font-bold">3) ชนิดอินเวอร์เตอร์ (Inverter) & อื่นๆ</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ยี่ห้อ (Brand)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="Huawei / Sungrow" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">รุ่น (Model)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">จำนวน (เครื่อง)</label>
                      <input required type="number" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">พิกัดกำลัง (kW/เครื่อง)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">พิกัดแรงดัน AC (โวลต์)</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">เฟส (1 หรือ 3 เฟส)</label>
                      <select className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20">
                        <option>3 เฟส</option>
                        <option>1 เฟส</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Firmware Version</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="เช่น v2.0.1" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ข้อมูลหม้อแปลง (ถ้ามี) ขนาด KVA</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="KVA" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-10">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-3xl font-bold text-sm uppercase">ย้อนกลับ</button>
                    <button type="submit" disabled={isSubmitting} className="flex-[2] py-5 bg-pea-green text-white rounded-3xl font-bold text-sm uppercase shadow-xl shadow-emerald-900/10 active:scale-95 transition-all">
                       {isSubmitting ? 'กำลังบันทึก...' : 'เสร็จสิ้นการลงทะเบียน (Save)'}
                    </button>
                  </div>
               </motion.div>
             )}
           </form>
        </div>
      </div>
    </div>
  );
};
