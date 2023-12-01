import { FormEventHandler, useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:3001')
console.log(socket)

export default function Chat() {
  const [message, setMessage] = useState("")
  const [history, setHistory] = useState([] as string[])
  
  useEffect(() => {
    socketInit()
  }, [])
  
  const socketInit = () => {            
    socket.connect().on("connection", () => {
      console.log("Connection ok!")
    })

    // socket.on("receive-message", (newMessage) => {
    //   setHistory((oldMessages) => [...oldMessages, newMessage])
    // })
  }
  
  const handleSubmit = () => {
    socket.emit("send-message", message)
    setMessage("")
  }

  return(
    <>
    <h1>Group Chat</h1>
      {history.map((message, index) => {
        <p key={index}>{message}</p>
      })}
          <div className="mb-3">
            <input 
              value={message}
              onChange={(e) => {setMessage(e.target.value)}}
              className="form-control" id="messageInput" name="messageInput">
            </input>
          </div>
          <div className="col-auto">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-3">Enviar</button>
          </div>
        
    </>
  )
}