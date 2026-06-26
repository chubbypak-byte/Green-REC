import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  History, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  Zap,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const AssetHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { globalData } = useAppContext();
  const asset = globalData.assets.find(a => a.id === id);

  const monthlyData = asset?.monthlyData || [];

  const totalProduction = monthlyData.reduce((sum, item) => sum + item.production, 0);
  const totalSold = monthlyData.reduce((sum, item) => sum + item.sold, 0);
  const totalRevenue = totalSold * 9;

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-400">ไม่พบข้อมูลอุปกรณ์</h2>
        <button onClick={() => navigate('/producers')} className="text-pea-green font-bold text-lg">กลับไปหน้าผู้ผลิต</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/assets/${asset.id}`)}
            className="p-3 bg-white rounded-xl text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">ประวัติอุปกรณ์</h1>
            <p className="text-slate-500 font-medium">{asset.name} • {asset.meterId}</p>
          </div>
        </div>
        <div className="flex bg-white p-1.5 border border-slate-100 rounded-2xl shadow-sm">
            <span className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest">6 Months View</span>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 text-pea-green rounded-xl">
                 <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ผลิตสะสม (Total Gen)</span>
           </div>
           <p className="text-3xl font-display font-bold text-slate-900">{totalProduction.toLocaleString()} <span className="text-sm font-sans text-slate-400">kWh</span></p>
           <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-bold">+8%</span> จากช่วงเวลาที่แล้ว
           </p>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                 <ArrowUpRight className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ขายสะสม (Total Sold)</span>
           </div>
           <p className="text-3xl font-display font-bold text-slate-900">{totalSold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })} <span className="text-sm font-sans text-slate-400">RECs</span></p>
           <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <span className="text-slate-400 font-bold tracking-tight">Efficiency: 83.5%</span>
           </p>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-purple-50 text-purple-500 rounded-xl">
                 <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">รายได้รวม (Total Revenue)</span>
           </div>
           <p className="text-3xl font-display font-bold text-slate-900">฿{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
           <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">Avg: ฿9 / REC</span>
           </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
         >
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-display font-bold text-slate-900">กราฟการผลิตย้อนหลัง (kWh)</h3>
               <BarChart3 className="w-5 h-5 text-slate-300" />
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="production" stroke="#2e7d32" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
         >
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-display font-bold text-slate-900">สัดส่วนการขายและรายได้</h3>
               <DollarSign className="w-5 h-5 text-slate-300" />
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sold" name="RECs Sold" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </motion.div>
      </div>

      {/* History Table */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900">ตารางประวัติการผลิตไฟฟ้ารายเดือน</h3>
        <div className="overflow-hidden border border-slate-50 rounded-2xl">
           <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เดือน</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-pea-green">ผลิตได้ (kWh)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-blue-500">ผลิตได้ (REC)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-purple-500">ขายแล้ว (REC)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600">มูลค่า (THB)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">สถานะ</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">วันที่ขายสำเร็จ</th>
                 </tr>
              </thead>
              <tbody>
                 {[...monthlyData].reverse().map((data, idx) => (
                    <tr key={idx} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                       <td className="px-6 py-5 font-bold text-slate-700">{data.month} {data.year}</td>
                       <td className="px-6 py-5 text-pea-green font-bold">{data.production.toLocaleString()}</td>
                       <td className="px-6 py-5 text-blue-500 font-bold">{(data.production / 1000).toFixed(3)}</td>
                       <td className="px-6 py-5 font-medium text-slate-600">{data.sold > 0 ? data.sold.toFixed(3) : '-'}</td>
                       <td className="px-6 py-5 text-emerald-600 font-bold">฿{(data.sold * 9).toFixed(2)}</td>
                       <td className="px-6 py-5 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${data.status === 'ขายสำเร็จ' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                             {data.status}
                          </span>
                       </td>
                       <td className="px-6 py-5 text-right font-medium text-slate-500">{data.date}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};
