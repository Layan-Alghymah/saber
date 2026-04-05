import { useState } from "react";
import { useLocation } from "wouter";
import { trendingNews } from "@/data/mockData";
import type { VerificationStatus } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

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
  const { isDark } = useTheme();

  const filtered = trendingNews.filter((i) => filter === "all" ? true : i.status === filter);
  const verifiedCount = trendingNews.filter((i) => i.status === "verified").length;
  const misleadingCount = trendingNews.filter((i) => i.status === "misleading").length;

  const categoryColors: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string }> = {
    البيئة:   { bg: "#ecfdf5", text: "#065f46", border: "#6ee7b7", darkBg: "rgba(16,185,129,0.12)", darkText: "#34d399", darkBorder: "rgba(52,211,153,0.3)" },
    الاقتصاد: { bg: "#e8f4f9", text: "#005a7d", border: "#7dd3fc", darkBg: "rgba(0,113,156,0.15)", darkText: "#38bdf8", darkBorder: "rgba(56,189,248,0.3)" },
    الصحة:    { bg: "#fdf2f8", text: "#9d174d", border: "#f9a8d4", darkBg: "rgba(236,72,153,0.12)", darkText: "#f472b6", darkBorder: "rgba(244,114,182,0.3)" },
    التقنية:  { bg: "#f5f3ff", text: "#5b21b6", border: "#c4b5fd", darkBg: "rgba(139,92,246,0.12)", darkText: "#a78bfa", darkBorder: "rgba(167,139,250,0.3)" },
    الرياضة:  { bg: "#fff7ed", text: "#9a3412", border: "#fdba74", darkBg: "rgba(249,115,22,0.12)", darkText: "#fb923c", darkBorder: "rgba(251,146,60,0.3)" },
    السياسة:  { bg: "#fefce8", text: "#854d0e", border: "#fde047", darkBg: "rgba(234,179,8,0.12)", darkText: "#facc15", darkBorder: "rgba(250,204,21,0.3)" },
  };

  return (
    <div className="min-h-screen bg-page flex flex-col" dir="rtl">

      {/* Header */}
      <header className="brand-header sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} theme="dark" />
          <nav className="flex items-center gap-1.5">
            <button onClick={() => setLocation("/")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الرئيسية</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all" style={{ background: "rgba(255,255,255,0.18)" }}>الأكثر تداولاً</button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero band */}
      <div className="hero-section py-8 px-4">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-3xl font-black text-white mb-1">الأخبار الأكثر تحققًا</h1>
          <p className="text-sm" style={{ color: "var(--c-hero-text)" }}>نتائج التحقق من أبرز الأخبار المتداولة اليوم</p>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 -mt-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 animate-fade-up">
            <div className="card p-4 text-center">
              <div className="text-3xl font-black" style={{ color: "var(--c-text-1)" }}>{trendingNews.length}</div>
              <div className="text-xs mt-1" style={{ color: "var(--c-text-muted)" }}>إجمالي الأخبار</div>
            </div>
            <div
              className="card p-4 text-center"
              style={{
                borderColor: isDark ? "rgba(46,189,89,0.3)" : "#86efac",
                background: isDark ? "rgba(46,189,89,0.08)" : "#f0fdf4",
              }}
            >
              <div className="text-3xl font-black" style={{ color: isDark ? "#4ade80" : "#1a8a40" }}>{verifiedCount}</div>
              <div className="text-xs mt-1" style={{ color: "var(--c-text-muted)" }}>موثوق</div>
            </div>
            <div
              className="card p-4 text-center"
              style={{
                borderColor: isDark ? "rgba(239,68,68,0.3)" : "#fca5a5",
                background: isDark ? "rgba(239,68,68,0.08)" : "#fff5f5",
              }}
            >
              <div className="text-3xl font-black" style={{ color: isDark ? "#f87171" : "#c0392b" }}>{misleadingCount}</div>
              <div className="text-xs mt-1" style={{ color: "var(--c-text-muted)" }}>مضلل</div>
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
                      : {
                          background: "var(--c-filter-bg)",
                          border: `1.5px solid var(--c-filter-border)`,
                          color: "var(--c-filter-color)",
                        }
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
              const cat = categoryColors[item.category];
              const confColor = item.status === "verified"
                ? isDark ? "#4ade80" : "#1a8a40"
                : isDark ? "#f87171" : "#c0392b";
              const barClass = item.status === "verified" ? "bar-verified" : "bar-misleading";

              return (
                <div
                  key={item.id}
                  className="card p-5 transition-all duration-200"
                  style={{ cursor: "default" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border-hover)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px var(--c-shadow-hover)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9", color: "var(--c-text-muted)" }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="font-semibold leading-relaxed text-sm" style={{ color: "var(--c-text-1)" }}>
                        {item.headline}
                      </p>

                      <div className="flex items-center flex-wrap gap-2">
                        <StatusBadge status={item.status} />
                        {cat && (
                          <span
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={
                              isDark
                                ? { background: cat.darkBg, color: cat.darkText, border: `1px solid ${cat.darkBorder}` }
                                : { background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }
                            }
                          >
                            {item.category}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 mr-auto">
                          <span className="text-xs" style={{ color: "var(--c-text-muted)" }}>{item.date}</span>
                          <span style={{ color: "var(--c-border)" }}>•</span>
                          <span className="text-xs font-black" style={{ color: confColor }}>{item.confidence}٪</span>
                        </div>
                      </div>

                      <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}
                      >
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
            <button onClick={() => setLocation("/")} className="btn-green inline-flex items-center gap-2 px-8 py-3 text-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر جديد
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs divider mt-4" style={{ color: "var(--c-text-muted)" }}>
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
