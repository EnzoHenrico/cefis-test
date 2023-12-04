import { Course } from "@prisma/client"
import { FormEventHandler } from "react"

export default function ConfigButton({
  courseData,
}: {
  courseData: Course | undefined
}) {
  const updateCourseData = async (newData: Partial<Course>) => {
    if (!courseData) {
      alert("Erro a atualizar dados. Tente mais tarde")
      return
    }

    try {
      const response: Response = await fetch("/api/course", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      })

      if (!response.ok) {
        alert("Erro ao responder mensagem")
        return
      }

      const course: Course = await response.json()
      return course
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const newTitle =
      formData.get("course-title")?.toString() || courseData?.title
    const newDescription =
      formData.get("course-description")?.toString() || courseData?.description

    if (!newTitle || !newDescription) {
      return
    }

    const payload: Partial<Course> = {
      id: courseData?.id,
      title: newTitle,
      description: newDescription,
    }

    const updateResponse = await updateCourseData(payload)

    if (!updateResponse) {
      return
    }

    window.location.reload()
  }

  return (
    <div className="course-options">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Opções
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
              href="#"
            >
              Editar curso
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              style={{ color: "red" }}
              href="#"
            >
              Excluir
            </a>
          </li>
        </ul>
      </div>
      {/* Delete course modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex={-1}
        aria-labelledby="deleteModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="delete-modal">
                Excluir curso
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Deseja realmente excluir este curso? Todas as informações serão
              apagadas permanentemente!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger">
                Sim, desejo excluir esse curso.
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Não, desejo voltar.
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Update course modal form */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={-1}
        aria-labelledby="updateModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="update-modal">
                Atualizar curso
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Edit course form */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="course-title" className="form-label">
                    Título do curso
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="course-title"
                    name="course-title"
                    placeholder={courseData?.title ?? ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course-description" className="form-label">
                    Descrição do curso
                  </label>
                  <textarea
                    className="form-control"
                    id="course-description"
                    name="course-description"
                    placeholder={courseData?.description ?? ""}
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secundary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
