"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AnimatedSection from "@/components/animated-section"
import StaggeredChildren from "@/components/staggered-children"

// Sample gallery data - in a real app, this would come from a database
const galleryData = {
  all: [
    { src: "/placeholder.svg?height=300&width=400", alt: "Church service", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Community gathering", category: "Events" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Church building", category: "Church" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Youth group", category: "Youth" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Choir performance", category: "Choir" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Christmas celebration", category: "Festivals" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Easter service", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Sunday school", category: "Youth" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Church interior", category: "Church" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Baptism ceremony", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Parish meeting", category: "Events" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Charity event", category: "Events" },
  ],
  services: [
    { src: "/placeholder.svg?height=300&width=400", alt: "Church service", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Easter service", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Baptism ceremony", category: "Services" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Holy Qurbana", category: "Services" },
  ],
  events: [
    { src: "/placeholder.svg?height=300&width=400", alt: "Community gathering", category: "Events" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Parish meeting", category: "Events" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Charity event", category: "Events" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Annual day", category: "Events" },
  ],
  youth: [
    { src: "/placeholder.svg?height=300&width=400", alt: "Youth group", category: "Youth" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Sunday school", category: "Youth" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Youth retreat", category: "Youth" },
  ],
  church: [
    { src: "/placeholder.svg?height=300&width=400", alt: "Church building", category: "Church" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Church interior", category: "Church" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Altar", category: "Church" },
  ],
}

export default function PhotoGallery() {
const [selectedTab, setSelectedTab] = useState("all")
const [selectedImage, setSelectedImage] = useState<{
  src: string
  alt: string
  category: string
} | null>(null)
const [showUploader, setShowUploader] = useState(false)
const { toast } = useToast()

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
  }

  const handleUploadSuccess = () => {
    setShowUploader(false)
    toast({
      title: "Upload successful",
      description: "Your photo has been uploaded and is pending approval.",
    })
  }

  return (
    <>
      <AnimatedSection
        animation="fadeInUp"
        className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <Tabs defaultValue="all" value={selectedTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="youth">Youth</TabsTrigger>
            <TabsTrigger value="church">Church</TabsTrigger>
          </TabsList>
        </Tabs>

      </AnimatedSection>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StaggeredChildren
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            staggerDelay={0.05}
            animation="zoomIn"
          >
            {galleryData[selectedTab as keyof typeof galleryData].map((image, index) => (
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
                    <div className="text-sm font-medium">{image.category}</div>
                    <div className="text-xs opacity-80">{image.alt}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredChildren>
        </motion.div>
      </AnimatePresence>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
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
                width={1200}
                height={900}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
                <div className="font-medium">{selectedImage.category}</div>
                <div className="text-sm opacity-90">{selectedImage.alt}</div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>


    </>
  )
}
