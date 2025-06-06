import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Handle POST (create new contact)
export async function POST(req: NextRequest) {
  const data = await req.json()
  try {
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        phone: data.phone || "N/A", // Optional phone
      },
    })
    return NextResponse.json({ message: "Contact saved" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to save contact" }, { status: 500 })
  }
}

// Handle GET (fetch all contacts)
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch contacts" }, { status: 500 })
  }
}