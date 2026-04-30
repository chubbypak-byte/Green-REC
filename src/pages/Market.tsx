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
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBuy = (id: string) => {
    setBuyingId(id);
    setTimeout(() => {
      setBuyingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">REC Marketplace</h1>
          <p className="text-slate-500">จับคู่ซื้อขายใบรับรองพลังงานหมุนเวียนด้วย Matching Engine อัจฉริยะ</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-4 py-2 bg-pea-green text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Buy REC</button>
          <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest hover:text-pea-green transition-all">Sell REC</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาชื่อผู้ขาย, ประเภท..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pea-green/20 border-none"
                />
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all border-none">
                <Filter className="w-4 h-4" />
                ตัวกรอง
             </button>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-4 py-2 bg-slate-50 rounded-lg">
             <ArrowUpDown className="w-3 h-3" />
             เรียงตาม: ราคา (ต่ำไปสูง)
          </div>
        </div>

        <div className="overflow-hidden border border-slate-50 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ผู้ขาย (Seller)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ประเภท (Type)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ราคา/หน่วย (Price)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">จำนวนเหลือ (Amount)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ภูมิภาค (Region)</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-t border-slate-50 hover:bg-emerald-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:bg-white group-hover:text-pea-green transition-all">
                        {offer.seller[0]}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{offer.seller}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold group-hover:bg-white">
                      <TypeIcon type={offer.type} />
                      {offer.type}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-display font-bold text-pea-green">฿{offer.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-slate-600">{offer.amount.toLocaleString()} Units</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400 font-medium">{offer.region}</td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleBuy(offer.id)}
                      disabled={buyingId !== null}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-pea-green transition-all shadow-sm disabled:opacity-50"
                    >
                      {buyingId === offer.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Matching...
                        </>
                      ) : (
                        'ซื้อ (Buy Now)'
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
         <div className="bg-pea-green rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col h-full">
               <h4 className="text-xl font-display font-bold mb-4">Matching Engine อัจฉริยะ</h4>
               <p className="text-emerald-100/70 text-sm mb-8 leading-relaxed">
                  ระบบของเราจะช่วยจับคู่ข้อเสนอขายที่ดีที่สุดให้กับคุณโดยอัตโนมัติ 
                  เพื่อให้ได้ราคาตลาดที่ยุติธรรมและตรงตามเงื่อนไข ESG ขององค์กรคุณ
               </p>
               <div className="mt-auto flex items-center gap-4">
                  <div className="flex -space-x-2">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-emerald-700 border-2 border-pea-green"></div>
                     ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-200">24+ Enterprise matched today</span>
               </div>
            </div>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col shadow-sm">
            <h4 className="text-xl font-display font-bold text-slate-900 mb-6">ความเคลื่อนไหวมูลค่า REC</h4>
            <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <div className="flex flex-col items-center gap-3 text-slate-400">
                  <AlertCircle className="w-8 h-8 opacity-20" />
                  <p className="text-xs font-bold tracking-widest uppercase">Live Market Data loading...</p>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-24 right-8 bg-pea-green text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[60] border border-emerald-400"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            <div>
              <p className="text-sm font-bold">ดำเนินการจับคู่สำเร็จ!</p>
              <p className="text-[10px] opacity-70">ใบรับรองของคุณถูกส่งไปรอการ Verify เรียบร้อยแล้ว</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
