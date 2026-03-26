"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Trigger animation khi route thay đổi
    setIsAnimating(true)

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <>
            {/* Curtain Animation - Left Side */}
            <motion.div
              key={`curtain-left-${pathname}`}
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 1.2,
                ease: [0.77, 0, 0.175, 1],
              }}
              className="fixed top-0 left-0 w-1/2 h-full bg-white z-9999 pointer-events-none"
              style={{ willChange: 'transform' }}
            />

            {/* Curtain Animation - Right Side */}
            <motion.div
              key={`curtain-right-${pathname}`}
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 1.2,
                ease: [0.77, 0, 0.175, 1],
              }}
              className="fixed top-0 right-0 w-1/2 h-full bg-white z-9999 pointer-events-none"
              style={{ willChange: 'transform' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      {children}
    </>
  )
}

