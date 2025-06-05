import type { Metadata } from "next"
import Image from "next/image"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Services | St. Simon's Jacobite Syrian Orthodox Church",
  description:
    "Learn about the worship services and spiritual activities at St. Simon's Jacobite Syrian Orthodox Church in Gloucester.",
}

export default function ServicesPage() {
  const services = [
    {
      day: "Sunday",
      time: "10:00 AM - 12:30 PM",
      name: "Holy Qurbana (Divine Liturgy)",
      description: "The main worship service of the week, including Holy Communion.",
    },
    {
      day: "Wednesday",
      time: "6:30 PM - 8:00 PM",
      name: "Evening Prayer & Bible Study",
      description: "Midweek prayer service followed by Bible study and discussion.",
    },
    {
      day: "Friday",
      time: "7:00 PM - 8:30 PM",
      name: "Prayer Meeting",
      description: "Community prayer meeting with intercessory prayers.",
    },
    {
      day: "Saturday",
      time: "5:00 PM - 6:30 PM",
      name: "Evening Prayer & Spiritual Discourse",
      description: "Evening prayer followed by spiritual teachings.",
    },
  ]

  const specialServices = [
    {
      name: "Baptism",
      description:
        "The sacrament of initiation into the Christian faith, typically performed for infants but also available for adults.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Holy Matrimony",
      description: "The sacrament of marriage, uniting a man and woman in a covenant relationship before God.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Funeral Service",
      description: "A service to commemorate the departed and commend them to God's mercy and love.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "House Blessing",
      description: "A service to bless and sanctify homes, invoking God's protection and presence.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Church service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Worship Services</h1>
        </div>
      </section>

      {/* Regular Services Section */}
      <section className="container py-12 md:py-24">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">
            Weekly Schedule
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Regular Services</h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
            Join us for our regular worship services and spiritual activities throughout the week.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-amber-800" />
                  {service.day}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-medium text-amber-800">{service.name}</div>
                  <div className="text-gray-500">{service.time}</div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Special Services Section */}
      <section className="bg-amber-50 py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">
              Sacraments & Ceremonies
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Special Services</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
              We offer various sacramental and special services for important life events and spiritual needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {specialServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-amber-800">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liturgical Calendar Section */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">Church Calendar</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Liturgical Calendar</h2>
            <div className="space-y-4 text-gray-500">
              <p>
                The Jacobite Syrian Orthodox Church follows a liturgical calendar that marks the seasons and feasts of
                the church year. The calendar is centered around the life of Christ and the commemoration of saints.
              </p>
              <p>Major feast days include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nativity of Christ (Christmas)</li>
                <li>Epiphany (Denho)</li>
                <li>Great Lent and Holy Week</li>
                <li>Easter (Resurrection Sunday)</li>
                <li>Pentecost</li>
                <li>Transfiguration</li>
                <li>Feast of the Holy Cross</li>
                <li>Feast days of various saints</li>
              </ul>
              <p>
                Special services are held on these feast days, often with additional prayers, processions, and community
                celebrations.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=400&width=600" alt="Church calendar" fill className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  )
}
