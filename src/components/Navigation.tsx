export default function Navigation({ activeScene }: { activeScene?: number }) {
  const sceneLabels = [
    '01 MODEL',
    '02 CAPABILITIES',
    '03 CONTEXT',
    '04 ACCESS'
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center mix-blend-difference text-paper font-sans text-xs tracking-widest uppercase">
      <div className="font-display text-sm tracking-tighter">K3</div>
      <ul className="flex gap-8 hidden md:flex">
        {sceneLabels.map((label, i) => (
          <li 
            key={i} 
            className={`transition-opacity duration-300 ${activeScene === i ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
          >
            {label}
          </li>
        ))}
      </ul>
      <a 
        href="https://openrouter.ai" 
        target="_blank" 
        rel="noreferrer" 
        className="group flex items-center gap-2 hover:text-signal transition-colors"
      >
        <span>TRY K3</span>
        <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
      </a>
    </nav>
  );
}
