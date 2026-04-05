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

    const redirect = setTimeout(() => {
      setLocation("/result");
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(sourceInterval);
      clearInterval(progressInterval);
      clearTimeout(redirect);
    };
  }, [setLocation]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md text-center space-y-12 animate-fade-in">
        {/* Animated Logo */}
        <div className="relative flex items-center justify-center" style={{ height: 180 }}>
          {/* Outer rings */}
          {[180, 140, 110].map((size, i) => (
            <div
              key={size}
              className="absolute rounded-full animate-pulse-ring"
              style={{
                width: size,
                height: size,
                border: `1.5px solid rgba(0, 113, 156, ${0.15 + i * 0.1})`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
          {/* Inner glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: 90,
              height: 90,
              background: "radial-gradient(circle, rgba(0,113,156,0.3) 0%, transparent 70%)",
            }}
          />
          {/* Logo */}
          <div
            className="relative z-10 p-4 rounded-full"
            style={{
              background: "rgba(0, 30, 50, 0.8)",
              border: "2px solid rgba(0, 113, 156, 0.5)",
              boxShadow: "0 0 40px rgba(0,113,156,0.4), 0 0 80px rgba(46,189,89,0.15)",
            }}
          >
            <SaberLogo size="md" showText={false} animateIcon={true} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-white">
            جاري التحقق من المصادر الرسمية...
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            يتم تحليل الخبر ومقارنته بالمصادر الموثوقة
          </p>
          <p
            className="text-xs font-medium animate-scan-pulse min-h-5 transition-all duration-500"
            style={{ color: "#2EBD59" }}
          >
            {steps[currentStep]}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span>تحليل جارٍ</span>
            <span style={{ color: "#2EBD59", fontWeight: 700 }}>{Math.round(progress)}٪</span>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(0,113,156,0.2)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00719C, #2EBD59)",
                boxShadow: "0 0 10px rgba(46,189,89,0.5)",
              }}
            />
          </div>
        </div>

        {/* Source Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {sources.map((src, i) => (
            <span
              key={src}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500"
              style={{
                background: i <= activeSource ? "rgba(46,189,89,0.15)" : "rgba(0,113,156,0.1)",
                border: `1px solid ${i <= activeSource ? "rgba(46,189,89,0.4)" : "rgba(0,113,156,0.2)"}`,
                color: i <= activeSource ? "#2EBD59" : "rgba(255,255,255,0.35)",
                transform: i <= activeSource ? "scale(1.05)" : "scale(1)",
              }}
            >
              {i <= activeSource ? "✓ " : ""}{src}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
