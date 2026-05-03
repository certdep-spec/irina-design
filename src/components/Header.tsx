import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavLink } from '../types'

/**
 * Header Component
 * Navigation menu with mobile responsive hamburger menu
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks: NavLink[] = [
    { path: '/', label: 'Головна' },
    { path: '/about', label: 'Про мене' },
    { path: '/portfolio', label: 'Портфоліо' },
    { path: '/services', label: 'Послуги' },
    { path: '/contact', label: 'Контакти' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100">
      <nav className="section-padding py-5 md:py-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-serif font-semibold text-stone-800 tracking-wider">
            INTERIOR<span className="text-stone-400">.</span>DESIGN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-widest transition-all duration-300 uppercase ${
                  isActive(link.path)
                    ? 'text-stone-800 border-b-2 border-stone-800 pb-1'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Better Ergonomics */}
          <button
            className="md:hidden text-stone-800 p-2 -mr-2 focus:outline-none touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-4 pb-4 border-t border-stone-100 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium tracking-wide transition-colors ${
                  isActive(link.path)
                    ? 'text-stone-900 font-bold'
                    : 'text-stone-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header