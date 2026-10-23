import "./styles/WhatIDo.css";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const services: ServiceCard[] = [
  {
    id: "research",
    title: "User Research & Strategy",
    description:
      "I find out who the product is for, map their journey and spot where people get stuck, before a single screen is drawn.",
    tags: [
      "User research",
      "User journey mapping",
      "User flows",
      "Information architecture",
    ],
  },
  {
    id: "wireframing",
    title: "Wireframes & Prototypes",
    description:
      "Quick layouts settle the structure. Clickable prototypes let people try the flow, so ideas get tested before development starts.",
    tags: [
      "Wireframing",
      "Prototyping",
      "Interaction design",
      "Design thinking",
    ],
  },
  {
    id: "visual",
    title: "Visual & UI Design",
    description:
      "Clean, modern screens with a clear hierarchy and considered type and colour, so the most important thing is the easiest to see.",
    tags: [
      "Visual hierarchy",
      "Typography",
      "Color theory",
      "Responsive layouts",
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description:
      "Reusable components, styles and tokens in Figma, so teams ship faster and the product stays consistent as it grows.",
    tags: [
      "Design systems",
      "Figma components",
      "Style guides",
      "Developer handoff",
    ],
  },
];

const WhatIDo = () => {
  return (
    <section className="whatIDO section-container" id="what-i-do">
      <div className="what-box">
        <div className="what-header">
          <h2 className="section-title">
            WHAT I DO
          </h2>
        </div>

        <div className="what-box-in what-cards-grid">
          {/* Card 1: User research & strategy (Live User Journey & Strategy Canvas) */}
          <div className="wid-card" key={services[0].id}>
            <div className="wid-card-preview wid-preview-research">
              <div className="wid-preview-glow wid-glow-purple" />
              <svg
                viewBox="0 0 340 180"
                className="wid-svg-canvas"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background dot grid */}
                <pattern
                  id="grid-dots-1"
                  x="0"
                  y="0"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-dots-1)" />

                {/* Vertical Phase Guides */}
                <line x1="50" y1="42" x2="50" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="130" y1="42" x2="130" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="215" y1="42" x2="215" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="290" y1="42" x2="290" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                {/* Baseline Axis */}
                <line x1="26" y1="140" x2="314" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                {/* Translucent Area Gradient */}
                <path
                  d="M 50 120 C 85 120, 105 48, 130 48 C 165 48, 185 118, 215 118 C 248 118, 265 42, 290 42 L 290 140 L 50 140 Z"
                  fill="url(#journey-area-grad)"
                  className="wid-curve-area"
                />
                <defs>
                  <linearGradient id="journey-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="journey-spline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="45%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* Journey Spline Curve */}
                <path
                  d="M 50 120 C 85 120, 105 48, 130 48 C 165 48, 185 118, 215 118 C 248 118, 265 42, 290 42"
                  stroke="url(#journey-spline-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="wid-spline-path"
                />

                {/* Traveling Signal Dot */}
                <circle r="4.5" fill="#38bdf8" className="wid-travel-dot">
                  <animateMotion
                    path="M 50 120 C 85 120, 105 48, 130 48 C 165 48, 185 118, 215 118 C 248 118, 265 42, 290 42"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Milestone Radar Nodes */}
                {/* Node 1: Discover */}
                <circle cx="50" cy="120" r="9" className="wid-node-ring wid-ring-1" />
                <circle cx="50" cy="120" r="8" fill="#0b1120" stroke="#818cf8" strokeWidth="2.5" />
                <circle cx="50" cy="120" r="3.5" fill="#818cf8" />

                {/* Node 2: Explore */}
                <circle cx="130" cy="48" r="10" className="wid-node-ring wid-ring-2" />
                <circle cx="130" cy="48" r="8.5" fill="#0b1120" stroke="#c084fc" strokeWidth="2.5" />
                <circle cx="130" cy="48" r="4" fill="#e9d5ff" />

                {/* Node 3: Decide */}
                <circle cx="215" cy="118" r="9" className="wid-node-ring wid-ring-3" />
                <circle cx="215" cy="118" r="8" fill="#0b1120" stroke="#818cf8" strokeWidth="2.5" />
                <circle cx="215" cy="118" r="3.5" fill="#818cf8" />

                {/* Node 4: Convert */}
                <circle cx="290" cy="42" r="10" className="wid-node-ring wid-ring-4" />
                <circle cx="290" cy="42" r="8.5" fill="#0b1120" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="290" cy="42" r="4" fill="#bae6fd" />

                {/* Phase Step Labels */}
                <text x="50" y="156" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
                  01 Discover
                </text>
                <text x="130" y="156" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
                  02 Explore
                </text>
                <text x="215" y="156" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
                  03 Decide
                </text>
                <text x="290" y="156" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
                  04 Convert
                </text>
              </svg>
            </div>

            <div className="wid-card-body">
              <h3 className="wid-card-title">{services[0].title}</h3>
              <p className="wid-card-desc">{services[0].description}</p>
              <div className="wid-card-footer">
                <div className="wid-tags">
                  {services[0].tags.map((tag) => (
                    <span key={tag} className="wid-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Wireframes & prototypes (Low-Fi Blueprint to Clickable Hi-Fi Prototype) */}
          <div className="wid-card" key={services[1].id}>
            <div className="wid-card-preview wid-preview-wireframe">
              <div className="wid-preview-glow wid-glow-pink" />
              <svg
                viewBox="0 0 340 180"
                className="wid-svg-canvas"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── Left Device: Blueprint Wireframe ── */}
                <g className="wid-screen-left">
                  {/* Phone Shell */}
                  <rect
                    x="30"
                    y="15"
                    width="106"
                    height="150"
                    rx="16"
                    fill="rgba(15, 23, 42, 0.75)"
                    stroke="rgba(148, 163, 184, 0.4)"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    className="wid-wireframe-border"
                  />
                  {/* Dynamic Island / Notch */}
                  <rect x="68" y="22" width="30" height="6" rx="3" fill="rgba(255,255,255,0.15)" />

                  {/* Wireframe Hero Media Box with classic UX Cross ☒ */}
                  <rect x="42" y="36" width="82" height="42" rx="6" fill="#1e293b" />
                  <line x1="42" y1="36" x2="124" y2="78" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="124" y1="36" x2="42" y2="78" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                  {/* Skeleton Text Lines */}
                  <rect x="42" y="86" width="60" height="6" rx="3" fill="#334155" />
                  <rect x="42" y="98" width="82" height="5" rx="2.5" fill="#334155" />
                  <rect x="42" y="108" width="50" height="5" rx="2.5" fill="#1e293b" />

                  {/* Wireframe Outline Button */}
                  <rect
                    x="42"
                    y="126"
                    width="82"
                    height="24"
                    rx="12"
                    fill="transparent"
                    stroke="rgba(148, 163, 184, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x="83" y="141" textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="8.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
                    Low-Fi Wireframe
                  </text>
                </g>

                {/* ── Center Connecting Stream & Flow Badge ── */}
                <g className="wid-connector-arrow">
                  <line
                    x1="144"
                    y1="90"
                    x2="190"
                    y2="90"
                    stroke="#fb7185"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    className="wid-arrow-dash"
                  />
                  <polygon
                    points="189,84 200,90 189,96"
                    fill="#fb7185"
                    className="wid-arrow-head"
                  />
                  {/* Flow Pill */}
                  <rect
                    x="150"
                    y="66"
                    width="44"
                    height="16"
                    rx="8"
                    fill="rgba(251, 113, 133, 0.15)"
                    stroke="rgba(251, 113, 133, 0.4)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="172"
                    y="77"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="8.5"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                  >
                    Flow →
                  </text>
                </g>

                {/* ── Right Device: Hi-Fi Clickable Prototype ── */}
                <g className="wid-screen-right">
                  {/* Phone Shell */}
                  <rect
                    x="204"
                    y="15"
                    width="106"
                    height="150"
                    rx="16"
                    fill="#0a0f1d"
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 10px 24px rgba(0, 0, 0, 0.6))"
                    className="wid-prototype-border"
                  />
                  {/* Dynamic Island */}
                  <rect x="242" y="22" width="30" height="6" rx="3" fill="#1e293b" />

                  {/* Gradient Media Card */}
                  <rect
                    x="216"
                    y="36"
                    width="82"
                    height="42"
                    rx="8"
                    fill="url(#proto-hero-grad)"
                  />
                  <defs>
                    <linearGradient id="proto-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  {/* Mini Card Content */}
                  <circle cx="232" cy="57" r="8" fill="rgba(255,255,255,0.25)" />
                  <rect x="246" y="52" width="42" height="5" rx="2.5" fill="#ffffff" />
                  <rect x="246" y="60" width="28" height="4" rx="2" fill="rgba(255,255,255,0.7)" />

                  {/* High-Fi Typography Lines */}
                  <rect x="216" y="86" width="64" height="6" rx="3" fill="#ffffff" opacity="0.9" />
                  <rect x="216" y="98" width="82" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
                  <rect x="216" y="108" width="46" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />

                  {/* Interactive Primary CTA Button */}
                  <rect
                    x="216"
                    y="126"
                    width="82"
                    height="24"
                    rx="12"
                    fill="#2563eb"
                    className="wid-proto-btn"
                  />
                  <text
                    x="257"
                    y="141"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                  >
                    Tap to Test ⚡
                  </text>

                  {/* Concentric Tap Ripple */}
                  <circle cx="282" cy="138" r="6" className="wid-click-ripple" />

                  {/* Tester Finger/Cursor */}
                  <g className="wid-proto-cursor">
                    <circle cx="282" cy="138" r="4" fill="#ffffff" opacity="0.8" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="wid-card-body">
              <h3 className="wid-card-title">{services[1].title}</h3>
              <p className="wid-card-desc">{services[1].description}</p>
              <div className="wid-card-footer">
                <div className="wid-tags">
                  {services[1].tags.map((tag) => (
                    <span key={tag} className="wid-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Visual & UI design (Visual Hierarchy, Color Harmony & Typography) */}
          <div className="wid-card" key={services[2].id}>
            <div className="wid-card-preview wid-preview-visual">
              <div className="wid-preview-glow wid-glow-teal" />
              <svg
                viewBox="0 0 340 180"
                className="wid-svg-canvas"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── Left Side: Floating Color Harmony Palette ── */}
                <g className="wid-palette-col">
                  {/* Palette Swatch 1: Coral Rose */}
                  <g className="wid-swatch-chip wid-swatch-1">
                    <rect x="20" y="24" width="68" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(244, 63, 94, 0.4)" strokeWidth="1" />
                    <circle cx="33" cy="37" r="7" fill="#f43f5e" />
                    <text x="46" y="40" fill="#fecdd3" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
                      Accent
                    </text>
                  </g>

                  {/* Palette Swatch 2: Electric Indigo */}
                  <g className="wid-swatch-chip wid-swatch-2">
                    <rect x="20" y="58" width="68" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" />
                    <circle cx="33" cy="71" r="7" fill="#6366f1" />
                    <text x="46" y="74" fill="#c7d2fe" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
                      Brand
                    </text>
                  </g>

                  {/* Palette Swatch 3: Gold Amber */}
                  <g className="wid-swatch-chip wid-swatch-3">
                    <rect x="20" y="92" width="68" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" />
                    <circle cx="33" cy="105" r="7" fill="#fbbf24" />
                    <text x="46" y="108" fill="#fde68a" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
                      Warm
                    </text>
                  </g>

                  {/* Contrast Score Pill */}
                  <g className="wid-contrast-pill">
                    <rect x="20" y="128" width="68" height="18" rx="9" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.8" />
                    <text x="54" y="140" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700">
                      AAA 14:1
                    </text>
                  </g>
                </g>

                {/* ── Main Hero UI Card: Visual Hierarchy & Display Typography ── */}
                <g className="wid-ui-card" transform="translate(100, 14)">
                  {/* Floating Teal Glass Card */}
                  <rect
                    x="0"
                    y="0"
                    width="216"
                    height="152"
                    rx="18"
                    fill="url(#teal-card-grad)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 16px 32px rgba(13, 148, 136, 0.4))"
                    className="wid-teal-card-base"
                  />
                  <defs>
                    <linearGradient id="teal-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="60%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                  </defs>

                  {/* Glass Sheen Top Arc */}
                  <path
                    d="M 0 18 Q 109 4 218 18 L 218 0 L 0 0 Z"
                    fill="rgba(255, 255, 255, 0.1)"
                  />

                  {/* Avatar with Golden Aura */}
                  <circle
                    cx="36"
                    cy="40"
                    r="16"
                    fill="#fbbf24"
                    className="wid-sun-avatar"
                  />
                  <circle cx="36" cy="40" r="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                  {/* Typography Display "Aa" */}
                  <text
                    x="70"
                    y="50"
                    fill="#ffffff"
                    fontFamily="Bricolage Grotesque, system-ui, sans-serif"
                    fontSize="34"
                    fontWeight="800"
                    letterSpacing="-1.5"
                    className="wid-glyph-aa"
                  >
                    Aa
                  </text>

                  {/* Type Spec Pill */}
                  <rect
                    x="132"
                    y="32"
                    width="72"
                    height="16"
                    rx="8"
                    fill="rgba(0, 0, 0, 0.2)"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="168"
                    y="43"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                  >
                    Display · 34px
                  </text>

                  {/* Visual Hierarchy: Headline Bar */}
                  <rect
                    x="22"
                    y="76"
                    width="150"
                    height="7"
                    rx="3.5"
                    fill="#ffffff"
                    opacity="0.95"
                    className="wid-line-primary"
                  />

                  {/* Visual Hierarchy: Subhead Bar */}
                  <rect
                    x="22"
                    y="90"
                    width="110"
                    height="5.5"
                    rx="2.75"
                    fill="#ffffff"
                    opacity="0.6"
                    className="wid-line-secondary"
                  />

                  {/* Visual Hierarchy: Caption Line */}
                  <rect
                    x="22"
                    y="102"
                    width="70"
                    height="5"
                    rx="2.5"
                    fill="#ffffff"
                    opacity="0.35"
                  />

                  {/* Elevated White Glass CTA Button */}
                  <rect
                    x="22"
                    y="118"
                    width="96"
                    height="22"
                    rx="11"
                    fill="#ffffff"
                    className="wid-white-pill-btn"
                  />
                  <text
                    x="70"
                    y="132"
                    textAnchor="middle"
                    fill="#0f766e"
                    fontSize="9.5"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="700"
                  >
                    View Layout →
                  </text>
                </g>
              </svg>
            </div>

            <div className="wid-card-body">
              <h3 className="wid-card-title">{services[2].title}</h3>
              <p className="wid-card-desc">{services[2].description}</p>
              <div className="wid-card-footer">
                <div className="wid-tags">
                  {services[2].tags.map((tag) => (
                    <span key={tag} className="wid-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Design systems (Figma Component Kit & Living Design System) */}
          <div className="wid-card" key={services[3].id}>
            <div className="wid-card-preview wid-preview-designsys">
              <div className="wid-preview-glow wid-glow-indigo" />
              <svg
                viewBox="0 0 340 180"
                className="wid-svg-canvas"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background dot grid pattern */}
                <pattern
                  id="ds-dots"
                  x="0"
                  y="0"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#ds-dots)" />

                {/* Ambient glow behind window */}
                <circle cx="170" cy="90" r="70" fill="url(#ds-ambient-glow)" opacity="0.6" />
                <defs>
                  <radialGradient id="ds-ambient-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="btn-grad-ds" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                  <linearGradient id="ds-window-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#090d16" stopOpacity="0.98" />
                  </linearGradient>
                </defs>

                {/* ── Main Component System Window Card ── */}
                <g className="wid-ds-window">
                  {/* Window Base Container */}
                  <rect
                    x="20"
                    y="14"
                    width="300"
                    height="152"
                    rx="16"
                    fill="url(#ds-window-bg)"
                    stroke="rgba(129, 140, 248, 0.25)"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 14px 30px rgba(0, 0, 0, 0.6))"
                  />

                  {/* Window Top Titlebar */}
                  <line
                    x1="20"
                    y1="38"
                    x2="320"
                    y2="38"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />

                  {/* 3 macOS / Figma Control Dots */}
                  <circle cx="36" cy="26" r="3.5" fill="#f43f5e" opacity="0.85" />
                  <circle cx="48" cy="26" r="3.5" fill="#fbbf24" opacity="0.85" />
                  <circle cx="60" cy="26" r="3.5" fill="#34d399" opacity="0.85" />

                  {/* Window File Name */}
                  <text
                    x="170"
                    y="29"
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.45)"
                    fontSize="10"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="500"
                    letterSpacing="0.3"
                  >
                    ❖ design-system.fig · master
                  </text>

                  {/* Version Pill */}
                  <rect
                    x="264"
                    y="20"
                    width="44"
                    height="14"
                    rx="7"
                    fill="rgba(99, 102, 241, 0.18)"
                    stroke="rgba(129, 140, 248, 0.35)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="286"
                    y="30"
                    textAnchor="middle"
                    fill="#a5b4fc"
                    fontSize="8.5"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                  >
                    v2.4
                  </text>

                  {/* ── Left Column: Primary Components ── */}
                  {/* Master Primary Button */}
                  <g className="wid-ds-btn-wrap">
                    <rect
                      x="36"
                      y="52"
                      width="124"
                      height="32"
                      rx="16"
                      fill="url(#btn-grad-ds)"
                      stroke="rgba(165, 180, 252, 0.4)"
                      strokeWidth="1"
                      className="wid-ds-main-btn"
                    />
                    <text
                      x="98"
                      y="72"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="600"
                      letterSpacing="0.2"
                    >
                      ❖ Primary
                    </text>
                  </g>

                  {/* Input Search Field */}
                  <g className="wid-ds-input-wrap">
                    <rect
                      x="36"
                      y="94"
                      width="124"
                      height="28"
                      rx="8"
                      fill="rgba(255, 255, 255, 0.04)"
                      stroke="rgba(129, 140, 248, 0.25)"
                      strokeWidth="1"
                      className="wid-ds-input-box"
                    />
                    {/* Search Icon */}
                    <circle
                      cx="48"
                      cy="108"
                      r="4"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1.2"
                    />
                    <line
                      x1="51"
                      y1="111"
                      x2="55"
                      y2="115"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <text
                      x="62"
                      y="112"
                      fill="rgba(255, 255, 255, 0.4)"
                      fontSize="9.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      Search tokens...
                    </text>
                    {/* Blinking Cursor */}
                    <line
                      x1="138"
                      y1="102"
                      x2="138"
                      y2="114"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      className="wid-ds-blink-cursor"
                    />
                  </g>

                  {/* Interactive Slider Bar */}
                  <g className="wid-ds-slider-wrap">
                    {/* Background Track */}
                    <line
                      x1="36"
                      y1="138"
                      x2="160"
                      y2="138"
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Active Fill Line */}
                    <line
                      x1="36"
                      y1="138"
                      x2="55"
                      y2="138"
                      stroke="#6366f1"
                      strokeWidth="4"
                      strokeLinecap="round"
                    >
                      <animate
                        attributeName="x2"
                        values="55; 125; 55"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                        keyTimes="0; 0.5; 1"
                      />
                    </line>
                    {/* Draggable Slider Thumb */}
                    <circle
                      cx="55"
                      cy="138"
                      r="6"
                      fill="#ffffff"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                    >
                      <animate
                        attributeName="cx"
                        values="55; 125; 55"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                        keyTimes="0; 0.5; 1"
                      />
                    </circle>
                  </g>

                  {/* ── Right Column: Interactive Controls & Token Swatches ── */}
                  {/* Sliding Toggle Switch */}
                  <g className="wid-ds-toggle-wrap">
                    <rect
                      x="176"
                      y="52"
                      width="52"
                      height="30"
                      rx="15"
                      className="wid-ds-toggle-track"
                    />
                    <g className="wid-ds-toggle-thumb-wrap">
                      <circle
                        cx="214"
                        cy="67"
                        r="10.5"
                        fill="#ffffff"
                        filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))"
                        className="wid-ds-toggle-thumb"
                      />
                    </g>
                    <text
                      x="238"
                      y="71"
                      fill="rgba(255, 255, 255, 0.75)"
                      fontSize="10"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="500"
                    >
                      Active
                    </text>
                  </g>

                  {/* Segmented Control Pill (Light / Dark) */}
                  <g className="wid-ds-segment-wrap">
                    <rect
                      x="176"
                      y="94"
                      width="128"
                      height="26"
                      rx="13"
                      fill="rgba(255, 255, 255, 0.04)"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="1"
                    />
                    {/* Active Tab Pill */}
                    <g className="wid-ds-segment-pill-wrap">
                      <rect
                        x="178"
                        y="96"
                        width="60"
                        height="22"
                        rx="11"
                        fill="#4f46e5"
                        className="wid-ds-segment-pill"
                      />
                    </g>
                    <text
                      x="208"
                      y="110"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="600"
                    >
                      Light
                    </text>
                    <text
                      x="268"
                      y="110"
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.45)"
                      fontSize="9.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="500"
                    >
                      Dark
                    </text>
                  </g>

                  {/* Living Color Tokens Row */}
                  <g className="wid-ds-tokens-shelf">
                    {/* Token 1: Indigo */}
                    <circle cx="188" cy="138" r="7" fill="#6366f1" className="wid-gem-1" />
                    {/* Token 2: Rose */}
                    <circle cx="212" cy="138" r="7" fill="#f43f5e" className="wid-gem-2" />
                    {/* Token 3: Emerald */}
                    <circle cx="236" cy="138" r="7" fill="#10b981" className="wid-gem-3" />
                    {/* Token 4: Amber */}
                    <circle cx="260" cy="138" r="7" fill="#f59e0b" className="wid-gem-4" />
                    {/* Token 5: Cyan */}
                    <circle cx="284" cy="138" r="7" fill="#06b6d4" className="wid-gem-5" />
                  </g>
                </g>

              </svg>
            </div>

            <div className="wid-card-body">
              <h3 className="wid-card-title">{services[3].title}</h3>
              <p className="wid-card-desc">{services[3].description}</p>
              <div className="wid-card-footer">
                <div className="wid-tags">
                  {services[3].tags.map((tag) => (
                    <span key={tag} className="wid-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
