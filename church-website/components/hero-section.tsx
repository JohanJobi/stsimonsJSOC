"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const slideImages = [
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "St. Simon's Church exterior",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "Church service",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "Community gathering",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slideImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              transition: { duration: 1 },
            }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl space-y-4"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            St. Simon&apos;s Jacobite Syrian Orthodox Church
          </motion.h1>
          <motion.p
            className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A place of worship, fellowship, and spiritual growth in Gloucester
          </motion.p>
          <motion.div
            className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link href="/services">
              <Button size="lg" className="bg-amber-800 hover:bg-amber-900">
                Service Times
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                About Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
