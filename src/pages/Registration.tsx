import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, Building2, Phone, CheckCircle, Save, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOBAL_DATA } from '../constants';

export const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isEditMode = queryParams.get('mode') === 'edit';

  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    accountType: 'personal',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    idNumber: '',
    prefix: '',
    firstName: '',
    lastName: '',
    gender: 'not-specified',
    status: 'single',
    birthDate: '',
    address: {
      houseNo: '',
      moo: '',
      alley: '',
      soi: '',
      road: '',
      village: '',
      roomNo: '',
      floor: '',
      province: '',
      district: '',
      subDistrict: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    if (isEditMode) {
      // Split name if possible
      const nameParts = GLOBAL_DATA.user.name.split(' ');
      const prefix = nameParts[0]?.startsWith('คุณ') ? 'คุณ' : '';
      const firstName = nameParts[0]?.replace('คุณ', '') || '';
      const lastName = nameParts[1] || '';

      setFormData(prev => ({
        ...prev,
        email: GLOBAL_DATA.user.email,
        confirmEmail: GLOBAL_DATA.user.email,
        idNumber: GLOBAL_DATA.user.id,
        prefix: prefix,
        firstName: firstName,
        lastName: lastName,
        address: {
          ...prev.address,
          houseNo: GLOBAL_DATA.user.houseNo.split(' ')[0] || '',
          moo: GLOBAL_DATA.user.houseNo.match(/หมู่ (\d+)/)?.[1] || '',
          province: 'chonburi',
          district: 'เมืองชลบุรี',
          subDistrict: 'เมือง',
          zipCode: GLOBAL_DATA.user.zipCode
        }
      }));
    }
  }, [isEditMode]);

  const districts: Record<string, string[]> = {
    'bangkok': ['พระนคร', 'ดุสิต', 'ปทุมวัน', 'บางรัก', 'ห้วยขวาง', 'สุขุมวิท', 'จตุจักร'],
    'chonburi': ['เมืองชลบุรี', 'ศรีราชา', 'บางละมุง (พัทยา)', 'สัตหีบ', 'บ้านบึง'],
    'chiangmai': ['เมืองเชียงใหม่', 'หางดง', 'สารภี', 'สันทราย', 'แม่ริม'],
    'rayong': ['เมืองระยอง', 'บ้านฉาง', 'ปลวกแดง', 'มาบตาพุด']
  };

  const handleProvinceChange = (provinceValue: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        province: provinceValue,
        district: '' // Reset district when province changes
      }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
       setIsSaved(false);
       navigate('/');
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-bold text-[10px] uppercase tracking-widest">
           {isEditMode ? 'Profile Management' : 'Onboarding System'}
        </div>
        <h1 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">
          {isEditMode ? 'แก้ไขข้อมูลส่วนตัว' : 'ลงทะเบียนสำหรับผู้ใช้งานใหม่'}
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          {isEditMode 
            ? 'ปรับปรุงข้อมูลที่อยู่และรายละเอียดส่วนตัวของคุณให้เป็นปัจจุบัน' 
            : 'กรุณากรอกข้อมูลให้ครบถ้วนเพื่อใช้ในการยืนยันตัวตนกับระบบ I-REC และ PEA'
          }
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Section 1: Account Details */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pea-green text-white flex items-center justify-center font-bold">1</div>
            <h3 className="text-xl font-display font-bold">รายละเอียดบัญชี (Account Details)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ประเภทบัญชี *</label>
              <div className="flex gap-4">
                {['personal', 'legal'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, accountType: type})}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 font-bold text-sm transition-all ${formData.accountType === type ? 'border-pea-green bg-emerald-50 text-pea-green' : 'border-slate-100 text-slate-400'}`}
                  >
                    {type === 'personal' ? 'บุคคลธรรมดา' : 'นิติบุคคล'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">อีเมลที่ใช้ในการติดต่อ *</label>
              <input 
                required type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20"
                placeholder="Email Address"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ยืนยันอีเมล *</label>
              <input 
                required type="email" 
                value={formData.confirmEmail}
                onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20" 
                placeholder="Confirm Email" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">รหัสผ่าน {isEditMode && '(เว้นว่างเพื่อไม่เปลี่ยน)'} *</label>
                <input required={!isEditMode} type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20" placeholder="Password" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ยืนยันรหัสผ่าน *</label>
                <input required={!isEditMode || !!formData.password} type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20" placeholder="Confirm Password" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Identity */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pea-green text-white flex items-center justify-center font-bold">2</div>
            <h3 className="text-xl font-display font-bold">การยืนยันตัวตน (Identity Verification)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">เลขบัตรประจำตัวประชาชน / หนังสือเดินทาง *</label>
              <input 
                required type="text" 
                value={formData.idNumber}
                onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pea-green/20" 
                placeholder="Personal ID / Passport Number" 
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">สำเนาบัตรประชาชน / หนังสือเดินทาง *</label>
              <div className="relative">
                <input type="file" accept=".pdf" className="w-full px-6 py-4 bg-slate-50 border-dashed border-2 border-slate-200 rounded-2xl text-xs text-slate-400" />
                <p className="text-[9px] text-rose-500 mt-2 font-medium">* PDF เท่านั้น, ไม่เกิน 3 MB {isEditMode && '(อัปโหลดใหม่เพื่อเปลี่ยนไฟล์)'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">เพศ *</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm"
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="not-specified">ไม่ระบุ</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">คำนำหน้า *</label>
                <input 
                  type="text" 
                  value={formData.prefix}
                  onChange={(e) => setFormData({...formData, prefix: e.target.value})}
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-sm" 
                  placeholder="เช่น นาย/ดร." 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ชื่อ *</label>
                <input 
                  required type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-sm" 
                  placeholder="First Name" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">นามสกุล *</label>
                <input 
                  required type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-sm" 
                  placeholder="Last Name" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">สถานภาพ *</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm"
              >
                <option value="single">โสด</option>
                <option value="married">แต่งงาน</option>
                <option value="divorced">หย่า</option>
                <option value="widowed">หม้าย</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">วันเกิด *</label>
              <input 
                required type="date" 
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm" 
              />
            </div>
          </div>
        </div>

        {/* Section 3: Address */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pea-green text-white flex items-center justify-center font-bold">3</div>
            <h3 className="text-xl font-display font-bold">ที่อยู่ (Address)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">บ้านเลขที่ *</label>
              <input required type="text" 
                value={formData.address.houseNo}
                onChange={(e) => setFormData({...formData, address: {...formData.address, houseNo: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">หมู่</label>
              <input type="text" 
                value={formData.address.moo}
                onChange={(e) => setFormData({...formData, address: {...formData.address, moo: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ตรอก</label>
              <input type="text" 
                value={formData.address.alley}
                onChange={(e) => setFormData({...formData, address: {...formData.address, alley: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ซอย</label>
              <input type="text" 
                value={formData.address.soi}
                onChange={(e) => setFormData({...formData, address: {...formData.address, soi: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ถนน</label>
              <input type="text" 
                value={formData.address.road}
                onChange={(e) => setFormData({...formData, address: {...formData.address, road: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ชื่อหมู่บ้าน / อาคาร</label>
              <input type="text" 
                value={formData.address.village}
                onChange={(e) => setFormData({...formData, address: {...formData.address, village: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
              />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">เลขที่ห้อง</label>
               <input type="text" 
                value={formData.address.roomNo}
                onChange={(e) => setFormData({...formData, address: {...formData.address, roomNo: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ชั้น</label>
               <input type="text" 
                value={formData.address.floor}
                onChange={(e) => setFormData({...formData, address: {...formData.address, floor: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" 
               />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">จังหวัด *</label>
              <select 
                required 
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20"
                value={formData.address.province}
                onChange={(e) => handleProvinceChange(e.target.value)}
              >
                <option value="">--- โปรดเลือก ---</option>
                <option value="bangkok">กรุงเทพมหานคร</option>
                <option value="chonburi">ชลบุรี</option>
                <option value="chiangmai">เชียงใหม่</option>
                <option value="rayong">ระยอง</option>
              </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">อำเภอ/เขต *</label>
               <select 
                 required 
                 className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20"
                 value={formData.address.district}
                 onChange={(e) => setFormData({...formData, address: {...formData.address, district: e.target.value}})}
               >
                  {!formData.address.province ? (
                    <option value="">--- โปรดเลือกจังหวัดก่อน ---</option>
                  ) : (
                    <>
                      <option value="">--- เลือกอำเภอ/เขต ---</option>
                      {districts[formData.address.province]?.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </>
                  )}
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ตำบล/แขวง *</label>
               <input required type="text" 
                value={formData.address.subDistrict}
                onChange={(e) => setFormData({...formData, address: {...formData.address, subDistrict: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="ระบุตำบล" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">รหัสไปรษณีย์ *</label>
               <input required type="text" 
                value={formData.address.zipCode}
                onChange={(e) => setFormData({...formData, address: {...formData.address, zipCode: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pea-green/20" placeholder="5 หลัก" 
               />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-10">
          <button 
            type="submit" 
            className="w-full max-w-md py-6 bg-pea-green text-white rounded-[32px] font-bold text-base tracking-widest uppercase hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3"
          >
             <Save className="w-6 h-6" />
             {isEditMode ? 'บันทึกการเปลี่ยนแปลง' : 'บันทึกและยืนยันข้อมูล'}
          </button>
        </div>
      </form>


      <AnimatePresence>
        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-[70] bg-slate-900/60 backdrop-blur-md"
          >
            <div className="bg-white p-12 rounded-[50px] shadow-2xl flex flex-col items-center text-center max-w-sm">
                <CheckCircle className="w-20 h-20 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">ลงทะเบียนเรียบร้อย!</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">ขอบคุณสำหรับการลงทะเบียน ระบบกำลังนำคุณไปที่หน้า Dashboard</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
