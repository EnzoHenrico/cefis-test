import { Course } from "@prisma/client"
import { useEffect, useState } from "react"

export default function CoursesList() {
  const emptyList: Course[] = []
  const [coursesList, setCoursesList] = useState(emptyList)
  
  // Get all courses from DB
  const getCourses = async () => {
    const url = 'api/course'
    try {
      const response: Response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setCoursesList(await response.json())
    } catch (error) {
      console.error(error)
    }
  }
  useEffect( () => { getCourses() }, [])

  return(
  <>
    <div className="list-group">
      {
        coursesList?.map((course) => (
          <a href={`/courses?id=${course.id}`} className="list-group-item list-group-item-action" aria-current="true" key={course.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{course.title}</h5>
              <small>{course.lengthInHours + " Horas"}</small>
            </div>
            <p className="mb-1">{course.description}</p>
          </a>      
        ))
      }
    </div>
  </>
  )
}
