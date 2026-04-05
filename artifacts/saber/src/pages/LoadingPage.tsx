import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SaberLogo from "@/components/SaberLogo";

const steps = [
  "جاري تحليل النص...",
  "البحث في قواعد البيانات الرسمية...",
  "مقارنة المحتوى مع المصادر الموثوقة...",
  "التحقق المتقاطع مع وكالة الأنباء...",
  "استخلاص النتائج النهائية...",
];

const sources = ["واس", "وزارة الصحة", "هيئة الاتصالات", "المالية", "البوابة الوطنية"];

export default function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeSource, setActiveSource] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((p) => (p < steps.length - 1 ? p + 1 : p));
    }, 680);
    const sourceInterval = setInterval(() => {
      setActiveSource((p) => (p < sources.length - 1 ? p + 1 : p));
    }, 600);
    const progressInterval = setInterval(() => {
      setProgress((p) => (p < 95 ? p + 1.3 : p));
    }, 45);
    const redirect = setTimeout(() => setLocation("/result"), 3500);
    return () => {
      clearInterval(stepInterval);
      clearInterval(sourceInterval);
      clearInterval(progressInterval);
      clearTimeout(redirect);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-page flex flex-col" dir="rtl">
      {/* Mini header */}
      <header className="brand-header shadow-sm">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-center">
          <SaberLogo size="sm" showText={true} theme="dark" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in">

          {/* Animated logo */}
          <div className="relative flex items-center justify-center mb-10" style={{ height: 190 }}>
            {[190, 150, 115].map((sz, i) => (
              <div
                key={sz}
                className="absolute rounded-full animate-pulse-ring"
                style={{
                  width: sz,
                  height: sz,
                  border: `1.5px solid rgba(0,113,156,${0.12 + i * 0.1})`,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            ))}
            <div
              className="relative z-10 p-5 rounded-full"
              style={{
                background: "#fff",
                border: "2px solid #b3d8ea",
                boxShadow: "0 8px 40px rgba(0,113,156,0.2), 0 0 0 6px rgba(0,113,156,0.06)",
              }}
            >
              <SaberLogo size="md" showText={false} animateIcon={true} />
            </div>
          </div>

          {/* Card */}
          <div className="card p-8 space-y-7 text-center">
            <div>
              <h2 className="text-xl font-black text-gray-800 mb-2">
                جاري التحقق من المصادر الرسمية...
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                يتم تحليل الخبر ومقارنته بالمصادر الموثوقة
              </p>
              <p
                className="text-sm font-semibold mt-2 animate-scan-pulse min-h-5"
                style={{ color: "#00719C" }}
              >
                {steps[currentStep]}
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>تحليل جارٍ</span>
                <span className="font-bold" style={{ color: "#2EBD59" }}>
                  {Math.round(progress)}٪
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "#e8f4f9" }}>
                <div
                  className="h-full rounded-full transition-all duration-75"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #00719C, #2EBD59)",
                    boxShadow: "0 0 8px rgba(46,189,89,0.4)",
                  }}
                />
              </div>
            </div>

            {/* Source tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {sources.map((src, i) => (
                <span
                  key={src}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500"
                  style={{
                    background: i <= activeSource ? "#eafaf0" : "#f1f5f9",
                    border: `1px solid ${i <= activeSource ? "#86efac" : "#e2e8f0"}`,
                    color: i <= activeSource ? "#1a8a40" : "#94a3b8",
                  }}
                >
                  {i <= activeSource ? "✓ " : ""}{src}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
