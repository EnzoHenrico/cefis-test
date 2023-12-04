export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  responseMessage: (data: {
    message: string
    username: string
    time: string
  }) => void
}

export interface ClientToServerEvents {
  message: (message: string, username: string, time: number) => void
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  message: string
  age: number
}
