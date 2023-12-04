import {
  CSSProperties,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@cefis_test/shared/socketTypes"
import { useSession } from "next-auth/react"
import "./style.css"

type MessageData = {
  message: string
  username: string
  fullTime: string
  shortTime: string
}
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export default function Chat() {
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const [history, setHistory] = useState<MessageData[]>()
  const { data: session } = useSession()

  useEffect(() => {
    if (!serverUrl) {
      throw new Error("Environment variable not set")
    }

    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(serverUrl)
    socket.current = newSocket

    newSocket.on("responseMessage", (data) => {
      setHistory((old) => {
        const newMessage = {
          message: data.message,
          username: data.username,
          fullTime: data.fullTime,
          shortTime: data.shortTime,
        }

        if (!old) {
          return [newMessage]
        }
        return [...old, newMessage]
      })
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!socket.current) {
      alert("Erro: Recarregue a pagina e tente novamente")
      return
    }

    const formData = new FormData(e.currentTarget)
    const message = formData.get("messageInput")?.toString()
    const date = new Date()
    const time = date.getTime()
    const username = session?.user.name || "undefined"

    // Send messages
    if (message) {
      socket.current.emit("message", message, username, time)
    }

    // Clean field
    e.currentTarget["messageInput"].value = ""
  }

  return (
    <>
      <h3>Group Chat</h3>
      <hr />
      <div className="chat-wrapper">
        <div className="chat bg-body-tertiary rounded-2 p-3" id="chat">
          {history
            ? history.map((data, index) => {
                let isAuthor = false
                if (data.username === session?.user.name) {
                  isAuthor = true
                }
                return (
                  <div
                    key={index}
                    className={isAuthor ? "message send" : "message received"}
                    title={data.fullTime}
                  >
                    <div className="message-header">
                      <span>{data.username}</span>
                    </div>
                    <div className="message-body">
                      {data.message}
                      <span>{data.shortTime}</span>
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
      </div>
      <form className="chat-input mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            id="messageInput"
            name="messageInput"
            autoComplete="off"
          ></input>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </>
  )
}
