import { Server } from "socket.io"
import { createServer } from "http"
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@cefis_test/shared/socketTypes.js"
import "dotenv/config"

const server = createServer()

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Handle socket connections
io.on("connection", (socket) => {
  // Connection logs
  console.log(`User ${socket.id} connected on server.`)

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}.`)
  })

  // Trade client messages
  socket.on("message", (message, username, time) => {
    const formatedTime = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(time)

    io.emit("responseMessage", {
      message,
      username,
      time: formatedTime,
    })
  })
})

const PORT = process.env.SERVER_PORT || 3001

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})
