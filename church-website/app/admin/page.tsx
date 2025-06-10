"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ContactSubmissions from "./contact"
import EventManager from "./event-manager"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [view, setView] = useState<"contacts" | "upload" | "events">("contacts")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") return <div>Loading...</div>
  if (!session) return null

  return (
    <div className="container py-12 pt-16">
      {/* Add mt-8 here for more space below the navbar */}
      <div className="flex gap-4 mb-8 mt-8">
        <button
          className={`px-4 py-2 rounded ${view === "contacts" ? "bg-amber-700 text-white" : "bg-gray-200"}`}
          onClick={() => setView("contacts")}
        >
          Contact Submissions
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "upload" ? "bg-amber-700 text-white" : "bg-gray-200"}`}
          onClick={() => setView("upload")}
        >
          Upload Photos
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "events" ? "bg-amber-700 text-white" : "bg-gray-200"}`}
          onClick={() => setView("events")}
        >
          Manage Events & Photos
        </button>
      </div>
      {view === "contacts" ? <ContactSubmissions /> : view === "upload" ? <PhotoUploadScreen /> : <EventManager />}
    </div>
  )
}

// --- PhotoUploadScreen component ---
function PhotoUploadScreen() {
  const [files, setFiles] = useState<File[]>([])
  const [inputs, setInputs] = useState<{ name: string; category: string; event: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [eventTypes, setEventTypes] = useState<string[]>([])
  const [newEventType, setNewEventType] = useState("")

  // Fetch existing event types from images
  useEffect(() => {
    fetch("/api/images")
      .then(res => res.json())
      .then(images => {
        const uniqueEvents = Array.from(new Set(images.filter((img: any) => img.category === "events").map((img: any) => img.event?.name).filter(Boolean)))
        setEventTypes(uniqueEvents as string[])
      })
  }, [])

  const categories = ["services", "events", "youth", "church"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
    setInputs(selectedFiles.map(() => ({
      name: "",
      category: categories[0],
      event: "",
    })))
  }

  const handleInputChange = (idx: number, field: "name" | "category" | "event", value: string) => {
    setInputs(inputs =>
      inputs.map((input, i) => (i === idx ? { ...input, [field]: value } : input))
    )
  }

  const handleAddEventType = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEventType && !eventTypes.includes(newEventType)) {
      setEventTypes(prev => [...prev, newEventType])
      setInputs(inputs => inputs.map(input =>
        input.category === "events" ? { ...input, event: newEventType } : input
      ))
      setNewEventType("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append("file", files[i])

      // 1. Upload to Cloudinary via your API
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!data.url) continue

      // 2. Save to your database
      await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: data.url,
          alt: inputs[i].name,
          category: inputs[i].category,
          event: inputs[i].category === "events" ? inputs[i].event : null,
        }),
      })
    }
    setUploading(false)
    setSuccess(true)
    setFiles([])
    setInputs([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Upload Photos</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Add Event Type (only for events) */}
      <div className="mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Add new event type (e.g. Christmas 2024)"
            value={newEventType}
            onChange={e => setNewEventType(e.target.value)}
            className="border px-2 py-1"
          />
          <button
            type="button"
            className="bg-amber-700 text-white px-3 py-1 rounded"
            disabled={!newEventType.trim()}
            onClick={handleAddEventType}
          >
            Add Event
          </button>
        </div>
      </div>

      {files.map((file, idx) => (
        <div key={idx} className="mb-4 border p-2 rounded">
          <div className="mb-2 font-semibold">{file.name}</div>
          <input
            type="text"
            placeholder="Image Name"
            value={inputs[idx]?.name || ""}
            onChange={e => handleInputChange(idx, "name", e.target.value)}
            className="border px-2 py-1 mr-2"
            required
          />
          <select
            value={inputs[idx]?.category || categories[0]}
            onChange={e => handleInputChange(idx, "category", e.target.value)}
            className="border px-2 py-1 mr-2"
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          {/* Show event dropdown only if category is events */}
          {inputs[idx]?.category === "events" && (
            <select
              value={inputs[idx]?.event || ""}
              onChange={e => handleInputChange(idx, "event", e.target.value)}
              className="border px-2 py-1"
              required
            >
              <option value="" disabled>Select event</option>
              {eventTypes.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-amber-700 text-white px-4 py-2 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {success && <div className="text-green-600">Images uploaded!</div>}
    </form>
  )
}