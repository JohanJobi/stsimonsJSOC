"use client"

import { motion } from "framer-motion"
import { Clock, Calendar } from "lucide-react"
import AnimatedSection from "@/components/animated-section"

export default function ServicesEventsSection() {
  const services = [
    {
      day: "Sunday",
      time: "12:30 PM - 3:30PM",
      service: "Holy Qurbana",
    },
    {
      day: "Sunday",
      time: "5:30 PM - 6:30PM",
      service: "Sunday School",
    },
    {
      day: "Wednesday",
      time: "5:30 PM - 7:30PM",
      service: "Prayer Meeting",
    },

  ]

  const events = [
    {
      date: "August 5, 2025",
      title: "Drayton Manor Outing",
      description: "A fun day out for families at Drayton Manor Park.",
    },
    {
      date: "July 15, 2025",
      title: "BBQ and Sports Day",
      description: "Join us for a day of food, games, and fellowship at the church grounds.",
    },
    {
      date: "July 6, 2025",
      title: "Charity Fundraiser",
      description: "Raising funds with stalls after Qurubana.",
    },
  ]

  return (
    <section className="bg-amber-50 py-12 md:py-24">
      <div className="container">
        <AnimatedSection animation="fadeInUp" className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">Join Us</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Services & Upcoming Events
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
            Join us for worship services and community events. All are welcome to participate in our church activities.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {/* Service Times */}
          <AnimatedSection animation="fadeInLeft" delay={0.1}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Service Times</h3>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-amber-200 pl-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <h4 className="font-bold text-lg text-gray-900">{service.day}</h4>
                    <p className="text-gray-600 mb-1">{service.time}</p>
                    <p className="text-amber-600 font-medium">{service.service}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Upcoming Events */}
          <AnimatedSection animation="fadeInRight" delay={0.3}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
              </div>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-amber-200 pl-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
