"user client"

import { Reply } from "@prisma/client"

export default function ReplyData({ reply }: { reply: Reply }) {
  return (
    <div
      className="p-3 text-primary-emphasis bg-primary-subtle border-primary-subtle rounded-3"
      style={{ border: "none" }}
    >
      <div className="card-body">
        <h6 className="card-title ">{`Resposta de: Professor(a) ${reply.authorName}`}</h6>
        <p className="card-text">{reply.content}</p>
      </div>
    </div>
  )
}
