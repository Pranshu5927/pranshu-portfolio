import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const interests = [
  'Large Language Models', 'Agentic AI Systems', 'RAG Pipelines',
  'Machine Learning', 'Predictive Modelling', 'Prompt Engineering',
  'LLM Fine-tuning', 'MLOps', 'AI Product Development',
]

const SCRAMBLE = '!<>-_\\/[]{}=+*^?#~@'

function useScramble(text, delay = 0) {
  const [out, setOut] = useState(text.replace(/\S/g, '_'))
  useEffect(() => {
    const t = setTimeout(() => {
      let frame = 0
      const total = text.length * 4
      const id = setInterval(() => {
        setOut(text.split('').map((c, i) => {
          if (c === ' ') return ' '
          return i < frame / 4 ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
        }).join(''))
        if (++frame > total) clearInterval(id)
      }, 28)
    }, delay)
    return () => clearTimeout(t)
  }, [text, delay])
  return out
}

function MagneticLink({ children, to, style, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`
    el.style.transition = 'transform 0.1s ease'
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transform = 'translate(0,0)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
  }
  return (
    <Link ref={ref} to={to} className={className} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Link>
  )
}

const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
}
const charVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.65 } },
}

function AnimatedName({ text, accentLast = false }) {
  return (
    <motion.span variants={nameContainer} initial="hidden" animate="visible" style={{ display: 'flex' }}>
      {text.split('').map((c, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={charVariant}
            style={{ display: 'inline-block', color: (accentLast && i === text.length - 1) ? 'var(--accent)' : 'inherit' }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

function BentoCard({ children, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', ...style }}
      onMouseOver={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {children}
    </motion.div>
  )
}

function CardLabel({ children }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>
      {children}
    </p>
  )
}

export default function Home() {
  const role    = useScramble('Data Science Analyst', 750)
  const company = useScramble('JP Morgan Chase & Co.', 1150)

  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-28 md:pt-[148px] pb-16 md:pb-20"
        style={{ paddingLeft: '6vw', paddingRight: '6vw', background: 'var(--bg)' }}
      >
        {/* Blobs */}
        <div aria-hidden style={{
          position: 'absolute', top: '-8%', right: '-6%',
          width: 640, height: 640,
          background: 'radial-gradient(circle at 40% 40%, var(--accent), transparent 65%)',
          opacity: 0.07, borderRadius: '50%', filter: 'blur(72px)',
          animation: 'blob 11s ease-in-out infinite', pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '10%', left: '-4%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, var(--accent), transparent 65%)',
          opacity: 0.05, borderRadius: '50%', filter: 'blur(60px)',
          animation: 'blob 14s ease-in-out infinite reverse', pointerEvents: 'none',
        }} />

        {/* Open to work badge */}
        <motion.div
          className="flex items-center gap-2 mb-10 z-10"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#22c55e' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <div className="z-10 mb-6 select-none" style={{ color: 'var(--text)' }}>
          <h1 style={{ fontSize: 'clamp(56px, 10.5vw, 144px)', letterSpacing: '-0.04em', fontWeight: 700, lineHeight: 0.9 }}>
            <AnimatedName text="Pranshu" />
            <AnimatedName text="Chadda." accentLast />
          </h1>
        </div>

        {/* Role */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-8 z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>{role}</span>
          <span style={{ width: 1, height: 14, background: 'var(--border-hover)', display: 'inline-block' }} />
          <span className="font-mono text-sm" style={{ color: 'var(--text-subtle)' }}>{company}</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="z-10 mb-9"
          style={{ height: 1, background: 'var(--border)', maxWidth: 600, transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.25, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Interest tags */}
        <motion.div
          className="flex flex-wrap gap-2.5 z-10 mb-11"
          style={{ maxWidth: 640 }}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.065, delayChildren: 1.4 } } }}
        >
          {interests.map(tag => (
            <motion.span
              key={tag}
              className="font-mono text-xs px-3.5 py-1.5 transition-all duration-250"
              style={{ color: 'var(--text-subtle)', border: '1px solid var(--border)' }}
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
              onMouseOver={e => { e.currentTarget.style.color = 'var(--accent-text)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)' }}
              onMouseOut={e => { e.currentTarget.style.color = 'var(--text-subtle)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-3 md:gap-4 z-10"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticLink
            to="/projects"
            className="text-xs uppercase tracking-widest font-semibold px-7 py-3.5 transition-colors duration-200"
            style={{ background: 'var(--text)', color: 'var(--bg)' }}
          >
            View Work
          </MagneticLink>
          <MagneticLink
            to="/contact"
            className="text-xs uppercase tracking-widest px-7 py-3.5 transition-all duration-300"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            Get In Touch
          </MagneticLink>
          <a
            href="/Pranshu_Chadda.pdf"
            download="Pranshu_Chadda.pdf"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-7 py-3.5 transition-all duration-300"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            onMouseOver={e => { e.currentTarget.style.color = 'var(--accent-text)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" />
            </svg>
            Resume
          </a>
        </motion.div>
      </section>

      {/* ── About / Bento ────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-24"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
              About me
            </p>
            <h2 className="font-bold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--text)', lineHeight: 1.1 }}>
              Building AI systems that<br /><span style={{ color: 'var(--accent)' }}>think, reason & act.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Bio — wide */}
            <BentoCard className="md:col-span-2">
              <CardLabel>Who I am</CardLabel>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                I'm a Data Science Analyst at JP Morgan Chase working across the full AI/ML stack —
                from classical machine learning and predictive modelling to production-grade Gen AI
                systems, LLM pipelines, and agentic workflows that surface insight at the executive level.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-subtle)' }}>
                I'm especially excited about the intersection of ML and Agentic AI — combining strong
                modelling fundamentals with LangGraph orchestration, RAG, and fine-tuning to build
                systems that don't just generate text, but actually reason and act on data.
              </p>
            </BentoCard>

            {/* Photo */}
            <BentoCard className="flex flex-col overflow-hidden !p-0" style={{ minHeight: 220 }}>
              <img
                src="/photo.png"
                alt="Pranshu Chadda"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: 260, borderRadius: '1rem' }}
              />
            </BentoCard>
            
            {/* Currently */}
            <BentoCard>
              <CardLabel>Currently</CardLabel>
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>JP Morgan Chase & Co.</p>
              <p className="text-xs mb-1" style={{ color: 'var(--accent-text)' }}>Data Science Analyst — FAST Team</p>
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Bengaluru · Jul 2024 – Present</p>
            </BentoCard>

            {/* Education */}
            <BentoCard>
              <CardLabel>Education</CardLabel>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>VIT Vellore</p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                B.Tech — CSE (Blockchain Technology)
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full" style={{ background: 'var(--accent-soft)' }}>
                <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-text)' }}>CGPA 9.06</span>
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-subtle)' }}>Sep 2020 – Jul 2024</p>
            </BentoCard>

            {/* Award */}
            <BentoCard>
              <CardLabel>Recognition</CardLabel>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>Innovation Champion</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Team Award · JP Morgan Chase Q3 2025 for building and deploying a team website.
                  </p>
                </div>
              </div>
            </BentoCard>

            

            {/* AI Stack */}
            <BentoCard className="md:col-span-2">
              <CardLabel>AI / ML Stack</CardLabel>
              <div className="flex flex-wrap gap-2">
                {[
                  'PyTorch', 'Scikit-learn', 'LangChain', 'LangGraph',
                  'OpenAI API', 'HuggingFace', 'RAG', 'Prompt Engineering', 'FastAPI', 'AWS',
                ].map(t => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent-text)', border: '1px solid var(--accent-soft)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </BentoCard>

          </div>
        </div>
      </section>
    </PageTransition>
  )
}
