import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: 'mailto:jesrilanka@gmail.com', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  function openResumeAssistant() {
    import('./ResumeAssistant').then((mod) => {
      mod.showResumeAssistant.setState(() => true)
    })
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto">
      <div className="glass-nav rounded-full px-8 py-3 flex items-center gap-10 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-primary to-secondary rotate-45 group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-bold tracking-tighter text-lg bg-clip-text text-transparent bg-linear-to-b from-white to-white/40">
            JE.
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
          <button
            onClick={openResumeAssistant}
            className="hidden md:inline-flex px-4 py-1.5 bg-primary text-white text-[12px] font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(55,147,255,0.3)] cursor-pointer leading-none"
          >
            Chat Me
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 glass-nav rounded-2xl px-6 py-5 flex flex-col gap-4 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-[14px] font-medium tracking-wide transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-white/10 flex justify-center">
            <button
              onClick={() => {
                openResumeAssistant()
                setMobileOpen(false)
              }}
              className="px-6 py-2.5 bg-primary text-white text-[13px] font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(55,147,255,0.3)] cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
