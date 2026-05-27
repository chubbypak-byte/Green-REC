import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Zap, 
  Award, 
  Banknote, 
  Leaf, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_DATA } from '../constants';

const data = GLOBAL_DATA.chartData;

const KPICard = ({ title, value, unit, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:scale-110 transition-transform`}></div>
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-xl bg-${color}-100 text-${color}-600`}>
        <Icon className="w-5 h-5" />
      </div>
      {change && (
        <div className={`flex items-center text-[10px] font-bold ${change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-2xl font-display font-bold text-slate-900">{value}</h3>
        <span className="text-sm text-slate-400 font-medium">{unit}</span>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ label, value, status, max }: { label: string, value: number, status: string, max: number }) => {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'verify': return 'bg-amber-400';
      case 'selling': return 'bg-emerald-500';
      case 'sold': return 'bg-pea-green';
      case 'offset': return 'bg-slate-400';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-bold text-slate-400">{value.toLocaleString()} หน่วย (kWh)</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${getStatusColor(status)} rounded-full`}
        />
      </div>
    </div>
  );
};

export const Overview = () => {
  const navigate = useNavigate();

  // Use data from GLOBAL_DATA
  const userInfo = {
    name: GLOBAL_DATA.user.name,
    id: GLOBAL_DATA.user.id,
    email: GLOBAL_DATA.user.email,
    assetCount: GLOBAL_DATA.assets.length,
    location: GLOBAL_DATA.user.location,
    houseNo: GLOBAL_DATA.user.houseNo,
    inverterCount: GLOBAL_DATA.assets.length
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">ภาพรวมโปรไฟล์</h1>
          <p className="text-slate-500">ยินดีต้อนรับกลับมา, ข้อมูลสถานะและโปรไฟล์ปัจจุบันของคุณ 🌿</p>
        </div>
      </div>

      {/* Profile & General Information Card */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 divide-y divide-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div className="flex flex-col gap-1 min-w-0">
             <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <UserCircle className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">ชื่อผู้ใช้ไฟฟ้า</span>
             </div>
             <span className="text-lg font-bold text-slate-900 truncate" title={userInfo.name}>{userInfo.name}</span>
             <span className="text-xs font-medium text-pea-green bg-emerald-50 w-fit px-2 py-0.5 rounded-md mt-1">{GLOBAL_DATA.user.role}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">เลขประจำตัว</span>
             <span className="text-lg font-bold text-slate-900 truncate" title={userInfo.id}>{userInfo.id}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ติดต่อ</span>
             <span className="text-lg font-bold text-slate-900 truncate">{userInfo.email}</span>
             <span className="text-sm font-medium text-slate-500">{GLOBAL_DATA.user.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">จำนวนอุปกรณ์ (Asset)</span>
             <div className="flex items-center gap-2">
               <span className="text-lg font-bold text-slate-900">{userInfo.assetCount} รายการ</span>
               {userInfo.assetCount > 0 && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
             </div>
          </div>
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">จำนวน Inverter</span>
             <span className="text-lg font-bold text-slate-900">{userInfo.inverterCount} เครื่อง</span>
          </div>
        </div>

        <div className="pt-8">
            <h4 className="text-sm font-bold text-slate-900 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">ข้อมูลและระยะเวลาสัญญาอุปกรณ์ (5 ปี)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {GLOBAL_DATA.assets.map(asset => {
                  const codDate = new Date(asset.techSpec.cod);
                  const endDate = new Date(codDate);
                  endDate.setFullYear(endDate.getFullYear() + 5);
                  
                  return (
                    <div key={asset.id} className="bg-slate-50 p-4 rounded-2xl flex items-start justify-between border border-slate-100">
                       <div>
                          <p className="text-sm font-bold text-slate-900 mb-1">{asset.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">{asset.meterId}</p>
                          <a 
                             href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(userInfo.houseNo + ' ' + asset.location)}`}
                             target="_blank"
                             rel="noopener noreferrer" 
                             className="text-xs text-slate-600 mb-4 flex items-center gap-1.5 hover:text-pea-green transition-colors"
                          >
                             <MapPin className="w-3 h-3" />บ้านเลขที่ {userInfo.houseNo} {asset.location}
                          </a>
                          <div className="flex gap-4">
                             <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">วันที่เริ่มสัญญา (SCOD)</span>
                                <span className="text-xs font-semibold text-slate-700">{codDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                             </div>
                             <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">วันที่สิ้นสุดสัญญา</span>
                                <span className="text-xs font-semibold text-pea-green">{endDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  );
               })}
            </div>
        </div>

        <div className="pt-8">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pea-green shadow-sm">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-900">ตัวตนได้รับการยืนยันแล้ว (Identity Verified)</p>
                     <p className="text-[10px] text-slate-500">สมัครสมาชิกเมื่อ: {GLOBAL_DATA.user.joinDate}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">Online</div>
                  <button onClick={() => navigate('/registration?mode=edit')} className="text-xs font-bold text-pea-green hover:underline ml-4">แก้ไขที่อยู่</button>
               </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">การผลิตพลังงานย้อนหลัง 6 เดือน</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-semibold text-slate-400">หน่วย: kWh</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="energy" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#0F6E56' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2">สถานะ REC (Units Status)</h3>
          <p className="text-xs text-slate-400 mb-8 font-medium">ภาพรวมการถือครองใบรับรองทั้งหมดของคุณ</p>
          
          <div className="space-y-6 flex-1">
            <ProgressBar label="รอการ Verify (เดือนล่าสุด)" value={1965} status="verify" max={10000} />
            <ProgressBar label="รอการขาย (คงเหลือ)" value={35} status="selling" max={10000} />
            <ProgressBar label="ขายแล้วสะสม" value={9170} status="sold" max={10000} />
            <ProgressBar label="ใช้เพื่อชดเชยตนเอง" value={0} status="offset" max={10000} />
          </div>

          <button className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs hover:bg-slate-100 transition-colors uppercase tracking-widest">
            ดูรายละเอียดทั้งหมด
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
