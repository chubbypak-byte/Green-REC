import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sun, 
  Wind, 
  Waves, 
  Flame, 
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Zap,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOBAL_DATA } from '../constants';

const offers = [
  { id: 'REC-001', seller: 'Solar Farm Alpha', type: 'Solar', price: 120, amount: 2500, region: 'ภาคตะวันออก' },
  { id: 'REC-002', seller: 'Wind Park Beta', type: 'Wind', price: 145, amount: 1200, region: 'ภาคเหนือ' },
  { id: 'REC-003', seller: 'Hydro Power Gamma', type: 'Hydro', price: 95, amount: 5000, region: 'ภาคใต้' },
  { id: 'REC-004', seller: 'Biomass Energy Delta', type: 'Biomass', price: 110, amount: 3500, region: 'ภาคกลาง' },
  { id: 'REC-005', seller: 'Sunny Roof Theta', type: 'Solar', price: 130, amount: 450, region: 'กรุงเทพฯ' },
];

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Solar': return <Sun className="w-4 h-4 text-amber-500" />;
    case 'Wind': return <Wind className="w-4 h-4 text-blue-400" />;
    case 'Hydro': return <Waves className="w-4 h-4 text-cyan-500" />;
    case 'Biomass': return <Flame className="w-4 h-4 text-orange-500" />;
    default: return null;
  }
};

export const Market = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState('125');

  const myRecBalance = GLOBAL_DATA.stats.recBalance;
  const myAssets = GLOBAL_DATA.assets;

  const handleBuy = (id: string) => {
    setBuyingId(id);
    setTimeout(() => {
      setBuyingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setSellAmount('');
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleListNow = (amount: number) => {
    setActiveTab('sell');
    setSellAmount(amount.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">ตลาดซื้อขาย (REC Marketplace)</h1>
          <p className="text-slate-500">ศูนย์กลางการจับคู่ซื้อขายใบรับรองพลังงานหมุนเวียนมาตรฐาน I-REC</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-[22px] border border-slate-200">
          <button 
            onClick={() => setActiveTab('buy')}
            className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'buy' 
                ? 'bg-white text-pea-green shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Buy REC
          </button>
          <button 
            onClick={() => setActiveTab('sell')}
            className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'sell' 
                ? 'bg-pea-green text-white shadow-lg shadow-emerald-900/20' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Sell REC
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'buy' ? (
          <motion.div 
            key="buy-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Buy Filter and Table */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                   <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="ค้นหาโครงการ, ภูมิภาค หรือประเภท..." 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pea-green/20 border-none"
                      />
                   </div>
                   <button className="flex items-center gap-2 px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                      <Filter className="w-4 h-4" />
                      กรองผลลัพธ์
                   </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 px-4 py-2 border border-slate-100 rounded-xl">
                   <ArrowUpDown className="w-3 h-3" />
                   SORT BY: LOWEST PRICE
                </div>
              </div>

              <div className="overflow-hidden border border-slate-50 rounded-3xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">โครงการ / ผู้ขาย</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">แหล่งพลังงาน</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-pea-green">ราคา (THB/REC)</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">จำนวนประกาศ</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ภูมิภาค</th>
                      <th className="px-8 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => (
                      <tr key={offer.id} className="border-t border-slate-50 hover:bg-emerald-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-400 group-hover:bg-white group-hover:text-pea-green transition-all shadow-sm">
                              {offer.seller[0]}
                            </div>
                            <div>
                               <p className="font-bold text-slate-800 text-sm leading-none mb-1">{offer.seller}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Seller</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-[10px] font-bold group-hover:bg-white border border-transparent group-hover:border-slate-100">
                            <TypeIcon type={offer.type} />
                            {offer.type.toUpperCase()}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xl font-display font-bold text-pea-green">฿{offer.price}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-600">{offer.amount.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal ml-1 uppercase">RECs</span></span>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-500 font-bold uppercase tracking-tight">{offer.region}</td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => handleBuy(offer.id)}
                            disabled={buyingId !== null}
                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-pea-green transition-all shadow-lg shadow-black/10 disabled:opacity-50"
                          >
                            {buyingId === offer.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Matching...
                              </div>
                            ) : (
                              'Purchase'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-pea-green/20 rounded-full blur-3xl -mr-40 -mt-40 transition-all duration-700 group-hover:scale-110"></div>
                  <div className="relative z-10 space-y-6">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-pea-green">
                       <ArrowUpDown className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-display font-bold leading-tight">Matching Engine ประสิทธิภาพสูง</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                        เชื่อมต่อผู้ซื้อรายใหญ่ (Enterprise) กับผู้ผลิตรายย่อยได้ทันที 
                        รองรับการทำ Smart Contract บนระบบบล็อกเชนเพื่อความโปร่งใสสูงสุด
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                        <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-pea-green/20"></div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-pea-green uppercase tracking-widest">+500 Companies trading</p>
                    </div>
                  </div>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-display font-bold text-slate-900">ราคาเฉลี่ยตามประเภท</h4>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update: Now</div>
                  </div>
                  <div className="space-y-6">
                      {[
                        { type: 'Solar', price: '120-135', trend: 'up' },
                        { type: 'Wind', price: '140-155', trend: 'down' },
                        { type: 'Hydro', price: '90-110', trend: 'stable' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                 <TypeIcon type={item.type} />
                              </div>
                              <span className="font-bold text-slate-700">{item.type}</span>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-slate-900">฿{item.price}</p>
                              <p className={`text-[9px] font-bold uppercase ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-400'}`}>
                                Trend: {item.trend}
                              </p>
                           </div>
                        </div>
                      ))}
                  </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="sell-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Sell Form and Inventory */}
            <div className="lg:col-span-2 space-y-8">
               {/* Wallet Card */}
               <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-pea-green text-white rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-900/10">
                       <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ยอดใบรับรองที่พร้อมขาย (Available REC)</p>
                       <p className="text-4xl font-display font-bold text-slate-900">
                         {myRecBalance.toLocaleString()} <span className="text-lg text-slate-300 font-normal font-sans ml-1">RECs</span>
                       </p>
                    </div>
                  </div>
                  <div className="hidden md:block px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-center">Value Estimate</p>
                     <p className="text-lg font-bold text-emerald-700">฿{(myRecBalance * 125).toLocaleString()}</p>
                  </div>
               </div>

               {/* Inventory List */}
               <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-slate-900">คลังพัสดุพลังงานของคุณ (Energy Inventory)</h2>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Total Assets: {myAssets.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {myAssets.map(asset => (
                        <div key={asset.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-pea-green hover:bg-white transition-all group">
                           <div className="flex justify-between items-start mb-6">
                              <div className="p-3 bg-white rounded-xl shadow-sm text-pea-green group-hover:bg-pea-green group-hover:text-white transition-all">
                                 <Zap className="w-5 h-5" />
                              </div>
                              <div className="text-right">
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Device ID</p>
                                 <p className="text-[10px] font-mono text-slate-600">{asset.meterId}</p>
                              </div>
                           </div>
                           <h4 className="text-lg font-bold text-slate-900 mb-1">{asset.name}</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">{asset.type} • {asset.location}</p>
                           <div className="flex items-end justify-between">
                              <div>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unlisted REC</p>
                                 <p className="text-xl font-bold text-pea-green">{Math.floor(asset.production / 10).toLocaleString()} <span className="text-xs font-normal text-slate-400">RECs</span></p>
                              </div>
                              <button 
                                onClick={() => handleListNow(Math.floor(asset.production / 10))}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-pea-green transition-all"
                              >
                                 List Now
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               {/* Quick Sell Form */}
               <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-8">
                  <div>
                    <h3 className="text-xl font-display font-bold">ประกาศขายด่วน (Quick Listing)</h3>
                    <p className="text-xs text-slate-400 mt-2">กำหนดจำนวนและราคาตลาดเพื่อสร้าง Matching ทันที</p>
                  </div>
                  
                  <form onSubmit={handleCreateOffer} className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">จำนวนที่ต้องการขาย (RECs)</label>
                        <div className="relative">
                           <input 
                              type="number" 
                              value={sellAmount}
                              onChange={(e) => setSellAmount(e.target.value)}
                              placeholder="เช่น 500"
                              className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-white text-lg font-bold focus:ring-2 focus:ring-pea-green/30"
                           />
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white/10 rounded-md text-[8px] font-bold uppercase">RECs</div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">ราคาต่อหน่วย (THB/REC)</label>
                        <div className="relative">
                           <input 
                              type="number" 
                              value={sellPrice}
                              onChange={(e) => setSellPrice(e.target.value)}
                              className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-white text-lg font-bold focus:ring-2 focus:ring-pea-green/30"
                           />
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-pea-green rounded-md text-[8px] font-bold uppercase">THB</div>
                        </div>
                        <div className="flex items-center justify-between px-1">
                           <span className="text-[10px] text-slate-500">Suggested: ฿122 - ฿128</span>
                           <span className="text-[10px] text-pea-green font-bold">Recommended</span>
                        </div>
                     </div>

                     <div className="pt-4">
                        <button 
                           disabled={!sellAmount}
                           type="submit"
                           className="w-full py-5 bg-pea-green text-white rounded-[24px] font-bold text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/40 hover:bg-emerald-400 active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale"
                        >
                           เปิดประกาศขาย (Post Listing)
                        </button>
                     </div>
                  </form>

                  <div className="bg-white/5 p-5 rounded-2xl flex items-start gap-4">
                     <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                     <p className="text-[10px] text-slate-400 leading-relaxed italic">
                        * ระบบจะหักค่าธรรมเนียม Matching Fee 1.5% เมื่อการขายสำเร็จ และเงินจะถูกโอนเข้าบัญชีที่ผูกไว้กับ PEA ทันที
                     </p>
                  </div>
               </div>

               <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-pea-green shadow-sm">
                     <Award className="w-7 h-7" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">ตลาดพรีเมียม (I-REC Standard)</p>
                     <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                        ใบรับรองของคุณได้รับรองมาตรฐานสากล สามารถขายให้กับองค์กรข้ามชาติที่มองหา RECs คุณภาพสูงในประเทศไทย
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-12 right-12 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl flex items-center gap-5 z-[100] border border-white/10"
          >
            <div className="w-12 h-12 bg-pea-green rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/20">
               <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight">ดำเนินการสำเร็จ!</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Your order has been processed.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
