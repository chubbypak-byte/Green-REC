import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Settings, 
  PlusCircle, 
  Cpu,
  Mail,
  Smartphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { globalData } = useAppContext();
  
  const user = {
    name: globalData.user.name,
    id: globalData.user.id,
    email: globalData.user.email,
    phone: globalData.user.phone,
    address: globalData.user.fullAddress,
    joinDate: globalData.user.joinDate,
    hasAssets: globalData.stats.assetCount > 0
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-extrabold text-slate-900">ประวัติภาพรวม (Profile Overview)</h1>
        <button onClick={() => navigate('/registration?mode=edit')} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-pea-green transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: User Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center">
            <div className="w-24 h-24 bg-pea-green/10 rounded-full flex items-center justify-center mx-auto mb-6 text-pea-green">
              <User className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">ผู้ใช้งานทั่วไป (General User)</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Identity Verified
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-400" />
              ข้อมูลการติดต่อ
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">อีเมล</p>
                  <p className="text-sm font-medium text-slate-700">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">เบอร์โทรศัพท์</p>
                  <p className="text-sm font-medium text-slate-700">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: History & Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
            <h4 className="text-xl font-display font-bold">ข้อมูลทั่วไปและทะเบียนประวัติ</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">เลขประจำตัวประชาชน</p>
                <p className="text-slate-700 font-medium">{user.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">วันที่เริ่มใช้งาน</p>
                <p className="text-slate-700 font-medium">{user.joinDate}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ที่อยู่ตามทะเบียน</p>
                <p className="text-slate-700 font-medium">{user.address}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50">
              {user.hasAssets ? (
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pea-green shadow-sm text-xl font-bold">{globalData.assets.length}</div>
                    <div>
                      <p className="font-bold text-slate-900">อุปกรณ์ที่ลงทะเบียนแล้ว</p>
                      <p className="text-xs text-slate-500">ระบบตรวจพบอุปกรณ์ผลิตไฟฟ้า {globalData.assets.length} รายการ</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/producers')} className="px-6 py-2 bg-pea-green text-white rounded-xl font-bold text-xs uppercase tracking-widest">
                    ดูข้อมูลผลิตไฟ
                  </button>
                </div>
              ) : (
                <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                    <PlusCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900">ยังไม่มีอุปกรณ์ที่ลงทะเบียน</h5>
                    <p className="text-sm text-slate-500 max-w-sm mt-1">
                      คุณยังไม่ได้ทำการลงทะเบียนอุปกรณ์ผลิตไฟฟ้า (Asset) เข้าสู่ระบบ PEA Green Collect 
                      เพื่อเริ่มนับหน่วยการผลิตสำหรับใบรับรอง I-REC
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/register-asset')}
                    className="mt-4 px-8 py-4 bg-pea-green text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-emerald-900/10"
                  >
                    <Cpu className="w-4 h-4" />
                    ลงทะเบียนอุปกรณ์ใหม่ทันที
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Calendar className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900 text-sm">ประวัติการใช้งาน</p>
                <p className="text-[10px] text-slate-400">View Activity Logs</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/reports')}>
              <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900 text-sm">รายงานสรุป</p>
                <p className="text-[10px] text-slate-400">View Summaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
