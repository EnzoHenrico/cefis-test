import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", async (socket) => {
  // Greet a user connection
  socket.emit("hello", `User ${socket.id} connected on server.`);

  // Broadcast messages
  socket.on("message", (message) => {
    io.emit("response-message", { message });
  });
});

io.on("disconnect", (socket) => {
  console.log(`User ${socket.id} disconnected!.`);
});

const PORT = process.env.SERVER_PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
