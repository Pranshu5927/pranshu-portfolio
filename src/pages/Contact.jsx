import { useRef } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pranshu-chadda', handle: 'pranshu-chadda' },
  { label: 'GitHub',   href: 'https://github.com/Pranshu5927',          handle: 'Pranshu5927'    },
]

function Magnetic({ children, href, className, target }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.22}px)`
    el.style.transition = 'transform 0.1s ease'
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transform = 'translate(0,0)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
  }
  return (
    <a ref={ref} href={href} target={target} rel="noreferrer"
      className={className} onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
    </a>
  )
}

export default function Contact() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col pt-28 pb-20 px-6 md:px-16" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-between">

          <div>
            <motion.p
              className="font-mono text-[10px] uppercase tracking-widest mb-14"
              style={{ color: 'var(--text-subtle)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Get in touch
            </motion.p>

            <motion.h1
              className="font-bold tracking-tight leading-tight mb-12"
              style={{ fontSize: 'clamp(40px, 7vw, 92px)', color: 'var(--text)' }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Let's build<br />
              <span style={{ color: 'var(--accent)' }}>something.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Magnetic
                href="mailto:pranshu.chadda05@gmail.com"
                className="inline-block font-mono text-sm md:text-lg pb-1 transition-all duration-300 mb-14"
                style={{
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                }}
                onMouseOver={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderBottomColor = 'var(--text)' }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderBottomColor = 'var(--border)' }}
              >
                pranshu.chadda05@gmail.com
              </Magnetic>
            </motion.div>

            {/* Social cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-5 rounded-xl transition-all duration-300 group"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)' }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-surface)' }}
                >
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>{s.label}</p>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-subtle)' }}>@{s.handle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 10 10" fill="none" style={{ color: 'var(--text-subtle)' }}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className="flex items-center justify-between pt-16 mt-16"
            style={{ borderTop: '1px solid var(--border)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
              Pranshu Chadda · 2026
            </span>
            {/* <span className="font-mono text-[10px]" style={{ color: 'var(--text-subtle)' }}>
              Built with React + Framer Motion
            </span> */}
          </motion.div>

        </div>
      </div>
    </PageTransition>
  )
}
