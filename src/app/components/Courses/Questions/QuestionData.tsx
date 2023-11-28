import { Question, Reply } from "@prisma/client"
import { FormEventHandler, useEffect, useState } from "react"
import ReplyData from "./ReplyData"
import { useSession } from "next-auth/react"

export default function QuestionBody({ question, canReply } : { question: Question, canReply: Boolean }) {
  const [replyData, setReplyData] = useState({} as Reply)
  const { data: session } = useSession()


  const getReply = async () => {
    try {
      const response: Response = await fetch(`/api/course/questions/reply?id=${question.replyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      const reply = await response.json()
      if (reply) {
        setReplyData(reply)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createReply = async (replyData: Partial<Reply>) => {
    const response: Response = await fetch('/api/course/questions/reply', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyData)
    })

    if (!response.ok) {
      alert("Erro ao responder mensagem")
      return {} as Reply 
    }

    const reply: Reply = await response.json()
    return reply
  }

  const updateQuestion = async (questionData: Partial<Question>) => {
    const response: Response = await fetch(`/api/course/questions?questionId=${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData)
    })
    
    if (!response.ok) {
      alert("Erro ao atualizar resposta")   
      return null
    }

    return await response.json() as Question
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async(e) => { 
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const content = formData.get("replyTextArea")?.toString()
    
    try { 
      const replyData: Partial<Reply> = {
        content,
        authorName: session?.user.name,
      }
      const reply: Reply = await createReply(replyData) 
      
      if (!reply) {
        return null
      }
      
      const questionData: Partial<Question> = {
        replied: true,
        replyId: reply.id,
      }

      await updateQuestion(questionData)
      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => { 
    if (question.replied) {
      getReply() 
    }
  }, [])
  
  return(
    <div className="card text-bg mb-3">
        <div className="card-header">{`Pergunta de: ${question.createdBy}`}</div>
        <div className="card-body">
          <p className="card-text">{question.content}</p>
          {question.replied ? <ReplyData reply={replyData}/> : 
          canReply && 
            <form onSubmit={handleSubmit}> 
              <div className="mb-3">
                <label htmlFor="replyTextArea" className="form-label">Responder:</label>
                <textarea className="form-control" id="replyTextArea" name="replyTextArea" rows={3}></textarea>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Responder</button>
              </div>
            </form>}
        </div>
      </div>
  )
}
