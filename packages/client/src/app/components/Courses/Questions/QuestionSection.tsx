import {
  CSSProperties,
  DOMAttributes,
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import QuestionBody from "./QuestionData";
import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function QuestionSection({ courseId }: { courseId: string }) {
  const [questionsList, setQuestionsList] = useState([] as Question[]);
  const [canReply, setIfCanReply] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id;

  // Get all questions from DB
  const getQuestions = async () => {
    const url = `api/course/questions?courseId=${courseId}`;
    try {
      const response: Response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setQuestionsList(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const getUserRole = async () => {
    if (!userId) {
      return;
    }
    try {
      const response: Response = await fetch(`/api/user?id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const user = await response.json();

      setIfCanReply(user.role === "teacher");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("questionTextArea")?.toString();

    const data: Partial<Question> = {
      content,
      courseId: parseInt(courseId),
    };

    try {
      const response: Response = await fetch("/api/course/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert("Erro ao enviar mensagem");
      }

      getQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    getUserRole();
  }, [userId]);

  return (
    <>
      <h3>Area de perguntas:</h3>
      <section className="questions-area">
        <div className="accordion" id="accordionExample">
          {questionsList.map((question) => (
            <QuestionBody
              key={question.id}
              question={question}
              canReply={canReply}
            />
          ))}
        </div>
        <hr />
        {!canReply && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="questionTextArea" className="form-label">
                Faça uma pergunta:
              </label>
              <textarea
                className="form-control"
                id="questionTextArea"
                name="questionTextArea"
                rows={3}
              ></textarea>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Enviar
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
