import { User } from "@prisma/client"
import { PrismaInstance } from "../../../../prisma/client"
import { NextRequest, NextResponse } from "next/server"

// Find Users 
export async function GET(request: NextRequest) {
  try {      
    // By ID
    const params_id = request.nextUrl.searchParams.get("id")
    if (params_id) {
      const prismaResponse: User | null = await PrismaInstance.user.findUnique({ 
        where: { 
          id: parseInt(params_id)
        }
      })
      return NextResponse.json(prismaResponse)
    }
    
    // By name
    const params_name = request.nextUrl.searchParams.get("name")
    if (params_name) {
      const prismaResponse: User | null = await PrismaInstance.user.findFirst({
        where: { 
          name: params_name 
        }
      })
      return NextResponse.json(prismaResponse)
      }
    
    // When no parametter return all users
    const prismaResponse: User[] = await PrismaInstance.user.findMany()
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Add a new user
export async function POST(request: NextRequest) {
  try {
    const data: User = await request.json()
    const prismaResponse = await PrismaInstance.user.create({ data })
    
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Update user info
export async function PATCH(request: NextRequest) {
  try {
    const data: User = await request.json()
    const prismaResponse = await PrismaInstance.user.update({ 
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Delete User
export async function DELETE(request: NextRequest) {
  try {
    const data: User = await request.json()
    
    const prismaResponse = await PrismaInstance.user.delete({ 
      where: {
        id: data.id,
      }
    })

    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
