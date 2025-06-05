"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface StaggeredChildrenProps {
  children: ReactNode
  className?: string
  childClassName?: string
  staggerDelay?: number
  duration?: number
  once?: boolean
  amount?: "some" | "all" | number
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "zoomIn"
}

export default function StaggeredChildren({
  children,
  className = "",
  childClassName = "",
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  amount = 0.3,
  animation = "fadeInUp",
}: StaggeredChildrenProps) {
  const { ref, isInView } = useScrollAnimation({ once: true, amount: 0.3 })

  const getAnimationVariants = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "fadeInUp":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case "fadeInLeft":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }
      case "fadeInRight":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }
      case "zoomIn":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  // Clone children and wrap them in motion.div
  const wrappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    return (
      <motion.div
        variants={getAnimationVariants()}
        transition={{ duration, ease: "easeOut" }}
        className={childClassName}
      >
        {child}
      </motion.div>
    )
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {wrappedChildren}
    </motion.div>
  )
}
