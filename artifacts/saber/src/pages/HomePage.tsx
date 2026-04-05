import { useState } from "react";
import { useLocation } from "wouter";
import { simulateVerification } from "@/data/mockData";
import type { VerificationResult } from "@/data/mockData";

interface HomePageProps {
  onResult: (result: VerificationResult, text: string) => void;
}

export default function HomePage({ onResult }: HomePageProps) {
  const [newsText, setNewsText] = useState("");
  const [, setLocation] = useLocation();

  const handleVerify = () => {
    if (!newsText.trim()) return;
    setLocation("/loading");
    setTimeout(() => {
      const result = simulateVerification(newsText);
      onResult(result, newsText);
      setLocation("/result");
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground tracking-wide">سابر</span>
          </div>
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setLocation("/")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 transition-all"
            >
              الرئيسية
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
            >
              الأكثر تداولاً
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl space-y-10 animate-fade-up">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-medium mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block"></span>
              منصة التحقق من الأخبار بالذكاء الاصطناعي
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              هل هذا الخبر{" "}
              <span className="shimmer-text">حقيقي؟</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
              الصق أي خبر أو معلومة وسيقوم سابر بالتحقق منها فورًا عبر المصادر الرسمية الموثوقة
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <label className="block text-sm font-medium text-muted-foreground">
              الصق الخبر هنا
            </label>
            <textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="مثال: تم الإعلان عن إطلاق مشروع ضخم في مجال الطاقة المتجددة بالمملكة العربية السعودية..."
              className="w-full h-40 bg-background/60 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base leading-relaxed"
              dir="rtl"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground/60">
                {newsText.length} حرف
              </span>
              <button
                onClick={handleVerify}
                disabled={!newsText.trim()}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                تحقق
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: "🔍", label: "تحقق فوري", desc: "نتائج خلال ثوانٍ" },
              { icon: "📡", label: "مصادر رسمية", desc: "واس والجهات الحكومية" },
              { icon: "🛡️", label: "دقة عالية", desc: "نسبة ثقة واضحة" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-4 space-y-1">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
