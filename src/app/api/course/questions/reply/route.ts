import { NextRequest, NextResponse, userAgent } from "next/server"
import { PrismaInstance } from "../../../../../../prisma/client"
import { Reply } from "@prisma/client"

PrismaInstance
// Get question reply
export async function GET(request: NextRequest) {
  const params_id = request.nextUrl.searchParams.get("id")
  
  if (!params_id) {
    return NextResponse.json([] as Reply[])
  }
  
  try {
    const prismaResponse: Reply | null = await PrismaInstance.reply.findUnique({ 
      where: { 
        id: parseInt(params_id)
      }
    })

    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const data: Reply = await request.json()

  try {
    const prismaResponse: Reply | null = await PrismaInstance.reply.create({ data })
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })    
  }
}