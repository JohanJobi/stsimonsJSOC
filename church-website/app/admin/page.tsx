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

  if (status === "loading") return <div>Loading...</div>
  if (!session) return null

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}