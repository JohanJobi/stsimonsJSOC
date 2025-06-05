import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// backend API route to handle contact form submissions
export async function POST(req: NextRequest) {
  const data = await req.json()
  const logLine = `[${new Date().toISOString()}] ${JSON.stringify(data)}\n`
  const filePath = path.join(process.cwd(), "contact-submissions.txt")

  try {
    fs.appendFileSync(filePath, logLine, "utf8")
    return NextResponse.json({ message: "Contact saved" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to save contact" }, { status: 500 })
  }
}