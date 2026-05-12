import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/work',     label: 'Work'     },
  { to: '/projects', label: 'Projects' },
  { to: '/contact',  label: 'Contact'  },
]

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="2.5" />
      <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.93 2.93l1.06 1.06M11.01 11.01l1.06 1.06M2.93 12.07l1.06-1.06M11.01 3.99l1.06-1.06" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M12.5 9.5A6 6 0 014.5 1.5a6 6 0 108 8z" />
    </svg>
  )
}

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setScrolled(v > 0.015))
    return unsub
  }, [scrollYProgress])

  // Close menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[200] h-px origin-left"
        style={{ scaleX: scrollYProgress, background: 'var(--accent)' }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 h-16"
        style={{
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backgroundColor: scrolled || mobileOpen
            ? (dark ? 'rgba(9,9,11,0.95)' : 'rgba(244,243,238,0.95)')
            : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <NavLink to="/" className="font-mono text-sm font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          PC_
        </NavLink>

        {/* Desktop nav — absolutely centered */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="relative text-[11px] uppercase tracking-widest py-1 transition-colors duration-300 group"
              style={({ isActive }) => ({ color: isActive ? 'var(--text)' : 'var(--text-muted)' })}
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%', background: 'var(--accent)' }}
                  />
                  {!isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: 'var(--border-hover)' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
            style={{ color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
            style={{ color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M2 2l10 10M12 2L2 12" />
              ) : (
                <path d="M1 3.5h12M1 7h12M1 10.5h12" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'var(--bg)', paddingTop: '64px' }}
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-1">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="block font-bold tracking-tight py-4 px-8 text-center transition-colors duration-200"
                    style={({ isActive }) => ({
                      fontSize: 'clamp(28px, 8vw, 42px)',
                      color: isActive ? 'var(--accent-text)' : 'var(--text)',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.p
              className="font-mono text-[10px] uppercase tracking-widest text-center pb-10"
              style={{ color: 'var(--text-subtle)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Pranshu Chadda · 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
