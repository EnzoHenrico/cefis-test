import { FormEventHandler, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@cefis_test/shared/socketTypes"

export default function Chat() {
  const serverUrl = "http://localhost:3001"
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const [history, setHistory] = useState([] as string[])

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(serverUrl)
    socket.current = newSocket

    newSocket.on("responseMessage", (message) => {
      setHistory((old) => [...old, message])
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

    // Send messages
    if (message) {
      socket.current.emit("message", message)
    }

    // Clean field
    e.currentTarget["messageInput"].value = ""
  }

  const chatStyle = {}

  return (
    <main>
      <h1>Group Chat</h1>
      <div>
        {history.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            id="messageInput"
            name="messageInput"
          ></input>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Enviar
          </button>
        </div>
      </form>
    </main>
  )
}
