import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User as UserModel } from "@prisma/client"
import { PrismaInstance } from "../../../../../prisma/client"

declare module "next-auth" {
  interface User extends UserModel {
    id: number
    password?: string
    updatedAt?: Date
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Nome de usuário:",
          type: "text",
          placeholder: "Usuário",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (credentials?.username == null || credentials?.password == null) {
          return null
        }
        const user: UserModel | null = await PrismaInstance.user.findUnique({
          where: {
            username: credentials.username,
            password: credentials.password,
          },
        })
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.token = token
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
