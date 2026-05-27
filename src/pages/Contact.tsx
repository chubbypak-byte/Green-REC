import React from 'react';
import { Phone, Mail, Globe, MapPin, ExternalLink } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mx-20 -my-20 opacity-5 pointer-events-none">
          <Globe className="w-96 h-96" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pea-green/10 text-pea-green text-xs font-bold uppercase tracking-widest mb-6 border border-pea-green/20">
            <Phone className="w-4 h-4" />
            <span>ติดต่อเรา</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-slate-900 mb-4">
            ช่องทางการติดต่อ PEA
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg mb-12">
            สอบถามข้อมูลเพิ่มเติมเกี่ยวกับการขึ้นทะเบียนและซื้อขายใบรับรองการผลิตพลังงานหมุนเวียน (REC)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Contacts */}
            <a href="tel:1129" className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pea-green transition-all bg-slate-50/50 flex items-start gap-5 hover:shadow-md block">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-pea-green shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PEA Call Center</p>
                <p className="text-2xl font-display font-bold text-slate-900 mb-2">1129</p>
                <p className="text-xs text-slate-500">สอบถามข้อมูลทั่วไป ตลอด 24 ชั่วโมง</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-pea-green">
                  โทรออก <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>

            {/* Email Contact */}
            <a href="mailto:contact@pea.co.th" className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pea-green transition-all bg-slate-50/50 flex items-start gap-5 hover:shadow-md block">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg font-display font-bold text-slate-900 mb-2 truncate">contact@pea.co.th</p>
                <p className="text-xs text-slate-500">สำหรับส่งเอกสารและประสานงาน</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  ส่งอีเมล <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>

            {/* Website Contact */}
            <a href="https://www.pea.co.th" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pea-green transition-all bg-slate-50/50 flex items-start gap-5 hover:shadow-md block">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Website</p>
                <p className="text-lg font-display font-bold text-slate-900 mb-2 truncate">www.pea.co.th</p>
                <p className="text-xs text-slate-500">ข้อมูลข่าวสารและบริการออนไลน์</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-600">
                  เปิดเว็บไซต์ <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>

            {/* Location */}
            <a href="https://maps.app.goo.gl/9R2oK4Y847Xb3J1h9" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pea-green transition-all bg-slate-50/50 flex items-start gap-5 hover:shadow-md block">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ที่ทำการสำนักงานใหญ่</p>
                <p className="text-sm font-bold text-slate-900 mb-2 leading-relaxed">การไฟฟ้าส่วนภูมิภาค สำนักงานใหญ่<br/>200 ถ.งามวงศ์วาน ลาดยาว จตุจักร กทม. 10900</p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-orange-500">
                  นำทางด้วยแผนที่ <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
