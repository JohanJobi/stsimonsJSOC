"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import AnimatedSection from "@/components/animated-section"

export default function PhotoGallery() {
  const [images, setImages] = useState<any[]>([])
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [showUploader, setShowUploader] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/images")
      .then(res => res.json())
      .then(setImages)
  }, [])

  const categories = ["All", "Services", "Events", "Youth", "Church"]

  const eventTypes = Array.from(
    new Set(
      images
        .filter(img => img.category === "events")
        .map(img => img.event?.name) // <-- use .name
        .filter(Boolean)
    )
  )

  const filteredImages =
    selectedTab === "all"
      ? images
      : images.filter(
          img =>
            img.category.toLowerCase() === selectedTab &&
            (selectedTab !== "events" ||
              selectedEvent === "all" ||
              img.event?.name === selectedEvent)
        )

  // Group images by section
  const sections = Array.from(new Set(filteredImages.map(img => img.section))).sort()

  return (
    <>
      <AnimatedSection
        once={false}
        animation="fadeInUp"
        className="mb-8 flex flex-col gap-2"
      >
        <Tabs
          defaultValue="all"
          value={selectedTab}
          onValueChange={value => {
            setSelectedTab(value)
            setSelectedEvent("all")
          }}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="youth">Youth</TabsTrigger>
            <TabsTrigger value="church">Church</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Event tabs BELOW and LEFT-ALIGNED under the main tabs */}
        {selectedTab === "events" && (
          <div className="mt-2">
            <Tabs value={selectedEvent} onValueChange={setSelectedEvent}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {eventTypes.map(event => (
                  <TabsTrigger key={event} value={event}>
                    {event}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
      </AnimatedSection>

      {/* Only show images grouped by section to avoid duplicates */}
      {sections.map(section => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages
              .filter(img => img.section === section)
              .map((image, index) => (
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
                    className="object-cover w-full h-48 sm:h-64 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <div className="text-sm font-medium">
                        {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                        {image.category === "events" && image.event?.name ? `: ${image.event.name}` : ""}
                      </div>
                      <div className="text-xs opacity-80">{image.alt}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <Dialog open={!!selectedImage} onOpenChange={open => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogTitle className="text-white">Image Preview</DialogTitle>
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
                <div className="font-medium">
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  {selectedImage.category === "events" && selectedImage.event?.name ? `: ${selectedImage.event.name}` : ""}
                </div>
                <div className="text-sm opacity-90">{selectedImage.alt}</div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}