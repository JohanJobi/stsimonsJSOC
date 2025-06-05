"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function AnimatedHeroLanding() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  // Enhanced parallax transforms with more dramatic zoom-out effect
  const imageY = useTransform(scrollY, [0, 1000], [0, 300])
  const imageScale = useTransform(scrollY, [0, 1000], [1.0, 0.8])
  const textY = useTransform(scrollY, [0, 800], [0, 200])
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.2, 0.5])

  const heroImage = isMobile
    ? "/images/mobile2.jpg"
    : "/images/church-building.jpg"

  if (!mounted) return null // or a loading skeleton

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background Image with Enhanced Zoom-out Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          y: imageY,
          scale: imageScale,
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <Image
          src={heroImage}
          alt="St. Simon's Church"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>


     
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Left Side Text Section */}
        <div className="flex-1 flex items-start pt-8 md:pt-12 lg:pt-16">


          <motion.div className="w-full max-w-2xl px-8 md:px-16 lg:px-24" style={{ y: textY }}>
            {/* Main Heading */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.0 }}
            >
              <h1
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: "1" }}
                className="font-bold text-white drop-shadow-2xl leading-tight"
              >
                <span className="block">St. Simon's</span>
                <span className="block text-amber-200">Jacobite Syrian</span>
                <span className="block text-amber-300">Orthodox Church</span>
              </h1>

              {/* Subtitle */}
              <motion.p
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: "1.4"}}
                className="text-white/90 leading-relaxed max-w-lg"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.4 }}
              >
                A sacred place of worship, fellowship, and spiritual growth in Gloucester
              </motion.p>

              {/* Spacer for mobile only */}
              <div className="block sm:hidden" style={{ height: "30rem" }}/>

              {/* Bible Verse*/}
              <motion.div
                className="mt-8 p-1 bg-white/1 backdrop-blur-sm rounded-lg shadow-lg max-w-sm border border-white/20"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.8 }}
              >
                <blockquote
                  style={{
                    fontSize: "clamp(0.9rem, 1vw, 1.3rem)",
                    lineHeight: "1.5",
                  }}
                  className="text-white italic drop-shadow-lg"
                >
                  "I assure you that anyone who gives you a drink of water because you belong to me will certainly
                  receive his reward"
                </blockquote>
                <cite
                  style={{
                    fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                    lineHeight: "1.2",
                  }}
                  className="block mt-3 text-amber-200 font-semibold drop-shadow-lg"
                >
                  Mark 9:41
                </cite>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        </div>
      
    </div>
  )
}