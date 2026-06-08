import React from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

const FloatingCTA: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4 md:hidden">
      {/* Telegram Button */}
      <a
        href="https://t.me/+380979603098"
        target="_blank"
        rel="noopener noreferrer"
        data-cta-name="floating_telegram"
        className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Написати у Telegram"
      >
        <FaTelegramPlane size={24} />
      </a>

      {/* Main Call Button (Optional, can be WhatsApp or just a toggle) */}
      <a
        href="tel:+380979603098"
        data-cta-name="floating_call"
        className="w-14 h-14 bg-stone-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Зателефонувати"
      >
        <FiMessageCircle size={24} />
      </a>
    </div>
  )
}

export default FloatingCTA
