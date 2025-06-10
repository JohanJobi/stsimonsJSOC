import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from "cloudinary"

const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
      publicId: data.publicId,
      eventId, // link to event if present
    },
  })
  return NextResponse.json(image)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    const image = await prisma.image.findUnique({ where: { id } })
    if (image?.publicId) {
      await cloudinary.uploader.destroy(image.publicId)
    }
    await prisma.image.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}