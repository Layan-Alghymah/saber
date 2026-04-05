import { useState } from "react";
import { useLocation } from "wouter";
import { simulateVerification } from "@/data/mockData";
import type { VerificationResult } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";

interface HomePageProps {
  onResult: (result: VerificationResult, text: string) => void;
}

export default function HomePage({ onResult }: HomePageProps) {
  const [newsText, setNewsText] = useState("");
  const [, setLocation] = useLocation();

  const handleVerify = () => {
    if (!newsText.trim()) return;
    const result = simulateVerification(newsText);
    onResult(result, newsText);
    setLocation("/loading");
  };

  return (
    <div className="min-h-screen flex flex-col bg-page" dir="rtl">

      {/* ── Header (dark brand) ── */}
      <header className="brand-header sticky top-0 z-50 shadow-md">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} theme="dark" />
          <nav className="flex items-center gap-1">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              الأكثر تداولاً
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero (dark blue) ── */}
      <section className="hero-section py-14 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5 animate-fade-up">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div
              className="p-5 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 60px rgba(46,189,89,0.2)",
              }}
            >
              <SaberLogo size="lg" showText={false} />
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "rgba(46,189,89,0.18)",
              border: "1px solid rgba(46,189,89,0.4)",
              color: "#7fe6a8",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EBD59] animate-pulse inline-block" />
            منصة التحقق من الأخبار بالذكاء الاصطناعي
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            تحقق من{" "}
            <span className="shimmer-green">الأخبار</span>
          </h1>
          <p className="text-base text-white/65 leading-relaxed max-w-md mx-auto">
            الصق أي خبر أو معلومة وسيقوم سابر بالتحقق منها فورًا عبر المصادر الرسمية الموثوقة
          </p>
        </div>
      </section>

      {/* ── Input Card (white, floats below hero) ── */}
      <section className="px-4 -mt-6 pb-8">
        <div className="max-w-2xl mx-auto animate-fade-up delay-100">
          <div className="card p-6 space-y-4">
            <label className="block text-sm font-semibold" style={{ color: "#374151" }}>
              الصق الخبر أو المعلومة هنا
            </label>
            <textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="مثال: أعلنت الحكومة السعودية عن إطلاق مشروع ضخم في مجال الطاقة المتجددة..."
              className="input-text w-full h-36 px-4 py-3 resize-none text-sm leading-relaxed"
              dir="rtl"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {newsText.length} حرف
              </span>
              <button
                onClick={handleVerify}
                disabled={!newsText.trim()}
                className="btn-green flex items-center gap-2 px-8 py-3 text-base"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                تحقق
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4 animate-fade-up delay-200">
          {[
            { icon: "🔍", label: "تحقق فوري", sub: "نتائج خلال ثوانٍ" },
            { icon: "📡", label: "مصادر رسمية", sub: "واس والجهات الحكومية" },
            { icon: "🛡️", label: "دقة عالية", sub: "نسبة ثقة دقيقة" },
          ].map((f) => (
            <div key={f.label} className="card p-4 text-center space-y-1.5">
              <div className="text-2xl">{f.icon}</div>
              <div className="text-xs font-bold text-gray-700">{f.label}</div>
              <div className="text-xs text-slate-400">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto py-4 text-center text-xs text-slate-400 divider">
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
