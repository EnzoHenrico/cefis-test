import { Server } from "socket.io"
import { createServer } from "http"

// Socket server up
const server = createServer((request, response) => {

})

console.log(process.env.APP_URL);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected on server.`)
})
  
io.on("disconnect", (socket) => {
  console.log(`User ${socket.id} disconnected!.`)
})

const PORT = process.env.SOCKET_IO_PORT || 3001

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})