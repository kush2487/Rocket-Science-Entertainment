import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import YouTube from 'react-youtube'
import { Play } from 'lucide-react'

const VIDEOS = [
  { id: 'xr27fg5bVK8', title: 'RSE Showreel 2024' },
  { id: '9KfANH2K3WE', title: 'Behind the Lens' },
  { id: '8tpbYNE4VMg', title: 'Campaign Highlights' },
  { id: 'jdQeBIL6nvA', title: 'Short Film — Launch' },
]

function VideoCard({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden bg-[#111] border border-white/10 hover:border-amber-400/40 hover:shadow-[0_0_28px_rgba(251,191,36,0.12)] transition-all duration-300 group"
    >
      {playing ? (
        <div className="aspect-video">
          <YouTube
            videoId={video.id}
            opts={{ playerVars: { autoplay: 1, controls: 1 } }}
            className="w-full h-full"
            iframeClassName="w-full h-full"
          />
        </div>
      ) : (
        <div
          className="relative aspect-video cursor-pointer overflow-hidden"
          onClick={() => setPlaying(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={26} className="text-black ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-semibold text-sm tracking-wide">{video.title}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function OurWork() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="work" className="relative py-24 px-4 sm:px-8 bg-[#080808] overflow-hidden">
      {/* Ambient glow blob — offset right */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 w-[600px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.05) 0%, transparent 65%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-amber-400 tracking-[0.4em] uppercase text-sm mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Our Previous <span className="text-amber-400">Work</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
