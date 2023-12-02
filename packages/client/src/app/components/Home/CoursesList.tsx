import { Course } from "@prisma/client";
import { useEffect, useState } from "react";

export default function CoursesList() {
  const [coursesList, setCoursesList] = useState([] as Course[]);

  // Get all courses from DB
  const getCourses = async () => {
    try {
      const response: Response = await fetch("/api/course", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const course = await response.json();
      setCoursesList(course);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className="list-group">
        {coursesList.map((course) => (
          <a
            href={`/courses?id=${course.id}`}
            className="list-group-item list-group-item-action"
            aria-current="true"
            key={course.id}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{course.title}</h5>
              <small>{course.lengthInHours + " Horas"}</small>
            </div>
            <p className="mb-1">{course.description}</p>
          </a>
        ))}
      </div>
    </>
  );
}
