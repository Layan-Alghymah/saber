import { useState } from "react";
import { useLocation } from "wouter";
import { trendingNews } from "@/data/mockData";
import type { VerificationStatus } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";

const categoryStyle: Record<string, { bg: string; text: string; border: string }> = {
  البيئة:   { bg: "#ecfdf5", text: "#065f46", border: "#6ee7b7" },
  الاقتصاد: { bg: "#e8f4f9", text: "#005a7d", border: "#7dd3fc" },
  الصحة:    { bg: "#fdf2f8", text: "#9d174d", border: "#f9a8d4" },
  التقنية:  { bg: "#f5f3ff", text: "#5b21b6", border: "#c4b5fd" },
  الرياضة:  { bg: "#fff7ed", text: "#9a3412", border: "#fdba74" },
  السياسة:  { bg: "#fefce8", text: "#854d0e", border: "#fde047" },
};

function StatusBadge({ status }: { status: VerificationStatus }) {
  return status === "verified" ? (
    <span className="badge-verified inline-flex items-center gap-1 px-2.5 py-1 text-xs">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      موثوق
    </span>
  ) : (
    <span className="badge-misleading inline-flex items-center gap-1 px-2.5 py-1 text-xs">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      مضلل
    </span>
  );
}

export default function TrendingPage() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<"all" | "verified" | "misleading">("all");

  const filtered = trendingNews.filter((i) => filter === "all" ? true : i.status === filter);
  const verifiedCount = trendingNews.filter((i) => i.status === "verified").length;
  const misleadingCount = trendingNews.filter((i) => i.status === "misleading").length;

  return (
    <div className="min-h-screen bg-page flex flex-col" dir="rtl">

      {/* Header */}
      <header className="brand-header sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} theme="dark" />
          <nav className="flex items-center gap-1">
            <button onClick={() => setLocation("/")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الرئيسية</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all" style={{ background: "rgba(255,255,255,0.18)" }}>الأكثر تداولاً</button>
          </nav>
        </div>
      </header>

      {/* Page title band */}
      <div className="hero-section py-8 px-4">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-3xl font-black text-white mb-1">الأخبار الأكثر تحققًا</h1>
          <p className="text-sm text-white/60">نتائج التحقق من أبرز الأخبار المتداولة اليوم</p>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 -mt-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 animate-fade-up">
            <div className="card p-4 text-center">
              <div className="text-3xl font-black text-gray-800">{trendingNews.length}</div>
              <div className="text-xs text-slate-400 mt-1">إجمالي الأخبار</div>
            </div>
            <div className="card p-4 text-center" style={{ borderColor: "#86efac", background: "#f0fdf4" }}>
              <div className="text-3xl font-black" style={{ color: "#1a8a40" }}>{verifiedCount}</div>
              <div className="text-xs text-slate-400 mt-1">موثوق</div>
            </div>
            <div className="card p-4 text-center" style={{ borderColor: "#fca5a5", background: "#fff5f5" }}>
              <div className="text-3xl font-black" style={{ color: "#c0392b" }}>{misleadingCount}</div>
              <div className="text-xs text-slate-400 mt-1">مضلل</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 animate-fade-up delay-100">
            {(["all", "verified", "misleading"] as const).map((f) => {
              const labels = { all: "الكل", verified: "الموثوق", misleading: "المضلل" };
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={
                    active
                      ? { background: "#00719C", color: "#fff", boxShadow: "0 4px 14px rgba(0,113,156,0.3)" }
                      : { background: "#fff", border: "1.5px solid #d0e5f0", color: "#374151" }
                  }
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          {/* News list */}
          <div className="space-y-3 animate-fade-up delay-200">
            {filtered.map((item, index) => {
              const cat = categoryStyle[item.category] ?? { bg: "#f8fafc", text: "#374151", border: "#e2e8f0" };
              const confColor = item.status === "verified" ? "#1a8a40" : "#c0392b";
              const barClass = item.status === "verified" ? "bar-verified" : "bar-misleading";

              return (
                <div key={item.id} className="card card-hover p-5">
                  <div className="flex items-start gap-4">
                    {/* Index */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: "#f1f5f9", color: "#64748b" }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="text-gray-800 font-semibold leading-relaxed text-sm">{item.headline}</p>

                      <div className="flex items-center flex-wrap gap-2">
                        <StatusBadge status={item.status} />
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
                        >
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1.5 mr-auto">
                          <span className="text-xs text-slate-400">{item.date}</span>
                          <span className="text-slate-200">•</span>
                          <span className="text-xs font-black" style={{ color: confColor }}>{item.confidence}٪</span>
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100">
                        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${item.confidence}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center pt-2 animate-fade-up delay-300">
            <button
              onClick={() => setLocation("/")}
              className="btn-green inline-flex items-center gap-2 px-8 py-3 text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر جديد
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 divider mt-4">
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
