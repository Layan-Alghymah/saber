interface SaberLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animateIcon?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 28, textSize: "text-lg", gap: "gap-2" },
  md: { icon: 40, textSize: "text-2xl", gap: "gap-3" },
  lg: { icon: 56, textSize: "text-4xl", gap: "gap-4" },
  xl: { icon: 80, textSize: "text-5xl", gap: "gap-5" },
};

export default function SaberLogo({
  size = "md",
  showText = true,
  animateIcon = false,
  className = "",
}: SaberLogoProps) {
  const { icon, textSize, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap} ${className}`}>
      <div
        style={{
          width: icon,
          height: icon,
          animation: animateIcon ? "logo-rotate 8s linear infinite" : undefined,
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <circle cx="50" cy="50" r="50" fill="#00719C" />
          <circle
            cx="44"
            cy="44"
            r="22"
            stroke="#2EBD59"
            strokeWidth="7"
            fill="none"
          />
          <line
            x1="60"
            y1="60"
            x2="78"
            y2="78"
            stroke="#2EBD59"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="44" cy="44" r="10" fill="rgba(46,189,89,0.18)" />
          <circle cx="36" cy="36" r="3" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>
      {showText && (
        <span
          className={`font-black tracking-wide ${textSize}`}
          style={{
            color: "#ffffff",
            letterSpacing: "0.05em",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          سابر
        </span>
      )}
    </div>
  );
}
