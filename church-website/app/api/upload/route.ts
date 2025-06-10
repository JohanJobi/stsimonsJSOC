import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file = data.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }).end(buffer)
    })

    return NextResponse.json({ url: upload.secure_url, publicId: upload.public_id })
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}