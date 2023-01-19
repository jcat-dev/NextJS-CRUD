import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "./role"

declare module "next-auth" {
  interface Session {
    user: {
      role: Role,
      name: string
      email: string 
      image?: string | null | undefined;
    }
  }
}