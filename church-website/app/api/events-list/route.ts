import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(events)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const event = await prisma.event.create({
    data: {
      name: data.name,
      createdAt: data.createdAt || new Date(),
    },
  })
  return NextResponse.json(event)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    await prisma.event.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    const updated = await prisma.event.update({
      where: { id: data.id },
      data: {
        name: data.name,
        createdAt: data.createdAt,
      },
    })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
