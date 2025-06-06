"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import StaggeredChildren from "@/components/staggered-children"

export default function PhotoGalleryPreview() {
  const [images, setImages] = useState<any[]>([])
  const [randomImages, setRandomImages] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<null | any>(null)

  useEffect(() => {
    fetch("/api/images")
      .then(res => res.json())
      .then(data => {
        setImages(data)
        // Shuffle and pick 6 random images
        const shuffled = [...data].sort(() => 0.5 - Math.random())
        setRandomImages(shuffled.slice(0, 6))
      })
  }, [])

  return (
    <>
      <StaggeredChildren className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.1} animation="zoomIn">
        {randomImages.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={400}
              height={300}
              className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="text-sm font-medium">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</div>
                <div className="text-xs opacity-80">{image.alt}</div>
              </div>
            </div>
          </div>
        ))}
      </StaggeredChildren>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedImage && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
                <div className="font-medium">{selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}</div>
                <div className="text-sm opacity-90">{selectedImage.alt}</div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
