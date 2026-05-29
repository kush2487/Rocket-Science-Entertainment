const TAGS = [
  'Showreels',
  'Short Films',
  'Brand Campaigns',
  'Web Series',
  'Music Videos',
  'Ad Films',
  'Corporate Films',
  'Documentary',
  'Narrative Content',
  'Digital Stories',
]

// Duplicate for seamless infinite loop
const ROW = [...TAGS, ...TAGS]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex whitespace-nowrap w-max ${reverse ? 'marquee-right' : 'marquee-left'}`}>
        {ROW.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-5 py-2 mx-2 rounded-full border border-white/10 text-white/50 text-sm tracking-widest uppercase bg-white/[0.03] hover:border-amber-400/30 hover:text-white/70 transition-colors duration-300"
          >
            <span className="text-amber-400/60 text-xs">·</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative py-12 bg-[#080808] overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

      <MarqueeRow reverse={false} />
      <MarqueeRow reverse={true} />
    </section>
  )
}
