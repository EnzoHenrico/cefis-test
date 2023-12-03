export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  responseMessage: (message: string) => void
}

export interface ClientToServerEvents {
  message: (message: string) => void
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  message: string
  age: number
}
