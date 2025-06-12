import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: User & {
      role?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
} 