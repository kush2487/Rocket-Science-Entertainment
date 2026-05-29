import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function SisterChannels() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sister" className="py-24 px-4 sm:px-8 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-amber-400 tracking-[0.4em] uppercase text-sm mb-3"
          >
            Our Family
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Sister <span className="text-amber-400">Channels</span>
          </motion.h2>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.12)] transition-all duration-300 group bg-[#111]"
          >
            {/* Logo display area */}
            <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-8">
              <img
                src="/assets/machine-dreams-logo.png"
                alt="Machine Dreams Productions"
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>

            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-2">Machine Dreams Productions</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                A creative production studio exploring the intersection of technology, dreams, and storytelling.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:gap-3 transition-all"
              >
                Visit Channel <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Shimmer divider */}
      <div className="mt-16 shimmer-divider" />
    </section>
  )
}
