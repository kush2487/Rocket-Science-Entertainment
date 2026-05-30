import { useState, useEffect, useCallback, useRef } from 'react'
import YouTube from 'react-youtube'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const VIDEO_IDS = ['xr27fg5bVK8', '9KfANH2K3WE', '8tpbYNE4VMg', 'jdQeBIL6nvA']

// Stagger container + child variants
const titleContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}
const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

function useDesktopParallax(sectionRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isDesktop ? y : '0%'
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [_direction, setDirection] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)
  const blobY = useDesktopParallax(sectionRef)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent((idx + VIDEO_IDS.length) % VIDEO_IDS.length)
  }, [])

  const next = () => goTo(current + 1, 1)
  const prev = () => goTo(current - 1, -1)

  useEffect(() => {
    const timer = setInterval(next, 15000)
    return () => clearInterval(timer)
  }, [current])

  const opts = {
    playerVars: {
      autoplay: 1 as const,
      mute: 1 as const,
      controls: 0 as const,
      loop: 0 as const,
      rel: 0 as const,
      modestbranding: 1 as const,
      showinfo: 0 as const,
      iv_load_policy: 3 as const,
      disablekb: 1 as const,
    },
  }

  return (
    <section ref={sectionRef} id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Ambient radial glow blob — parallax on desktop */}
      <motion.div
        style={{ y: blobY, background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.07) 0%, transparent 70%)' }}
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full z-[5]"
      />

      {/* Video layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 yt-cover"
        >
          <YouTube
            videoId={VIDEO_IDS[current]}
            opts={opts}
            onReady={(e) => { e.target.playVideo() }}
            onEnd={next}
            className="absolute inset-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/75 z-10" />

      {/* Text overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">

        {/* Word-by-word stagger on ROCKET SCIENCE */}
        <motion.div
          variants={titleContainer}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-x-5 text-5xl sm:text-7xl font-black tracking-widest uppercase mb-4"
        >
          {['Rocket', 'Science'].map((word, i) => (
            <motion.span
              key={word}
              variants={wordVariant}
              className={i === 1 ? 'text-amber-400' : 'text-white'}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-2xl text-white/80 tracking-[0.3em] uppercase font-light"
        >
          Entertainment
        </motion.p>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-4 text-amber-400 text-sm tracking-[0.4em] uppercase"
        >
          Lights · Camera · Launch 
        </motion.p>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-amber-400/80 text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-amber-400/80 text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {VIDEO_IDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-amber-400 scale-125' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
