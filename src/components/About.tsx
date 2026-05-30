import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef(null)
  const inView = useInView(contentRef, { once: true, margin: '-100px' })

  // Desktop-only parallax
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], ['-10%', '15%'])

  return (
    <section ref={sectionRef} id="about" className="relative py-24 px-4 sm:px-8 bg-[#0a0a0a] overflow-hidden">
      {/* Ambient glow blob — offset left, parallax desktop */}
      <motion.div
        style={{
          y: isDesktop ? blobY : '0%',
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.06) 0%, transparent 65%)',
        }}
        className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={contentRef}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-amber-400 tracking-[0.4em] uppercase text-sm mb-4 font-medium"
        >
          Lights · Camera · Launch 
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-8"
        >
          About <span className="text-amber-400">Us</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-white/70 text-lg leading-relaxed"
        >
          <p>
            Rocket Science Entertainment is a Bangalore-based creative production house dedicated to
            crafting compelling digital content that resonates with modern audiences. From high-energy
            showreels to narrative-driven short films, we blend technical precision with artistic vision.
          </p>
          <p>
            Our team of storytellers, cinematographers, and editors work together to launch ideas into orbit —
            transforming concepts into cinematic experiences that leave a lasting impact. Whether it's a brand
            campaign, a web series, or a viral moment, we make it happen.
          </p>
          <p>
            Based in JP Nagar, Bangalore, we collaborate with brands, creators, and dreamers who believe that
            great content is the most powerful currency of the digital age.
          </p>
        </motion.div>

        {/* Shimmer divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 shimmer-divider"
        />
      </div>
    </section>
  )
}
