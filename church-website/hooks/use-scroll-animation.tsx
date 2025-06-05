"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

type ScrollAnimationProps = {
  threshold?: number
  once?: boolean
  amount?: "some" | "all" | number
}

export function useScrollAnimation({ threshold = 0.1, once = true, amount = 0.3 }: ScrollAnimationProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return { ref, isInView: once ? isInView || hasAnimated : isInView }
}
