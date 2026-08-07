import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section'
}

export function Reveal({ children, className, delay = 0, y = 40, as = 'div' }: RevealProps) {
  const MotionTag = as === 'section' ? motion.section : motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.6,
        delay,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
