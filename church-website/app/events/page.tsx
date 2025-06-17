"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "@/components/animated-section"
import { Clock, Calendar } from "lucide-react"

export default function EventsPage() {
	const [services, setServices] = useState<any[]>([])
	const [events, setEvents] = useState<any[]>([])

	useEffect(() => {
		fetch("/api/services")
			.then((res) => res.json())
			.then((data) => setServices(data))
		fetch("/api/upcoming-events")
			.then((res) => res.json())
			.then((data) => setEvents(data))
	}, [])

	return (
		<main className="flex min-h-screen flex-col pt-16">
			<section className="bg-amber-50 py-12 md:py-24">
				<div className="container">
					<AnimatedSection
						once={false}
						animation="fadeInUp"
						className="flex flex-col items-center justify-center text-center mb-12"
					>
						<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">
							Events & Services
						</div>
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
							All Events & Services
						</h1>
						<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mb-8">
							Explore all our upcoming and past events, as well as our regular
							service times.
						</p>
						<div className="grid gap-8 md:grid-cols-2 w-full max-w-5xl">
							{/* Service Times */}
							<AnimatedSection once={false} animation="fadeInLeft" delay={0.1}>
								<div className="bg-white rounded-lg shadow-lg p-8 h-full">
									<div className="flex items-center gap-3 mb-6">
										<div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
											<Clock className="w-5 h-5 text-amber-600" />
										</div>
										<h3 className="text-2xl font-bold text-gray-900">
											Service Times
										</h3>
									</div>
									<div className="space-y-6">
										{services.map((service, index) => (
											<motion.div
												key={service.id || index}
												className="border-l-4 border-amber-200 pl-4"
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.3 + index * 0.05 }}
											>
												<h4 className="font-bold text-lg text-gray-900">
													{service.day}
												</h4>
												<p className="text-gray-600 mb-1">
													{service.time}
												</p>
												<p className="text-amber-600 font-medium">
													{service.service}
												</p>
											</motion.div>
										))}
									</div>
								</div>
							</AnimatedSection>
							{/* Events */}
							<AnimatedSection once={false} animation="fadeInRight" delay={0.3}>
								<div className="bg-white rounded-lg shadow-lg p-8 h-full">
									<div className="flex items-center gap-3 mb-6">
										<div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
											<Calendar className="w-5 h-5 text-amber-600" />
										</div>
										<h3 className="text-2xl font-bold text-gray-900">
											Events
										</h3>
									</div>
									<div className="space-y-6">
										{events.map((event, index) => (
											<motion.div
												key={event.id || index}
												className="border-l-4 border-amber-200 pl-4"
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.5 + index * 0.05 }}
											>
												<p className="text-sm text-gray-500 mb-1">
													{event.date || event.createdAt}
												</p>
												<h4 className="font-bold text-lg text-gray-900 mb-2">
													{event.title || event.name}
												</h4>
												<p className="text-gray-600 text-sm leading-relaxed">
													{event.description}
												</p>
											</motion.div>
										))}
									</div>
								</div>
							</AnimatedSection>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</main>
	)
}
