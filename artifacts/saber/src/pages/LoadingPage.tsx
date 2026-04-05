import { useEffect, useState } from "react";

const steps = [
  "جاري تحليل النص...",
  "البحث في قواعد البيانات الرسمية...",
  "مقاطعة المصادر الموثوقة...",
  "جاري التحقق من المصادر...",
  "استخلاص النتائج...",
];

export default function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 650);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) return prev + 1.5;
        return prev;
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md space-y-10 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border-2 border-primary/20 animate-pulse-ring" style={{ animationDelay: "0s" }} />
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/30 animate-pulse-ring" style={{ animationDelay: "0.3s" }} />
          <div className="absolute w-16 h-16 rounded-full border-2 border-primary/40 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center relative z-10">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">جاري التحقق من المصادر...</h2>
          <p className="text-muted-foreground text-sm min-h-[1.5rem] transition-all duration-500">
            {steps[currentStep]}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground/70">
            <span>التحقق جارٍ</span>
            <span>{Math.round(progress)}٪</span>
          </div>
          <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-primary to-primary/70 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap text-xs text-muted-foreground/60">
          {["واس", "وزارة الصحة", "هيئة الاتصالات", "المالية"].map((src, i) => (
            <span
              key={src}
              className="px-3 py-1 rounded-full border border-border/50 transition-all duration-300"
              style={{
                opacity: currentStep >= i ? 1 : 0.3,
                color: currentStep >= i ? "hsl(var(--primary))" : undefined,
                borderColor: currentStep >= i ? "hsl(var(--primary) / 0.4)" : undefined,
              }}
            >
              {src}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
