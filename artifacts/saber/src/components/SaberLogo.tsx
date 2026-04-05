interface SaberLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animateIcon?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

const sizeMap = {
  sm: { icon: 34, textSize: "text-xl", gap: "gap-2.5" },
  md: { icon: 46, textSize: "text-2xl", gap: "gap-3" },
  lg: { icon: 72, textSize: "text-4xl", gap: "gap-4" },
  xl: { icon: 96, textSize: "text-5xl", gap: "gap-5" },
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
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="saberGrad" x1="50" y1="10" x2="160" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00719C" />
              <stop offset="100%" stopColor="#2EBD59" />
            </linearGradient>
          </defs>

          {/* Outer C-ring: center (95,88), radius 67, open on right side */}
          <path
            d="M 142.4,40.6 A 67,67 0 1,0 142.4,135.4"
            stroke="url(#saberGrad)"
            strokeWidth="12.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Inner C-ring: center (95,88), radius 47, same opening */}
          <path
            d="M 128.2,54.8 A 47,47 0 1,0 128.2,121.2"
            stroke="url(#saberGrad)"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />

          {/* Handle: from lower gap endpoint going lower-right */}
          <line
            x1="142.4" y1="135.4"
            x2="174" y2="169"
            stroke="url(#saberGrad)"
            strokeWidth="12.5"
            strokeLinecap="round"
          />

          {/* Checkmark inside */}
          <polyline
            points="68,90 84,110 124,68"
            stroke="url(#saberGrad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-black ${textSize}`}
          style={{
            color: textColor,
            letterSpacing: "0.04em",
            fontFamily: "'Noto Kufi Arabic', 'Cairo', sans-serif",
          }}
        >
          سابر
        </span>
      )}
    </div>
  );
}
