import { useState } from "react";
import { useLocation } from "wouter";
import { trendingNews } from "@/data/mockData";
import type { VerificationStatus } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  البيئة:     { bg: "rgba(16,185,129,0.12)", text: "#10b981", border: "rgba(16,185,129,0.3)" },
  الاقتصاد:  { bg: "rgba(0,113,156,0.15)", text: "#38bdf8", border: "rgba(0,113,156,0.35)" },
  الصحة:     { bg: "rgba(236,72,153,0.12)", text: "#f472b6", border: "rgba(236,72,153,0.3)" },
  التقنية:   { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)" },
  الرياضة:   { bg: "rgba(249,115,22,0.12)", text: "#fb923c", border: "rgba(249,115,22,0.3)" },
  السياسة:   { bg: "rgba(234,179,8,0.12)", text: "#fbbf24", border: "rgba(234,179,8,0.3)" },
};

function StatusBadge({ status }: { status: VerificationStatus }) {
  if (status === "verified") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
        style={{ background: "rgba(46,189,89,0.15)", border: "1px solid rgba(46,189,89,0.35)", color: "#2EBD59" }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        موثوق
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
      style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      مضلل
    </span>
  );
}

export default function TrendingPage() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<"all" | "verified" | "misleading">("all");

  const filtered = trendingNews.filter((item) =>
    filter === "all" ? true : item.status === filter
  );

  const verifiedCount = trendingNews.filter((i) => i.status === "verified").length;
  const misleadingCount = trendingNews.filter((i) => i.status === "misleading").length;

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
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} />
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setLocation("/")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              الرئيسية
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "rgba(0,113,156,0.45)", border: "1px solid rgba(0,113,156,0.5)" }}
            >
              الأكثر تداولاً
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Page Title */}
          <div className="animate-fade-up">
            <h1 className="text-3xl font-black text-white mb-1">الأخبار الأكثر تحققًا</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              نتائج التحقق من أبرز الأخبار المتداولة اليوم
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 animate-fade-up delay-100">
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(0,113,156,0.15)", border: "1px solid rgba(0,113,156,0.25)" }}
            >
              <div className="text-3xl font-black text-white">{trendingNews.length}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>إجمالي الأخبار</div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(46,189,89,0.12)", border: "1px solid rgba(46,189,89,0.25)" }}
            >
              <div className="text-3xl font-black" style={{ color: "#2EBD59" }}>{verifiedCount}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>موثوق</div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
            >
              <div className="text-3xl font-black" style={{ color: "#f87171" }}>{misleadingCount}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>مضلل</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 animate-fade-up delay-200">
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
                      ? { background: "#00719C", color: "#fff", boxShadow: "0 4px 16px rgba(0,113,156,0.4)" }
                      : { background: "rgba(0,113,156,0.12)", border: "1px solid rgba(0,113,156,0.2)", color: "rgba(255,255,255,0.6)" }
                  }
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          {/* News List */}
          <div className="space-y-3 animate-fade-up delay-300">
            {filtered.map((item, index) => {
              const cat = categoryColors[item.category] ?? { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.15)" };
              const confidenceColor = item.status === "verified" ? "#2EBD59" : "#f87171";
              const barColor = item.status === "verified"
                ? "linear-gradient(90deg, #00719C, #2EBD59)"
                : "linear-gradient(90deg, #991b1b, #ef4444)";

              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(0,20,40,0.55)",
                    border: "1px solid rgba(0,113,156,0.2)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,113,156,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,113,156,0.2)")}
                >
                  <div className="flex items-start gap-4">
                    {/* Index */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: "rgba(0,113,156,0.2)", color: "rgba(255,255,255,0.5)" }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="text-white font-semibold leading-relaxed text-sm">
                        {item.headline}
                      </p>

                      {/* Tags Row */}
                      <div className="flex items-center flex-wrap gap-2">
                        <StatusBadge status={item.status} />
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
                        >
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1.5 mr-auto">
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.date}</span>
                          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                          <span className="text-xs font-black" style={{ color: confidenceColor }}>
                            {item.confidence}٪
                          </span>
                        </div>
                      </div>

                      {/* Confidence Bar */}
                      <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.confidence}%`, background: barColor }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center pt-4 animate-fade-up delay-400">
            <button
              onClick={() => setLocation("/")}
              className="btn-green inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر جديد
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs" style={{ color: "rgba(255,255,255,0.25)", borderTop: "1px solid rgba(0,113,156,0.15)" }}>
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
