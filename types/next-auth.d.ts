import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: Int;
      name: string;
      role: string;
    }
  }
}