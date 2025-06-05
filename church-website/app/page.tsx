import Link from "next/link"
import Image from "next/image"
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import AnimatedHeroLanding from "@/components/animated-hero-landing"
import PhotoGalleryPreview from "@/components/photo-gallery-preview"
import ServicesEventsSection from "@/components/services-events-section"
import AnimatedSection from "@/components/animated-section"
import StaggeredChildren from "@/components/staggered-children"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <AnimatedHeroLanding />
      {/* Welcome Section */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatedSection animation="fadeInLeft" className="space-y-4" once={false}>
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">Our Mission</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Building Faith, Community & Tradition
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We welcome you to join our vibrant community of faith in Gloucester. Our church is a place of worship,
              fellowship, and spiritual growth for the Jacobite Syrian Orthodox community, preserving ancient traditions
              while embracing modern fellowship.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/about">
                <Button className="bg-amber-800 hover:bg-amber-900">
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection once={false} animation="fadeInRight" className="flex justify-center" delay={0.2}>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="St. Simon's Church Interior"
              width={600}
              height={400}
              className="rounded-lg object-cover border border-gray-200 shadow-md"
              priority
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services & Events Section */}
      <ServicesEventsSection />

      {/* Photo Gallery Preview */}
      <section className="container py-12 md:py-24">
        <AnimatedSection once={false} animation="fadeInUp" className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">Gallery</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Church Photo Gallery</h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
            Browse through moments from our church services, events, and community gatherings.
          </p>
        </AnimatedSection>

        <PhotoGalleryPreview />

        <AnimatedSection once={false} animation="fadeInUp" delay={0.3} className="flex justify-center mt-12">
          <Link href="/gallery">
            <Button className="bg-amber-800 hover:bg-amber-900">
              View Full Gallery
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </section>

      {/* Contact Section */}
      <section className="bg-amber-800 text-white py-12 md:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection once={false} animation="fadeInLeft" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
              <p className="text-amber-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;d love to hear from you. Reach out to us with any questions or inquiries.
              </p>
              <StaggeredChildren className="space-y-3" staggerDelay={0.1} animation="fadeInLeft">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-amber-200" />
                  <p>Coney Hill, Gloucester, GL4 4LX</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-amber-200" />
                  <p>+44 7949864424</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-amber-200" />
                  <p>stsimonsjsocgloucester@gmail.com</p>
                </div>
              </StaggeredChildren>
              <AnimatedSection once={false} animation="fadeInUp" delay={0.4} className="pt-4">
                <Link href="/contact">
                  <Button className="bg-white text-amber-800 hover:bg-amber-100">
                    Get in Touch
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </AnimatedSection>
            </AnimatedSection>
            <AnimatedSection once={false} animation="fadeInRight" delay={0.3} className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39431.444092889185!2d-2.2864916783203095!3d51.852461100000035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487105ea0b074b45%3A0x4e0cbcd90a296c3a!2sSt%20Oswald&#39;s%20Parish%20Church%20Coney%20Hill!5e0!3m2!1sen!2suk!4v1748963013012!5m2!1sen!2suk"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church location map"
                className="w-full h-full min-h-[400px]"
              ></iframe>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  )
}
