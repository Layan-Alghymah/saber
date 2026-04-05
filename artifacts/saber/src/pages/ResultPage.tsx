import { useLocation } from "wouter";
import type { VerificationResult } from "@/data/mockData";

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
  const statusColor = isVerified ? "text-green-400" : "text-red-400";
  const statusBg = isVerified ? "bg-green-500/10 border-green-500/25" : "bg-red-500/10 border-red-500/25";
  const statusGlow = isVerified ? "verified-glow" : "misleading-glow";
  const statusLabel = isVerified ? "موثوق" : "مضلل";
  const statusIcon = isVerified ? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ) : (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  const confidenceColor = result.confidence >= 80
    ? "text-green-400"
    : result.confidence >= 60
    ? "text-yellow-400"
    : "text-red-400";

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
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
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
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

      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
          <div className={`rounded-2xl border p-8 ${statusBg} ${statusGlow} text-center space-y-4`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${isVerified ? 'bg-green-500/20' : 'bg-red-500/20'} ${statusColor} mx-auto`}>
              {statusIcon}
            </div>
            <div>
              <div className={`text-4xl font-black ${statusColor} mb-1`}>
                {statusLabel}
              </div>
              <div className="text-muted-foreground text-sm">نتيجة التحقق</div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className={`text-5xl font-black ${confidenceColor}`}>
                  {result.confidence}٪
                </div>
                <div className="text-xs text-muted-foreground mt-1">نسبة الثقة</div>
              </div>
            </div>
            <div className="w-full h-3 bg-background/40 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isVerified ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {newsText && (
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">الخبر الذي تم فحصه</div>
              <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">{newsText}</p>
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              الشرح والتفاصيل
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {result.explanation}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              المصادر الرسمية المستخدمة
            </div>
            <div className="space-y-3">
              {result.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {source.name}
                    </div>
                    <div className="text-xs text-muted-foreground/60 truncate">{source.url}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 flex-shrink-0 rotate-180">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${isVerified ? 'bg-green-500/8 border-green-500/20' : 'bg-orange-500/8 border-orange-500/20'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isVerified ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${isVerified ? 'text-green-400' : 'text-orange-400'}`}>
                  التوصية
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setLocation("/")}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر آخر
            </button>
            <button
              onClick={() => setLocation("/trending")}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-6 py-3 rounded-xl transition-all duration-200"
            >
              الأكثر تداولاً
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
