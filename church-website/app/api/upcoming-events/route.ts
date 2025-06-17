import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: List all upcoming events
export async function GET() {
  const events = await prisma.upcomingEvent.findMany({
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(events);
}

// POST: Create a new upcoming event
export async function POST(req: NextRequest) {
  const { title, description, date } = await req.json();
  if (!title || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const event = await prisma.upcomingEvent.create({
    data: { title, description, date: new Date(date) },
  });
  return NextResponse.json(event);
}

// PUT: Update an upcoming event
export async function PUT(req: NextRequest) {
  const { id, title, description, date } = await req.json();
  if (!id || !title || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const event = await prisma.upcomingEvent.update({
    where: { id },
    data: { title, description, date: new Date(date) },
  });
  return NextResponse.json(event);
}

// DELETE: Delete an upcoming event
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await prisma.upcomingEvent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
