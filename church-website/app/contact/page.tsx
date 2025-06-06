
import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | St. Simon's Jacobite Syrian Orthodox Church",
  description:
    "Get in touch with St. Simon's Jacobite Syrian Orthodox Church in Gloucester. Find our location, service times, and contact information.",
}

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <section className="container py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Contact Us</h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;d love to hear from you. Reach out to us with any questions or inquiries.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-amber-800 mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-500">Coney Hill Rd, Coney Hill, Gloucester, GL4 4LX, United Kingdom</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-amber-800 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-500">+44 7949864424</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-amber-800 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-500">stsimonsjsocgloucester@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-amber-800 mt-1" />
                <div>
                  <h3 className="font-medium">Service Times</h3>
                  <div className="text-gray-500 space-y-1">
                    <p>Sunday: 12:30 PM - 3:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2464.4650758918638!2d-2.2169741880337144!3d51.852464385320005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487105ea0b074b45%3A0x4e0cbcd90a296c3a!2sSt%20Oswald&#39;s%20Parish%20Church%20Coney%20Hill!5e0!3m2!1sen!2suk!4v1748970316057!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church location map"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
