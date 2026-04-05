import { useLocation } from "wouter";
import type { VerificationResult } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

interface ResultPageProps {
  result: VerificationResult | null;
  newsText: string;
}

export default function ResultPage({ result, newsText }: ResultPageProps) {
  const [, setLocation] = useLocation();
  const { isDark } = useTheme();

  if (!result) {
    setLocation("/");
    return null;
  }

  const isVerified = result.status === "verified";
  const accent = isVerified ? "#2EBD59" : "#ef4444";
  const accentDark = isVerified
    ? isDark ? "#4ade80" : "#1a8a40"
    : isDark ? "#f87171" : "#c0392b";
  const heroClass = isVerified ? "verified-hero" : "misleading-hero";

  const CheckIcon = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={isVerified ? "#2EBD59" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );

  const WarnIcon = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          <nav className="flex items-center gap-1.5">
            <button onClick={() => setLocation("/")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الرئيسية</button>
            <button onClick={() => setLocation("/trending")} className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">الأكثر تداولاً</button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* ── Status hero ── */}
          <div className={`${heroClass} p-8 text-center space-y-5 animate-fade-up`}>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mx-auto"
              style={{
                background: isVerified
                  ? isDark ? "rgba(46,189,89,0.15)" : "#eafaf0"
                  : isDark ? "rgba(239,68,68,0.15)" : "#fff1f1",
                border: isVerified
                  ? isDark ? "2px solid rgba(46,189,89,0.4)" : "2px solid #86efac"
                  : isDark ? "2px solid rgba(239,68,68,0.4)" : "2px solid #fca5a5",
              }}
            >
              {isVerified ? <CheckIcon /> : <WarnIcon />}
            </div>

            <div>
              <div className="text-4xl font-black mb-1" style={{ color: accentDark }}>
                {result.title}
              </div>
              <div className="text-sm" style={{ color: "var(--c-text-muted)" }}>تاريخ التحقق: {result.publishDate}</div>
            </div>

            {/* Confidence */}
            <div className="space-y-2.5">
              <div className="flex items-end justify-center gap-1">
                <span className="text-6xl font-black leading-none" style={{ color: accentDark }}>
                  {result.confidence}
                </span>
                <span className="text-2xl font-bold pb-1" style={{ color: accentDark }}>٪</span>
                <span className="text-sm pb-2 mr-1" style={{ color: "var(--c-text-muted)" }}>
                  {isVerified ? "نسبة التحقق" : "نسبة الثقة"}
                </span>
              </div>
              <div
                className="w-full max-w-xs mx-auto h-3 rounded-full overflow-hidden"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
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
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--c-text-muted)" }}>{newsText}</p>
            </div>
          )}

          {/* ── Explanation ── */}
          <div className="card p-6 space-y-3 animate-fade-up delay-200">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: isDark ? "rgba(0,113,156,0.2)" : "#e8f4f9" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" /><path d="M12 8h.01" />
                </svg>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--c-text-1)" }}>تفاصيل التحقق</span>
            </div>
            <p className="text-sm leading-loose" style={{ color: "var(--c-text-muted)" }}>{result.explanation}</p>
          </div>

          {/* ── Sources ── */}
          <div className="card p-6 space-y-4 animate-fade-up delay-300">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: isDark ? "rgba(0,113,156,0.2)" : "#e8f4f9" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--c-text-1)" }}>المصادر الرسمية</span>
            </div>
            <div className="space-y-2.5">
              {result.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                  style={{ background: "var(--c-source-bg)", border: `1px solid var(--c-source-border)` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--c-border-hover)";
                    e.currentTarget.style.background = "var(--c-source-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--c-source-border)";
                    e.currentTarget.style.background = "var(--c-source-bg)";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: isDark ? "rgba(0,113,156,0.2)" : "#e8f4f9" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: "var(--c-text-2)" }}>
                      {source.name}
                    </div>
                    <div className="text-xs truncate" style={{ color: "var(--c-text-muted)" }}>{source.url}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 rotate-180">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Recommendation ── */}
          <div
            className="rounded-2xl p-5 animate-fade-up delay-400"
            style={
              isVerified
                ? {
                    background: isDark ? "rgba(46,189,89,0.1)" : "#eafaf0",
                    border: `1.5px solid ${isDark ? "rgba(46,189,89,0.3)" : "#86efac"}`,
                  }
                : {
                    background: isDark ? "rgba(239,68,68,0.1)" : "#fff1f1",
                    border: `1.5px solid ${isDark ? "rgba(239,68,68,0.3)" : "#fca5a5"}`,
                  }
            }
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: isVerified
                    ? isDark ? "rgba(46,189,89,0.2)" : "#d1fae5"
                    : isDark ? "rgba(239,68,68,0.2)" : "#fee2e2",
                }}
              >
                {isVerified ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#4ade80" : "#1a8a40"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#f87171" : "#c0392b"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: accentDark }}>التوصية</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-text-muted)" }}>{result.recommendation}</p>
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
            <button onClick={() => setLocation("/trending")} className="btn-outline flex items-center justify-center gap-2 px-6 py-3 text-sm">
              الأكثر تداولاً
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs divider" style={{ color: "var(--c-text-muted)" }}>
        منصة سابر للتحقق من الأخبار — محتوى توضيحي
      </footer>
    </div>
  );
}
