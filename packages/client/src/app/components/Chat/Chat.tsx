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
  time: string
}

export default function Chat() {
  const serverUrl = process.env.SERVER_URL || ""
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const lastMessageDiv = useRef<HTMLDivElement>(null)
  const [history, setHistory] = useState<MessageData[]>()
  const { data: session } = useSession()

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(serverUrl)
    socket.current = newSocket

    newSocket.on("responseMessage", (data) => {
      setHistory((old) => {
        const newMessage = {
          message: data.message,
          username: data.username,
          time: data.time,
        }

        // Scroll to the last message div on every new message
        lastMessageDiv.current?.scrollIntoView()

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
                  title={data.time}
                >
                  <small>{data.username}</small>
                  <span>{data.message}</span>
                </div>
              )
            })
          : ""}
        <div ref={lastMessageDiv}></div>
      </div>
      <form className="chat-input mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            id="messageInput"
            name="messageInput"
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
