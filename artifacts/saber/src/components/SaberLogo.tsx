interface SaberLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animateIcon?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

const sizeMap = {
  sm: { icon: 30, textSize: "text-xl", gap: "gap-2.5" },
  md: { icon: 42, textSize: "text-2xl", gap: "gap-3" },
  lg: { icon: 58, textSize: "text-4xl", gap: "gap-4" },
  xl: { icon: 82, textSize: "text-5xl", gap: "gap-5" },
};

export default function SaberLogo({
  size = "md",
  showText = true,
  animateIcon = false,
  theme = "dark",
  className = "",
}: SaberLogoProps) {
  const { icon, textSize, gap } = sizeMap[size];
  const textColor = theme === "dark" ? "#ffffff" : "#00719C";

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
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#00719C" />
          {/* Magnifying glass outer ring */}
          <circle cx="43" cy="43" r="21" stroke="#2EBD59" strokeWidth="7" fill="none" />
          {/* Handle */}
          <line x1="58" y1="58" x2="77" y2="77" stroke="#2EBD59" strokeWidth="8.5" strokeLinecap="round" />
          {/* Inner highlight */}
          <circle cx="43" cy="43" r="10" fill="rgba(46,189,89,0.15)" />
          <circle cx="35" cy="35" r="3.5" fill="rgba(255,255,255,0.45)" />
        </svg>
      </div>
      {showText && (
        <span
          className={`font-black ${textSize}`}
          style={{
            color: textColor,
            letterSpacing: "0.04em",
          }}
        >
          سابر
        </span>
      )}
    </div>
  );
}
