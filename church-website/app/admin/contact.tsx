"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Contact {
  id: number
  name: string
  email: string
  message: string
  phone?: string
  createdAt: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
    if (status === "authenticated") {
      setLoading(true)
      fetch("/api/contact")
        .then(res => res.json())
        .then(data => {
          setContacts(data)
          setLoading(false)
        })
    }
  }, [status, router])

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value)
    setCopied(prev => ({ ...prev, [key]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 1500)
  }

  const handleDelete = (id: number) => {
    setDeleteId(id)
    setShowConfirm(true)
  }

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await fetch(`/api/contact?id=${deleteId}`, { method: "DELETE" })
      setContacts(contacts.filter(c => c.id !== deleteId))
      setDeleteId(null)
      setShowConfirm(false)
    }
  }

  if (status === "loading") return <div>Loading...</div>
  if (!session) return null

  if (!Array.isArray(contacts)) {
    return <div className="text-red-600">Error loading contacts.</div>
  }

  return (
    <div className="container py-12 pt-16">
      <h1 className="text-3xl font-bold mb-6 pt-8">Contact Submissions</h1>
      {loading ? (
        <div>Loading...</div>
      ) : contacts.length === 0 ? (
        <div>No contacts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date, Time</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center gap-2">
                      {contact.email}
                      <button
                        className="text-xs px-2 py-1 bg-amber-100 rounded hover:bg-amber-200 border border-amber-300"
                        onClick={() => handleCopy(contact.email, `email-${contact.id}`)}
                        title="Copy email"
                      >
                        {copied[`email-${contact.id}`] ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center gap-2">
                      {contact.phone || "N/A"}
                      {contact.phone && (
                        <button
                          className="text-xs px-2 py-1 bg-amber-100 rounded hover:bg-amber-200 border border-amber-300"
                          onClick={() => handleCopy(contact.phone!, `phone-${contact.id}`)}
                          title="Copy phone"
                        >
                          {copied[`phone-${contact.id}`] ? "Copied!" : "Copy"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="border px-4 py-2">{contact.message}</td>
                  <td className="border px-4 py-2">{new Date(contact.createdAt).toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded"
                      onClick={() => handleDelete(contact.id)}
                      title="Delete contact"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
            <p className="mb-4 text-sm text-gray-700">
              Deleting this contact submission will permanently remove it. This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => { setShowConfirm(false); setDeleteId(null) }}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}