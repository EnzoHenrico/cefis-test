import { Course, User } from "@prisma/client"
import { PrismaInstance } from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

// Find courses 
export async function GET(request: NextRequest) {
  try {      
    // By ID
    const params_id = request.nextUrl.searchParams.get("id")
    if (params_id) {
      const prismaResponse: Course | null = await PrismaInstance.course.findUnique({ 
        where: { 
          id: parseInt(params_id)
        }
      })
      return NextResponse.json(prismaResponse)
    }
    
    // By title
    const params_title = request.nextUrl.searchParams.get("title")
    if (params_title) {
      const prismaResponse: Course | null = await PrismaInstance.course.findFirst({
        where: { 
          title: params_title 
        }
      })
      return NextResponse.json(prismaResponse)
      }
    
    // When no parametter return all courses
    const prismaResponse: Course[] = await PrismaInstance.course.findMany()
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ ERROR: error })
  }
}

// Add a new course
export async function POST(request: NextRequest) {
  try {
    const data: Course = await request.json()
    const prismaResponse = await PrismaInstance.course.create({ data })
    
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ ERROR: error }) 
  }
}

// Update course info
export async function UPDATE(request: NextRequest) {
  try {
    const data: Course = await request.json()
    const prismaResponse = await PrismaInstance.course.update({ 
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ ERROR: error }) 
  }
}

// Delete Course
export async function DELETE(request: NextRequest) {
  try {
    const data: User = await request.json()
    console.log(data)
    
    const prismaResponse = await PrismaInstance.course.delete({ 
      where: {
        id: data.id,
      }
    })

    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ ERROR: error }) 
  }
}
