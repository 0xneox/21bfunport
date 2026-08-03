export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="21B Labs logo"
    >
      {/* 21 */}
      <text
        x="0"
        y="45"
        fontFamily="ui-monospace, SF Mono, SFMono-Regular, JetBrains Mono, IBM Plex Mono, Menlo, Consolas, monospace"
        fontSize="38"
        fontWeight="500"
        fill="#000000"
        letterSpacing="-0.5"
      >
        21
      </text>
      
      {/* Bitcoin B symbol */}
      <g transform="translate(40, 6)">
        {/* Outer circle */}
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        />
        
        {/* B letter */}
        <text
          x="10"
          y="26"
          fontFamily="ui-monospace, SF Mono, SFMono-Regular, JetBrains Mono, IBM Plex Mono, Menlo, Consolas, monospace"
          fontSize="22"
          fontWeight="600"
          fill="#000000"
        >
          B
        </text>
        
        {/* Vertical line (Bitcoin symbol) */}
        <line
          x1="18"
          y1="4"
          x2="18"
          y2="32"
          stroke="#000000"
          strokeWidth="1.5"
        />
      </g>
      
      {/* LABS */}
      <text
        x="82"
        y="45"
        fontFamily="ui-monospace, SF Mono, SFMono-Regular, JetBrains Mono, IBM Plex Mono, Menlo, Consolas, monospace"
        fontSize="38"
        fontWeight="500"
        fill="#000000"
        letterSpacing="-0.5"
      >
        LABS
      </text>
    </svg>
  );
}

export function Favicon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="32" height="32" fill="#FFFFFF" />
      
      {/* Bitcoin B symbol */}
      <g transform="translate(4, 4)">
        {/* Outer circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        />
        
        {/* B letter */}
        <text
          x="5"
          y="17"
          fontFamily="ui-monospace, SF Mono, SFMono-Regular, JetBrains Mono, IBM Plex Mono, Menlo, Consolas, monospace"
          fontSize="16"
          fontWeight="600"
          fill="#000000"
        >
          B
        </text>
        
        {/* Vertical line (Bitcoin symbol) */}
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          stroke="#000000"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
