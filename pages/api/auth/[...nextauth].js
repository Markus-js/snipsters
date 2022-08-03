import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({
      session,
      user: {
        id,
        name,
        image,
        email,
      },
    }) {
      session.user = {
        id,
        name,
        image,
        email,
      }
      return session
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
})
