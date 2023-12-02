"use-client";

import { FormEventHandler, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [history, setHistory] = useState([] as string[]);

  const initSocket = () => {
    socket.on("hello", (greet) => console.log(greet));

    socket.on("response-message", ({ message }) => {
      setHistory((old) => [...old, message]);
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("messageInput")?.toString();

    socket.emit("message", message);
  };

  useEffect(() => {
    initSocket();
  }, []);

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
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
