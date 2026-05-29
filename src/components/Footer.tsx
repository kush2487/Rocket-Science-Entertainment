import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail } from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-black text-white tracking-widest mb-2">
              ROCKET<span className="text-amber-400">SCIENCE</span>
            </h2>
            <p className="text-white/50 text-sm mb-8 tracking-widest">ENTERTAINMENT</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/70 text-sm leading-relaxed">
                  Rocket Science Entertainment<br />
                  JP Nagar, Bangalore<br />
                  Karnataka, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <a
                  href="mailto:hello@rocketscienceentertainment.com"
                  className="text-white/70 text-sm hover:text-amber-400 transition-colors"
                >
                  hello@rocketscienceentertainment.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramIcon size={18} className="text-amber-400 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/rocketscienceentertainment"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 text-sm hover:text-amber-400 transition-colors"
                >
                  @rocketscienceentertainment
                </a>
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-xl overflow-hidden border border-white/10 h-64"
          >
            <iframe
              title="RSE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5879843839207!2d77.5826!3d12.9082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14e46fbda8b3%3A0x5a2a9e4e6d1eaa3!2sJP%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) invert(10%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Rocket Science Entertainment. All rights reserved.</p>
          <p className="tracking-widest">LIGHTS · CAMERA · LAUNCH </p>
        </div>
      </div>
    </footer>
  )
}
