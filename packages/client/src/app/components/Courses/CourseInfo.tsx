import { Course } from "@prisma/client"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import QuestionSection from "./Questions/QuestionSection"
import ConfigButton from "./ConfigButton"

export default function CourseInfo() {
  const [courseData, setCourseData] = useState<Course>()
  const urlParams = useSearchParams()
  const paramId = urlParams.get("id")

  let courseId: string

  if (!paramId) {
    courseId = ""
    redirect("/error")
  } else {
    courseId = paramId
  }

  // Get course info from DB
  const getCourseData = async () => {
    const url = `api/course?id=${paramId}`
    try {
      const response: Response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setCourseData(await response.json())
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCourseData()
  }, [])

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>{courseData?.title ?? "Título do cruso"}</h1>
        <ConfigButton courseData={courseData} />
      </div>
      <p>{courseData?.description ?? "Sem descrição."}</p>
      <hr />
      <QuestionSection courseId={courseId} />
    </>
  )
}
