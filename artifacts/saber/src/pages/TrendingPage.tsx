import { useState } from "react";
import { useLocation } from "wouter";
import { trendingNews } from "@/data/mockData";
import type { VerificationStatus } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  البيئة: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  الاقتصاد: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  الصحة: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  التقنية: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  الرياضة: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  السياسة: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

function StatusBadge({ status }: { status: VerificationStatus }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-semibold">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        موثوق
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-semibold">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

  const filtered = trendingNews.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const verifiedCount = trendingNews.filter((i) => i.status === "verified").length;
  const misleadingCount = trendingNews.filter((i) => i.status === "misleading").length;

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
              className="px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 transition-all"
            >
              الأكثر تداولاً
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">الأخبار الأكثر تداولاً</h1>
            <p className="text-muted-foreground text-sm">نتائج التحقق من الأخبار المتداولة اليوم</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-foreground">{trendingNews.length}</div>
              <div className="text-xs text-muted-foreground mt-1">إجمالي الأخبار</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center border-green-500/20 bg-green-500/5">
              <div className="text-2xl font-black text-green-400">{verifiedCount}</div>
              <div className="text-xs text-muted-foreground mt-1">موثوق</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center border-red-500/20 bg-red-500/5">
              <div className="text-2xl font-black text-red-400">{misleadingCount}</div>
              <div className="text-xs text-muted-foreground mt-1">مضلل</div>
            </div>
          </div>

          <div className="flex gap-2">
            {(["all", "verified", "misleading"] as const).map((f) => {
              const labels = { all: "الكل", verified: "الموثوق", misleading: "المضلل" };
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filtered.map((item, index) => {
              const categoryClass = categoryColors[item.category] ?? "text-gray-400 bg-gray-400/10 border-gray-400/20";
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 hover:border-border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0 text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="text-foreground font-medium leading-relaxed text-sm sm:text-base">
                        {item.headline}
                      </p>
                      <div className="flex items-center flex-wrap gap-2">
                        <StatusBadge status={item.status} />
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${categoryClass}`}>
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1.5 mr-auto">
                          <span className="text-xs text-muted-foreground/60">{item.date}</span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className={`text-xs font-bold ${item.confidence >= 80 ? 'text-green-400' : item.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {item.confidence}٪
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              تحقق من خبر جديد
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
