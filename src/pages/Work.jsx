import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const FAST_DESCRIPTION = 'The Focused Analytics Solutions Team (FAST) develops and executes actionable data science and analytical solutions in a **consulting-style** environment, while emphasizing creative, practical problem-solving and superior client interaction. The team works on a large range of strategic, highly visible projects with various internal clients and analytics teams across our lines of business and corporate functions.'

function InfoTooltip({ text }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={e => e.stopPropagation()}
    >
      <span
        className="inline-flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 15, height: 15,
          border: '1px solid var(--text-subtle)',
          color: 'var(--text-subtle)',
          fontSize: 9, fontFamily: 'monospace', fontWeight: 700,
          cursor: 'default', marginLeft: 6, verticalAlign: 'middle',
        }}
      >
        i
      </span>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50"
            style={{
              bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
              width: 320, padding: '12px 14px',
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              borderRadius: 10, boxShadow: 'var(--shadow-md)', pointerEvents: 'none',
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={i} style={{ color: 'var(--text)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
                  : part
              )}
            </p>
            <span style={{
              position: 'absolute', bottom: -5, left: '50%',
              transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8,
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              borderTop: 'none', borderLeft: 'none',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

const roles = [
  {
    company: 'JP Morgan Chase & Co.',
    role: 'Data Science Analyst',
    team: 'FAST Team',
    location: 'Bengaluru',
    period: 'Jul 2024 — Present',
    type: 'Full-time',
    tags: ['Python', 'LLMs', 'Agentic AI', 'LangChain', 'SQL', 'Tableau', 'Alteryx', 'Clustering'],
    subTeams: [
      {
        name: 'Consumer Bank',
        points: [
          { impact: 'Compliance', text: 'Identified 7+ potential customer PII compliance issues; designed and deployed a Tableau dashboard integrated with an Alteryx data pipeline to proactively track and flag risks, supporting FDIC compliance.' },
          { impact: 'Executive', text: 'Analyzed affluent customer transaction patterns across Chase Financial Centers to assess multi-channel performance and segmentation — insights included in firm-level affluent strategy materials reviewed by the CEO of Consumer & Community Banking and the CEO of JPMorgan Chase.' },
        ],
      },
      {
        name: 'Connected Commerce',
        points: [
          { impact: 'Data Asset', text: 'Partnered with the Connected Commerce team to design and build a cross-workstream data asset enabling end-to-end customer journey analysis across 7 workstreams, supporting commerce strategy, personalization, and product integration initiatives.' },
          { impact: 'Scale', text: 'Integrated data spanning 25+ Chase products and services, creating a unified view of customer engagement across commerce ecosystems.' },
          { impact: 'Stakeholders', text: 'Conducted 50+ stakeholder and user interviews to define data requirements, key metrics, and high-impact use cases for cross-commerce integration.' },
          { impact: 'ML', text: 'Applied clustering and segmentation techniques on customer transaction and engagement data across Revenue Generators and Revenue Enablers, uncovering engagement patterns and monetization opportunities.' },
        ],
      },
      {
        name: 'Wealth Management',
        points: [
          { impact: 'Agentic AI', text: 'Developed an agentic AI-based competitive intelligence system leveraging LLMs to autonomously ingest and summarize external wealth management news, integrating insights with internal performance data to surface emerging trends and strategic opportunities.' },
          { impact: 'Text2SQL', text: 'Built a Text2SQL tool enabling natural language querying over structured financial databases, paired with a SQL Validator that verifies query correctness and safety before execution.' },
          { impact: 'Analytics', text: 'Handled ad-hoc analytics and quick-turnaround tasks to support Chase\'s Affluent Strategy in the Wealth Management space.' },
        ],
      },
    ],
  },
  {
    company: 'JP Morgan Chase & Co.',
    role: 'Data Analyst Intern',
    team: 'Marketing D&A Team',
    location: 'Bengaluru',
    period: 'Jan 2024 — Jun 2024',
    type: 'Internship',
    tags: ['Tableau', 'SQL', 'SAS', 'SAS Viya', 'Unix', 'Python'],
    points: [
      { impact: 'Dashboards', text: 'Built and delivered interactive Tableau dashboards integrating data from SQL and SAS to support marketing analytics reporting across teams.' },
      { impact: 'Automation', text: 'Developed a custom SAS Viya user tool with an HTML-based input form, enabling team members to programmatically trigger Unix queries and SAS workflows without manual scripting.' },
      { impact: 'Efficiency', text: 'Automated campaign performance reporting using SAS Tasks-based email triggers, improving timeliness and efficiency of marketing insights delivery.' },
    ],
  },
]

const skillGroups = [
  { label: 'Machine Learning',  items: ['PyTorch', 'Scikit-learn', 'Feature Engineering', 'Clustering', 'Classification', 'Regression', 'A/B Testing', 'Model Evaluation'] },
  { label: 'Gen AI & LLMs',     items: ['LangChain', 'LangGraph', 'OpenAI API', 'HuggingFace', 'Transformers', 'RAG', 'Prompt Engineering', 'Agentic AI'] },
  { label: 'Languages',         items: ['Python', 'SQL', 'C++'] },
  { label: 'MLOps & Cloud',     items: ['AWS', 'FastAPI', 'Git'] },
  { label: 'Data & Analytics',  items: ['Pandas', 'Spark', 'Tableau', 'Alteryx', 'SAS'] },
  { label: 'Certifications',    items: ['AWS Certified Cloud Practitioner (CCP)', 'NPTEL — Data Science for Engineers'] },
]

function PointsList({ points }) {
  return (
    <ul className="space-y-4">
      {points.map((p, i) => (
        <li key={i} className="flex gap-4">
          <span
            className="font-mono text-[10px] uppercase tracking-widest shrink-0 mt-0.5 pt-0.5"
            style={{ color: 'var(--accent-text)', minWidth: 80 }}
          >
            {p.impact}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {p.text}
          </p>
        </li>
      ))}
    </ul>
  )
}

function SubTeamTabs({ subTeams }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'var(--bg-hover)', width: 'fit-content' }}>
        {subTeams.map((st, i) => (
          <button
            key={st.name}
            onClick={() => setActive(i)}
            className="relative px-4 py-2 rounded-lg text-xs font-mono transition-colors duration-200"
            style={{ color: active === i ? 'var(--text)' : 'var(--text-subtle)' }}
          >
            {active === i && (
              <motion.span
                layoutId="tab-bg"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              />
            )}
            <span className="relative z-10">{st.name}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <PointsList points={subTeams[active].points} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function RoleCard({ role, index }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        className="w-full flex items-start justify-between py-7 text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
              {role.period}
            </span>
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent-text)' }}
            >
              {role.type}
            </span>
          </div>
          <h3
            className="text-lg font-semibold tracking-tight mb-0.5 transition-colors duration-300 flex items-center"
            style={{ color: open ? 'var(--accent-text)' : 'var(--text)' }}
          >
            {role.role} — {role.team}
            {role.team === 'FAST Team' && <InfoTooltip text={FAST_DESCRIPTION} />}
          </h3>
          <p className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{role.company}</p>
        </div>
        <motion.span
          className="mt-1 shrink-0 ml-8"
          style={{ color: 'var(--text-subtle)' }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {role.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1"
                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Sub-team tabs or flat list */}
              {role.subTeams
                ? <SubTeamTabs subTeams={role.subTeams} />
                : <PointsList points={role.points} />
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Work() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-6 md:px-16" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
              Experience
            </p>
            <h1 className="font-bold tracking-tight" style={{ fontSize: 'clamp(32px, 5vw, 58px)', color: 'var(--text)', lineHeight: 1.1 }}>
              Work History
            </h1>
          </motion.div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {roles.map((r, i) => <RoleCard key={i} role={r} index={i} />)}
          </div>

          <div className="mt-20">
            <motion.p
              className="font-mono text-[10px] uppercase tracking-widest mb-10"
              style={{ color: 'var(--text-subtle)' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              Skills & Tools
            </motion.p>
            <div className="space-y-5">
              {skillGroups.map((g, i) => (
                <motion.div
                  key={g.label}
                  className="flex gap-8 md:gap-14 items-baseline pb-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="w-36 shrink-0 font-mono text-[10px] uppercase tracking-widest pt-0.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {g.label}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {g.items.join(' · ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
