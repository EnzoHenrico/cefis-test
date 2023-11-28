'user client'

import { Reply } from "@prisma/client"

export default function ReplyData({ reply }: { reply: Reply }) {

  return(
    <div className="card text-bg-light mb-3">
      <div className="card-header">{`Resposta de: Professor(a) ${reply.authorName}`}</div>
      <div className="card-body">
        <p className="card-text">{reply.content}</p>
      </div>
    </div>
  )
}
