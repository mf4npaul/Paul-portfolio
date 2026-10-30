import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /** Distance in px the content travels up while fading in. Keep it small. */
  y?: number
}

/**
 * Fades content in once as it scrolls into view.
 * <MotionConfig reducedMotion="user"> in App.tsx removes the movement for people who prefer reduced motion.
 */
export function Reveal({ children, delay = 0, className, y = 14 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
