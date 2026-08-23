import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  path: string;
  label: string;
}

/**
 * Header Component
 * Navigation menu with mobile responsive hamburger menu
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks: NavLink[] = [
    { path: "/", label: "Головна" },
    { path: "/about", label: "Про мене" },
    { path: "/portfolio", label: "Портфоліо" },
    { path: "/services", label: "Послуги" },
    { path: "/contact", label: "Контакти" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100"
    >
      <nav className="section-padding py-5 md:py-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-serif font-semibold text-stone-800 tracking-wider active:scale-[0.97] transition-transform duration-75"
          >
            ІРИНА<span className="text-stone-400"> · </span>INTERIOR DESIGN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase active:scale-[0.97] transition-all duration-100 ${
                  isActive(link.path)
                    ? "text-stone-800 border-b-2 border-stone-800 pb-1"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-stone-800 p-2 -mr-2 focus:outline-none touch-manipulation active:scale-[0.92] transition-transform duration-75"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 pb-4 border-t border-stone-100 pt-6 mt-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium tracking-wide transition-colors duration-100 active:scale-[0.97] ${
                      isActive(link.path) ? "text-stone-900 font-bold" : "text-stone-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
