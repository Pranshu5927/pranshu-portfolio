import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const projects = [
  {
    num: '01',
    title: 'Travel AI Agent',
    year: '2025',
    category: 'Agentic AI · Personal Project',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
    description: 'End-to-end agentic AI system for travel planning. Users describe their trip and a multi-agent pipeline handles the rest — a planner agent decomposes the request, specialist agents search flights, hotels, and attractions via live APIs, a budget agent optimises costs, and an itinerary agent assembles a day-by-day plan. Built with LangGraph for stateful multi-step orchestration.',
    outcome: 'Full trip planned and booked end-to-end in a single conversational pass.',
    tech: ['Python', 'LangGraph', 'LangChain', 'OpenAI API', 'FastAPI', 'Streamlit'],
    link: 'https://github.com/Pranshu5927',
  },
  {
    num: '02',
    title: 'RAG-powered Document Intelligence',
    year: '2024',
    category: 'Gen AI · Personal Project',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #8b5cf6 100%)',
    description: 'End-to-end Retrieval-Augmented Generation (RAG) system for question-answering over large document corpora. Built a pipeline for chunking, embedding, and indexing documents into a FAISS vector store. Integrated with an LLM for context-aware answer generation with source attribution. Deployed as a FastAPI service with streaming responses.',
    outcome: 'Accurate, grounded answers with citations — zero hallucinations on factual queries.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FAISS', 'FastAPI', 'HuggingFace Embeddings', 'Docker'],
    link: 'https://github.com/Pranshu5927',
  },
  {
    num: '03',
    title: 'Netflix-style Recommendation Engine',
    year: '2024',
    category: 'ML · Personal Project',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    description: 'Hybrid recommendation system combining collaborative filtering (matrix factorisation via SVD) with content-based filtering (TF-IDF + cosine similarity on item metadata) and a neural two-tower model for embedding-based retrieval. Trained on the MovieLens dataset. A Streamlit app lets users rate items and receive real-time personalised recommendations.',
    outcome: 'Outperforms popularity-based baselines by 34% on NDCG@10 across cold-start and warm users.',
    tech: ['Python', 'PyTorch', 'Scikit-learn', 'SVD', 'Two-Tower Model', 'Streamlit', 'Pandas'],
    link: 'https://github.com/Pranshu5927',
  },
  {
    num: '04',
    title: 'Credit Card Fraud Detection',
    year: '2022',
    category: 'ML · Security · Personal Project',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)',
    description: 'Supervised classification model addressing severe class imbalance using SMOTE oversampling and optimising the precision-recall tradeoff for minority fraud cases with XGBoost and an ensemble approach. Extended with an OpenCV face recognition module as a second-factor authentication layer to flag high-risk transactions for biometric verification.',
    outcome: 'Improved minority-class recall by 22% vs. baseline while maintaining precision above 91%.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'SMOTE', 'OpenCV', 'Pandas'],
    link: 'https://github.com/Pranshu5927',
  },
]

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      onMouseOver={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Gradient thumbnail */}
      <div className="h-32 w-full flex items-end p-5" style={{ background: project.gradient }}>
        <span className="font-mono text-white/70 text-[11px] uppercase tracking-widest">{project.category}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest mb-1 block" style={{ color: 'var(--text-subtle)' }}>
              {project.num} · {project.year}
            </span>
            <h3 className="font-bold text-base tracking-tight leading-snug" style={{ color: 'var(--text)' }}>
              {project.title}
            </h3>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 shrink-0 ml-3"
            style={{ border: '1px solid var(--border)', color: 'var(--text-subtle)' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-text)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-subtle)' }}
          >
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <button className="w-full text-left" onClick={() => setOpen(o => !o)}>
          <AnimatePresence initial={false} mode="wait">
            {!open ? (
              <motion.p key="short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}
              >
                {project.description}
              </motion.p>
            ) : (
              <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>
                <p className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>
                  ↳ {project.outcome}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="font-mono text-[10px] px-2 py-1"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-text)', border: '1px solid transparent' }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="font-mono text-[10px] px-2 py-1" style={{ color: 'var(--text-subtle)' }}>
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--text-subtle)' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-text)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-subtle)'}
          >
            {open ? 'Less ↑' : 'More ↓'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-6 md:px-16" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
              Selected Work
            </p>
            <h1 className="font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(32px, 5vw, 58px)', color: 'var(--text)', lineHeight: 1.1 }}>
              Personal Projects
            </h1>
            <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Production systems and research projects across agentic AI, RAG, fine-tuning, and LLM engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
