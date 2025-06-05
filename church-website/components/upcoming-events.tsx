import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function UpcomingEvents() {
  const events = [
    {
      date: "April 28, 2025",
      title: "Annual Parish Day",
      description: "Celebration of our parish anniversary with special prayers and community lunch.",
    },
    {
      date: "May 15, 2025",
      title: "Youth Conference",
      description: "A day of spiritual discussions and activities for young adults.",
    },
    {
      date: "June 5, 2025",
      title: "Charity Fundraiser",
      description: "Raising funds for local homeless shelter with food and entertainment.",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-amber-800" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="text-sm text-gray-500">{event.date}</div>
              <div className="font-medium text-lg">{event.title}</div>
              <div className="text-gray-600">{event.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
