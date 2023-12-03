"use client"

import "../globals.css"
import Chat from "../components/Chat/Chat"
import { io } from "socket.io-client"

export default function Home() {
  return (
    <main>
      <Chat />
    </main>
  )
}
