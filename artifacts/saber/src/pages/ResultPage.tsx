import { useLocation } from "wouter";
import type { VerificationResult } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";

interface ResultPageProps {
  result: VerificationResult | null;
  newsText: string;
}

export default function ResultPage({ result, newsText }: ResultPageProps) {
  const [, setLocation] = useLocation();

  if (!result) {
    setLocation("/");
    return null;
  }

  const isVerified = result.status === "verified";
  const accent = isVerified ? "#2EBD59" : "#ef4444";
  const accentDark = isVerified ? "#1a8a40" : "#c0392b";
  const heroClass = isVerified ? "verified-hero" : "misleading-hero";

  const CheckIcon = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );

  const WarnIcon = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-page flex flex-col" dir="rtl">
      {/* Header */}
      <header className="brand-header sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <SaberLogo size="sm" showText={true} theme="dark" />
          <nav className="flex items-center gap-1">
            <button onClick={() => setLocation("/")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الرئيسية</button>
            <button onClick={() => setLocation("/trending")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الأكثر تداولاً</button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* ── Status hero ── */}
          <div className={`${heroClass} rounded-2xl p-8 text-center space-y-5 animate-fade-up`}>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mx-auto"
              style={{
                background: isVerified ? "#eafaf0" : "#fff1f1",
                border: `2px solid ${isVerified ? "#86efac" : "#fca5a5"}`,
              }}
            >
              {isVerified ? <CheckIcon /> : <WarnIcon />}
            </div>

            <div>
              <div className="text-4xl font-black mb-1" style={{ color: accentDark }}>
                {result.title}
              </div>
              <div className="text-sm text-slate-500">تاريخ التحقق: {result.publishDate}</div>
            </div>

            {/* Confidence */}
            <div className="space-y-2.5">
              <div className="flex items-end justify-center gap-1">
                <span className="text-6xl font-black leading-none" style={{ color: accentDark }}>
                  {result.confidence}
                </span>
                <span className="text-2xl font-bold pb-1" style={{ color: accentDark }}>٪</span>
                <span className="text-sm text-slate-400 pb-2 mr-1">
                  {isVerified ? "نسبة التحقق" : "نسبة الثقة"}
                </span>
              </div>
              <div className="w-full max-w-xs mx-auto h-3 rounded-full overflow-hidden bg-white/60" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div
                  className={`h-full rounded-full ${isVerified ? "bar-verified" : "bar-misleading"}`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── News snippet ── */}
          {newsText && (
            <div className="card p-5 space-y-2 animate-fade-up delay-100">
              <div className="section-label">الخبر المُدخَل</div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{newsText}</p>
            </div>
          )}

          {/* ── Explanation ── */}
          <div className="card p-6 space-y-3 animate-fade-up delay-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#e8f4f9" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" /><path d="M12 8h.01" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-800">تفاصيل التحقق</span>
            </div>
            <p className="text-sm text-gray-600 leading-loose">{result.explanation}</p>
          </div>

          {/* ── Sources ── */}
          <div className="card p-6 space-y-4 animate-fade-up delay-300">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#e8f4f9" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-800">المصادر الرسمية</span>
            </div>
            <div className="space-y-2.5">
              {result.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                  style={{ background: "#f8fafc", border: "1px solid #e2eaf3" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#b3d8ea";
                    e.currentTarget.style.background = "#e8f4f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2eaf3";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#e8f4f9" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-700 group-hover:text-[#00719C] transition-colors truncate">
                      {source.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{source.url}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 rotate-180">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Recommendation ── */}
          <div
            className="rounded-2xl p-5 animate-fade-up delay-400"
            style={{
              background: isVerified ? "#eafaf0" : "#fff1f1",
              border: `1.5px solid ${isVerified ? "#86efac" : "#fca5a5"}`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: isVerified ? "#d1fae5" : "#fee2e2" }}
              >
                {isVerified ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a8a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: accentDark }}>التوصية</div>
                <p className="text-sm text-gray-600 leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3 animate-fade-up delay-500">
            <button
              onClick={() => setLocation("/")}
              className="btn-green flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر آخر
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="btn-outline flex items-center justify-center gap-2 px-6 py-3 text-sm"
            >
              الأكثر تداولاً
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 divider">
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
