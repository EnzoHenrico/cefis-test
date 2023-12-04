import { Users } from "./data/User"
import { Courses } from "./data/Course"
import { Questions } from "./data/Question"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
  try {
    // Seed User table
    Users.map(async (user) => {
      await prisma.user.create({
        data: user,
      })
    })

    // Seed Course table
    Courses.map(async (course) => {
      await prisma.course.create({
        data: course,
      })
    })

    // Seed Question table
    Questions.map(async (question) => {
      await prisma.question.create({
        data: question,
      })
    })

    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

// Run seed
seed()
