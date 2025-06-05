import type { Metadata } from "next"
import PhotoGallery from "@/components/photo-gallery"

export const metadata: Metadata = {
  title: "Photo Gallery | St. Simon's Jacobite Syrian Orthodox Church",
  description: "Browse photos from our church services, events, and community gatherings.",
}

export default function GalleryPage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <section className="bg-amber-50 py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Photo Gallery</h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
              Browse through moments from our church services, events, and community gatherings.
            </p>
          </div>

          <PhotoGallery />
        </div>
      </section>
    </main>
  )
}
