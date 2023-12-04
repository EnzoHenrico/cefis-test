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
const appUrl = process.env.APP_URL

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: appUrl,
    methods: ["GET", "POST"],
  },
})

// Handle socket connections
io.on("connection", (socket) => {
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

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})
