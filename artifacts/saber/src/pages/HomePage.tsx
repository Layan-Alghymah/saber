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
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <header
        style={{
          background: "rgba(0, 20, 35, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 113, 156, 0.3)",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} />
          <nav className="flex items-center gap-1">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: "rgba(0, 113, 156, 0.45)", border: "1px solid rgba(0, 113, 156, 0.5)" }}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              الأكثر تداولاً
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-10">
          {/* Logo Block */}
          <div className="text-center space-y-6 animate-fade-up">
            <div className="flex justify-center">
              <div
                className="p-5 rounded-3xl"
                style={{
                  background: "rgba(0, 113, 156, 0.2)",
                  border: "1.5px solid rgba(0, 113, 156, 0.4)",
                  boxShadow: "0 0 60px rgba(0, 113, 156, 0.25), 0 0 120px rgba(46, 189, 89, 0.1)",
                }}
              >
                <SaberLogo size="lg" showText={false} />
              </div>
            </div>

            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
                style={{
                  background: "rgba(46, 189, 89, 0.15)",
                  border: "1px solid rgba(46, 189, 89, 0.3)",
                  color: "#2EBD59",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2EBD59] animate-pulse inline-block" />
                منصة التحقق من الأخبار بالذكاء الاصطناعي
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
                تحقق من{" "}
                <span className="shimmer-green">الأخبار</span>
              </h1>
              <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
                الصق أي خبر أو معلومة وسيقوم سابر بالتحقق منها فورًا عبر المصادر الرسمية الموثوقة
              </p>
            </div>
          </div>

          {/* Input Card */}
          <div
            className="animate-fade-up delay-200 rounded-2xl p-6 space-y-4"
            style={{
              background: "rgba(0, 20, 40, 0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid rgba(0, 113, 156, 0.3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <label className="block text-sm font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
              الصق الخبر أو المعلومة هنا
            </label>
            <textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="مثال: أعلنت الحكومة السعودية عن إطلاق مشروع ضخم في مجال الطاقة المتجددة..."
              className="w-full h-36 rounded-xl px-4 py-3 resize-none focus:outline-none transition-all text-sm leading-relaxed text-white placeholder:text-white/30"
              style={{
                background: "rgba(0, 113, 156, 0.1)",
                border: "1.5px solid rgba(0, 113, 156, 0.25)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(46, 189, 89, 0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0, 113, 156, 0.25)")}
              dir="rtl"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {newsText.length} حرف
              </span>
              <button
                onClick={handleVerify}
                disabled={!newsText.trim()}
                className="btn-green flex items-center gap-2 px-8 py-3 rounded-xl text-base"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                تحقق
              </button>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-3 gap-3 animate-fade-up delay-400">
            {[
              { icon: "🔍", label: "تحقق فوري", sub: "نتائج خلال ثوانٍ" },
              { icon: "📡", label: "مصادر رسمية", sub: "واس والجهات الحكومية" },
              { icon: "🛡️", label: "دقة عالية", sub: "نسبة ثقة دقيقة" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl p-4 text-center space-y-1"
                style={{
                  background: "rgba(0, 113, 156, 0.12)",
                  border: "1px solid rgba(0, 113, 156, 0.22)",
                }}
              >
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="text-xs font-bold text-white">{f.label}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs" style={{ color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(0,113,156,0.15)" }}>
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
