import { useLocation } from "wouter";
import type { VerificationResult } from "@/data/mockData";
import SaberLogo from "@/components/SaberLogo";

interface ResultPageProps {
  result: VerificationResult | null;
  newsText: string;
}

function NavHeader({ onHome, onTrending }: { onHome: () => void; onTrending: () => void }) {
  return (
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
            onClick={onHome}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            الرئيسية
          </button>
          <button
            onClick={onTrending}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            الأكثر تداولاً
          </button>
        </nav>
      </div>
    </header>
  );
}

export default function ResultPage({ result, newsText }: ResultPageProps) {
  const [, setLocation] = useLocation();

  if (!result) {
    setLocation("/");
    return null;
  }

  const isVerified = result.status === "verified";

  const accentColor = isVerified ? "#2EBD59" : "#ef4444";
  const accentBg = isVerified ? "rgba(46, 189, 89, 0.12)" : "rgba(239, 68, 68, 0.12)";
  const accentBorder = isVerified ? "rgba(46, 189, 89, 0.3)" : "rgba(239, 68, 68, 0.3)";
  const cardClass = isVerified ? "verified-card" : "misleading-card";

  const StatusIcon = () =>
    isVerified ? (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ) : (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <NavHeader onHome={() => setLocation("/")} onTrending={() => setLocation("/trending")} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Status Hero Card */}
          <div className={`${cardClass} rounded-2xl p-8 text-center space-y-5 animate-fade-up`}>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mx-auto"
              style={{ background: accentBg, border: `1.5px solid ${accentBorder}` }}
            >
              <StatusIcon />
            </div>

            <div>
              <div
                className="text-4xl font-black mb-1"
                style={{ color: accentColor }}
              >
                {result.title}
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                تاريخ التحقق: {result.publishDate}
              </div>
            </div>

            {/* Confidence */}
            <div className="space-y-3">
              <div className="flex items-end justify-center gap-1">
                <span
                  className="text-6xl font-black leading-none"
                  style={{ color: accentColor }}
                >
                  {result.confidence}
                </span>
                <span className="text-2xl font-bold pb-1" style={{ color: accentColor }}>٪</span>
                <span className="text-sm pb-2 mr-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {isVerified ? "نسبة التحقق" : "نسبة الثقة"}
                </span>
              </div>
              <div className="w-full max-w-xs mx-auto h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${result.confidence}%`,
                    background: isVerified
                      ? "linear-gradient(90deg, #00719C, #2EBD59)"
                      : "linear-gradient(90deg, #991b1b, #ef4444)",
                    boxShadow: `0 0 10px ${accentColor}60`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* News Snippet */}
          {newsText && (
            <div
              className="rounded-2xl p-5 space-y-2 animate-fade-up delay-100"
              style={{ background: "rgba(0,20,40,0.5)", border: "1px solid rgba(0,113,156,0.2)" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                الخبر المُدخَل
              </div>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "rgba(255,255,255,0.75)" }}>
                {newsText}
              </p>
            </div>
          )}

          {/* Explanation */}
          <div
            className="rounded-2xl p-6 space-y-3 animate-fade-up delay-200"
            style={{ background: "rgba(0,20,40,0.5)", border: "1px solid rgba(0,113,156,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,113,156,0.25)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">تفاصيل التحقق</span>
            </div>
            <p className="text-sm leading-loose" style={{ color: "rgba(255,255,255,0.7)" }}>
              {result.explanation}
            </p>
          </div>

          {/* Sources */}
          <div
            className="rounded-2xl p-6 space-y-4 animate-fade-up delay-300"
            style={{ background: "rgba(0,20,40,0.5)", border: "1px solid rgba(0,113,156,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,113,156,0.25)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">المصادر الرسمية</span>
            </div>
            <div className="space-y-2.5">
              {result.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                  style={{
                    background: "rgba(0,113,156,0.1)",
                    border: "1px solid rgba(0,113,156,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(46,189,89,0.4)";
                    e.currentTarget.style.background = "rgba(46,189,89,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,113,156,0.2)";
                    e.currentTarget.style.background = "rgba(0,113,156,0.1)";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,113,156,0.3)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00719C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate group-hover:text-[#2EBD59] transition-colors">
                      {source.name}
                    </div>
                    <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {source.url}
                    </div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 rotate-180">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div
            className="rounded-2xl p-5 animate-fade-up delay-400"
            style={{
              background: accentBg,
              border: `1.5px solid ${accentBorder}`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${accentColor}25` }}
              >
                {isVerified ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                )}
              </div>
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: accentColor }}>
                  التوصية
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {result.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 animate-fade-up delay-500">
            <button
              onClick={() => setLocation("/")}
              className="btn-green flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر آخر
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="btn-blue flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            >
              الأكثر تداولاً
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
