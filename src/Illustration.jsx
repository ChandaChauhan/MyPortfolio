// Original illustration: a monitor surrounded by floating code windows.
const widths = [70, 110, 50, 90, 120, 60, 100, 80];

function CodeWindow({ x, y, w = 150, h = 120, seed = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) matrix(0.866 -0.5 0 1 0 0)`}>
      <rect width={w} height={h} rx="6" fill="#1a1a26" fillOpacity=".85" stroke="#4a4a6a" />
      {["#e5534b", "#e3b341", "#57ab5a"].map((c, i) => (
        <circle key={c} cx={12 + i * 11} cy="11" r="3" fill={c} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="14" y={28 + i * 14} width={widths[(i + seed) % 8] * (w / 150)} height="5" rx="2.5"
          fill={i % 3 === 0 ? "#B65CF0" : "#6b6b8d"} fillOpacity={i % 3 === 0 ? 0.9 : 0.7} />
      ))}
    </g>
  );
}

export default function Illustration() {
  return (
    <svg viewBox="0 0 560 520" role="img" aria-label="Illustration of a monitor surrounded by floating code windows" className="illo">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#B65CF0" stopOpacity=".55" />
          <stop offset="1" stopColor="#B65CF0" stopOpacity="0" />
        </radialGradient>
        <pattern id="keys" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="1.5" width="12" height="12" rx="2.5" fill="#d9dbe8" />
        </pattern>
      </defs>

      <ellipse cx="290" cy="270" rx="250" ry="200" fill="url(#glow)" opacity=".35" />

      <CodeWindow x={20} y={150} w={130} h={150} seed={1} />
      <CodeWindow x={250} y={70} w={170} h={110} seed={3} />
      <CodeWindow x={420} y={190} w={120} h={150} seed={5} />

      {/* monitor */}
      <g transform="translate(150 215) matrix(0.866 -0.5 0 1 0 0)">
        <rect width="270" height="200" rx="10" fill="#22222f" stroke="#55557a" strokeWidth="2" />
        <rect x="12" y="12" width="246" height="176" rx="6" fill="#14141d" />
        <circle cx="135" cy="100" r="62" fill="#B65CF0" />
        <text x="135" y="112" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff"
          fontFamily="monospace">&lt;/&gt;</text>
      </g>
      <polygon points="270,430 330,400 330,425 270,455" fill="#3a3a52" />

      {/* keyboard */}
      <g transform="translate(210 440) matrix(0.866 -0.5 0 1 0 0) scale(1 .45)">
        <rect width="230" height="80" rx="6" fill="#2b2b3d" />
        <rect x="8" y="8" width="214" height="64" fill="url(#keys)" />
      </g>

      {/* mug */}
      <g transform="translate(455 440)">
        <ellipse cx="0" cy="44" rx="24" ry="8" fill="#000" opacity=".3" />
        <rect x="-22" y="0" width="44" height="44" rx="6" fill="#e9e9f2" />
        <ellipse cx="0" cy="0" rx="22" ry="7" fill="#7a5a43" />
        <path d="M22 10 q16 0 16 14 q0 14 -16 14" fill="none" stroke="#e9e9f2" strokeWidth="6" />
      </g>
    </svg>
  );
}
