import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const images = await prisma.image.findMany({
    orderBy: { createdAt: "desc" },
    include: { event: true }, // <-- include event relation
  })
  return NextResponse.json(images)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  let eventId = null

  if (data.category === "events" && data.event) {
    // Find or create the event
    const event = await prisma.event.upsert({
      where: { name: data.event },
      update: {},
      create: { name: data.event },
    })
    eventId = event.id
  }

  const image = await prisma.image.create({
    data: {
      src: data.src,
      alt: data.alt,
      category: data.category,
      section: data.section,
      eventId, // link to event if present
    },
  })
  return NextResponse.json(image)
}