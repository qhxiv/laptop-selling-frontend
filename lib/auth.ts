import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password")
        }

        try {
          const res = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.message || "Invalid credentials")
          }

          if (typeof data === "string") {
            throw new Error(data)
          }

          // Get user info from token
          const userRes = await fetch("http://localhost:3000/user", {
            headers: {
              "Authorization": `Bearer ${data.access_token}`
            }
          })

          if (!userRes.ok) {
            throw new Error("Failed to get user info")
          }

          const userData = await userRes.json()

          // Return user object with access token
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            accessToken: data.access_token,
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Authentication failed")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add access token and role to the token right after signin
      if (user) {
        token.accessToken = user.accessToken
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add access token and role to the session
      if (token) {
        session.user.accessToken = token.accessToken
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export async function getSession() {
  return await getServerSession(authOptions)
} 