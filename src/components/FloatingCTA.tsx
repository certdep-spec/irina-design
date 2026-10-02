import React from 'react'
import { FiPhone } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'

const FloatingCTA: React.FC = () => {
  return (
    <div
      className="fixed bottom-6 md:bottom-6 right-6 z-40 flex flex-col items-end space-y-4 md:hidden"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 1rem) + 1rem)' }}
    >
      {/* Telegram Button */}
      <a
        href="https://t.me/+380964599885"
        target="_blank"
        rel="noopener noreferrer"
        data-cta-name="floating_telegram"
        className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-lg "
        aria-label="Написати у Telegram"
      >
        <FaTelegramPlane size={24} />
      </a>

      {/* Main Call Button */}
      <a
        href="tel:+380964599885"
        data-cta-name="floating_call"
        className="w-14 h-14 bg-stone-800 text-white rounded-full flex items-center justify-center shadow-lg "
        aria-label="Зателефонувати"
      >
        <FiPhone size={24} />
      </a>
    </div>
  )
}

export default FloatingCTA
