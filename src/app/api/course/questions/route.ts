import { NextRequest, NextResponse, userAgent } from "next/server"
import { PrismaInstance } from "../../../../../prisma/client"
import { Question } from "@prisma/client"
import { getServerSession } from "next-auth"

PrismaInstance
// Find questions based on course
export async function GET(request: NextRequest) {
  const params_course_id = request.nextUrl.searchParams.get("courseId")    
  
  if (!params_course_id) {
    return NextResponse.json([] as Question[])
  }
  
  try {
    const prismaResponse: Question[] = await PrismaInstance.question.findMany({ 
      where: { 
        courseId: parseInt(params_course_id)
      }
    })
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Post a new question
export async function POST(request: NextRequest) {
  try {
    const sessionData = await getServerSession()

    if (!sessionData?.user?.name) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const payload: Question = await request.json()
    const data = {
      ...payload,
      createdBy: sessionData?.user?.name,
    }

    const prismaResponse = await PrismaInstance.question.create({ data })
    
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Update question
export async function PATCH(request: NextRequest) {
  const params_id = request.nextUrl.searchParams.get("questionId")
  
  if (!params_id) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 })
  }
  
  try {
    const payload: Partial<Question> = await request.json()
    const prismaResponse: Question | null = await PrismaInstance.question.update({ 
      where: {
        id: parseInt(params_id),
      },
      data: {
        ...payload
      }
    })
    return NextResponse.json(prismaResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
  
