"use client"
import { useEffect, useState } from "react"

interface Event {
  id: number
  name: string
  createdAt: string
}

interface Image {
  id: number
  src: string
  alt: string
  category: string
  eventId?: number | null
  event?: Event | null
  createdAt: string
}

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null)
  const [deleteImageId, setDeleteImageId] = useState<number | null>(null)
  const [confirmType, setConfirmType] = useState<"event" | "image" | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) throw new Error("Failed to fetch events")
        const data = await res.json()
        setEvents(data)
      } catch (err) {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images")
        if (!res.ok) throw new Error("Failed to fetch images")
        const data = await res.json()
        setImages(data)
      } catch (err) {
        setImages([])
      }
    }
    fetchEvents()
    fetchImages()
  }, [])

  const handleDeleteEvent = (id: number) => {
    setDeleteEventId(id)
    setConfirmType("event")
  }

  const handleDeleteImage = (id: number) => {
    setDeleteImageId(id)
    setConfirmType("image")
  }

  const confirmDelete = async () => {
    if (confirmType === "event" && deleteEventId !== null) {
      await fetch(`/api/events?id=${deleteEventId}`, { method: "DELETE" })
      setEvents(events.filter(e => e.id !== deleteEventId))
      setImages(images.filter(img => img.eventId !== deleteEventId))
    } else if (confirmType === "image" && deleteImageId !== null) {
      await fetch(`/api/images/${deleteImageId}`, { method: "DELETE" })
      setImages(images.filter(img => img.id !== deleteImageId))
    }
    setDeleteEventId(null)
    setDeleteImageId(null)
    setConfirmType(null)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Event Types</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td className="p-2 border">{event.id}</td>
                <td className="p-2 border">{event.name}</td>
                <td className="p-2 border">{new Date(event.createdAt).toLocaleString()}</td>
                <td className="p-2 border">
                  <span
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete event"
                    aria-label={`Delete event ${event.name}`}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold mb-4">Photos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Preview</th>
              <th className="p-2 border">Src</th>
              <th className="p-2 border">Alt</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {images.map(img => (
              <tr key={img.id}>
                <td className="p-2 border">
                  <img
                    src={img.src}
                    alt={img.alt || "preview"}
                    className="h-16 w-24 object-cover rounded shadow"
                    style={{ maxWidth: 96, maxHeight: 64 }}
                    onError={e => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                </td>
                <td className="p-2 border max-w-[200px] truncate">{img.src}</td>
                <td className="p-2 border">{img.alt}</td>
                <td className="p-2 border">{img.category}</td>
                <td className="p-2 border">{img.event?.name || "-"}</td>
                <td className="p-2 border">{new Date(img.createdAt).toLocaleString()}</td>
                <td className="p-2 border">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteImage(img.id)}
                    title="Delete photo"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(confirmType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
            <p className="mb-4 text-sm text-gray-700">
              {confirmType === "event"
                ? "Deleting this event will permanently delete all associated photos. This action cannot be undone."
                : "Deleting this photo will permanently remove it. This action cannot be undone."}
            </p>
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => { setDeleteEventId(null); setDeleteImageId(null); setConfirmType(null) }}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
