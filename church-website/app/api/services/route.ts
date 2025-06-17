import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { id: "asc" },
  })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const service = await prisma.service.create({
    data: {
      day: data.day,
      time: data.time,
      service: data.service,
    },
  })
  return NextResponse.json(service)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    const updated = await prisma.service.update({
      where: { id: data.id },
      data: {
        day: data.day,
        time: data.time,
        service: data.service,
      },
    })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
