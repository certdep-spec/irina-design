import React from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'

const FloatingCTA: React.FC = () => {
  return (
    <motion.div
      drag
      dragElastic={0.3}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      className="fixed bottom-6 md:bottom-6 right-6 z-40 flex flex-col items-end space-y-4 md:hidden"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 1rem) + 1rem)' }}
    >
      {/* Telegram Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: 0.5 }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        href="https://t.me/+380964599885"
        target="_blank"
        rel="noopener noreferrer"
        data-cta-name="floating_telegram"
        className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
        aria-label="Написати у Telegram"
      >
        <FaTelegramPlane size={24} />
      </motion.a>

      {/* Main Call Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: 0.6 }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        href="tel:+380964599885"
        data-cta-name="floating_call"
        className="w-14 h-14 bg-stone-800 text-white rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
        aria-label="Зателефонувати"
      >
        <FiMessageCircle size={24} />
      </motion.a>
    </motion.div>
  )
}

export default FloatingCTA
