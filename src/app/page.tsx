'use client'

import CoursesList from "./components/Home/CoursesList"
import { useSession } from "next-auth/react"
import './globals.css'
import { redirect } from "next/navigation"

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('api/auth/signin')
    }
  }) 
  
  return (
   <main>
    <h1>{`Hello! ${session?.user?.name ?? 'User'}`}</h1>
    <hr/>
    <h3>Avaliable Courses:</h3>
    <CoursesList/>
   </main>
  )
}
