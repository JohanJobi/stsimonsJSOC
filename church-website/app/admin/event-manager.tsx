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

interface Service {
  id?: number;
  day: string
  time: string
  service: string
  createdAt?: string
}

interface UpcomingEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  createdAt: string;
}

export function EventsPhotosManager() {
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
    setLoading(false)
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
    <div>
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

export function EventsServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [newService, setNewService] = useState<Service>({ day: "", time: "", service: "" })
  const [newUpcomingEvent, setNewUpcomingEvent] = useState({ date: '', title: '', description: '' });
  const [editServiceIdx, setEditServiceIdx] = useState<number | null>(null)
  const [editUpcomingEventIdx, setEditUpcomingEventIdx] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setServices([]);
      }
    };
    const fetchUpcomingEvents = async () => {
      try {
        const res = await fetch('/api/upcoming-events');
        if (!res.ok) throw new Error('Failed to fetch upcoming events');
        const data = await res.json();
        setUpcomingEvents(data);
      } catch (err) {
        setUpcomingEvents([]);
      }
    };
    fetchServices();
    fetchUpcomingEvents();
    setLoading(false);
  }, []);

  // Service handlers (API-backed)
  const handleAddService = async () => {
    if (!newService.day || !newService.time || !newService.service) return
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    if (res.ok) {
      const created = await res.json();
      setServices([...services, created]);
      setNewService({ day: "", time: "", service: "" });
    }
  }
  const handleDeleteService = async (idx: number) => {
    const service = services[idx];
    if (!service.id) return;
    const res = await fetch(`/api/services?id=${service.id}`, { method: 'DELETE' });
    if (res.ok) {
      setServices(services.filter((_, i) => i !== idx));
    }
  }
  const handleEditService = (idx: number) => setEditServiceIdx(idx)
  const handleSaveService = async (idx: number, updated: Service) => {
    if (!updated.id) return;
    const res = await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const savedService = await res.json();
      setServices(services.map((s, i) => (i === idx ? savedService : s)));
      setEditServiceIdx(null);
    }
  }
  // UpcomingEvent handlers
  const handleAddUpcomingEvent = async () => {
    if (!newUpcomingEvent.date || !newUpcomingEvent.title || !newUpcomingEvent.description) return;
    const res = await fetch('/api/upcoming-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUpcomingEvent),
    });
    if (res.ok) {
      const created = await res.json();
      setUpcomingEvents([...upcomingEvents, created]);
      setNewUpcomingEvent({ date: '', title: '', description: '' });
    }
  };
  const handleDeleteUpcomingEvent = async (id: number) => {
    await fetch('/api/upcoming-events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setUpcomingEvents(upcomingEvents.filter(e => e.id !== id));
  };
  const handleEditUpcomingEvent = (idx: number) => setEditUpcomingEventIdx(idx)
  const handleSaveUpcomingEvent = async (idx: number, updated: UpcomingEvent) => {
    const res = await fetch('/api/upcoming-events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const savedEvent = await res.json();
      setUpcomingEvents(upcomingEvents.map((e, i) => (i === idx ? savedEvent : e)));
      setEditUpcomingEventIdx(null);
    }
  };
  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-12">Manage Services</h2>
      <div className="mb-6">
        <table className="min-w-full border mb-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Day</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, idx) => (
              <tr key={idx}>
                {editServiceIdx === idx ? (
                  <>
                    <td className="p-2 border"><input value={s.day} onChange={e => setServices(services.map((sv, i) => i === idx ? { ...sv, day: e.target.value } : sv))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border"><input value={s.time} onChange={e => setServices(services.map((sv, i) => i === idx ? { ...sv, time: e.target.value } : sv))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border"><input value={s.service} onChange={e => setServices(services.map((sv, i) => i === idx ? { ...sv, service: e.target.value } : sv))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border">
                      <button className="text-green-600 mr-2" onClick={() => handleSaveService(idx, services[idx])}>Save</button>
                      <button className="text-gray-600" onClick={() => setEditServiceIdx(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{s.day}</td>
                    <td className="p-2 border">{s.time}</td>
                    <td className="p-2 border">{s.service}</td>
                    <td className="p-2 border">
                      <button className="text-blue-600 mr-2" onClick={() => handleEditService(idx)}>Edit</button>
                      <button className="text-red-600" onClick={() => handleDeleteService(idx)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-2">
          <input value={newService.day} onChange={e => setNewService({ ...newService, day: e.target.value })} placeholder="Day" className="border px-2 py-1" />
          <input value={newService.time} onChange={e => setNewService({ ...newService, time: e.target.value })} placeholder="Time" className="border px-2 py-1" />
          <input value={newService.service} onChange={e => setNewService({ ...newService, service: e.target.value })} placeholder="Service" className="border px-2 py-1" />
          <button className="bg-amber-700 text-white px-4 py-1 rounded" onClick={handleAddService}>Add Service</button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-12">Manage Upcoming Events</h2>
      <div className="mb-6">
        <table className="min-w-full border mb-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingEvents.map((e, idx) => (
              <tr key={e.id}>
                {editUpcomingEventIdx === idx ? (
                  <>
                    <td className="p-2 border"><input value={e.date.slice(0, 10)} type="date" onChange={ev => setUpcomingEvents(upcomingEvents.map((evnt, i) => i === idx ? { ...evnt, date: ev.target.value } : evnt))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border"><input value={e.title} onChange={ev => setUpcomingEvents(upcomingEvents.map((evnt, i) => i === idx ? { ...evnt, title: ev.target.value } : evnt))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border"><input value={e.description} onChange={ev => setUpcomingEvents(upcomingEvents.map((evnt, i) => i === idx ? { ...evnt, description: ev.target.value } : evnt))} className="border px-2 py-1 w-full" /></td>
                    <td className="p-2 border">
                      <button className="text-green-600 mr-2" onClick={() => handleSaveUpcomingEvent(idx, upcomingEvents[idx])}>Save</button>
                      <button className="text-gray-600" onClick={() => setEditUpcomingEventIdx(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{new Date(e.date).toLocaleDateString()}</td>
                    <td className="p-2 border">{e.title}</td>
                    <td className="p-2 border">{e.description}</td>
                    <td className="p-2 border">
                      <button className="text-blue-600 mr-2" onClick={() => handleEditUpcomingEvent(idx)}>Edit</button>
                      <button className="text-red-600" onClick={() => handleDeleteUpcomingEvent(e.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-2">
          <input value={newUpcomingEvent.date} type="date" onChange={e => setNewUpcomingEvent({ ...newUpcomingEvent, date: e.target.value })} placeholder="Date" className="border px-2 py-1" />
          <input value={newUpcomingEvent.title} onChange={e => setNewUpcomingEvent({ ...newUpcomingEvent, title: e.target.value })} placeholder="Title" className="border px-2 py-1" />
          <input value={newUpcomingEvent.description} onChange={e => setNewUpcomingEvent({ ...newUpcomingEvent, description: e.target.value })} placeholder="Description" className="border px-2 py-1" />
          <button className="bg-amber-700 text-white px-4 py-1 rounded" onClick={handleAddUpcomingEvent}>Add Event</button>
        </div>
      </div>
    </div>
  )
}
