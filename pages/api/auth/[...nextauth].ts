import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUserWithPopulate } from "@/mongoose/controllers/user.controller"
import { Credential } from "@/src/types/credential"

const credentials = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",      
      credentials: credentials,
      async authorize(credentials) { 
        if (!credentials?.email || !credentials?.password) return null

        const credential: Credential = {
          email: credentials.email,
          password: credentials.password
        }
        
        return await findUserWithPopulate(credential)      
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }: any) {       
      if (user) {
        token.role = user.role   
      }

      return token
    },
    async session({session, token}: any) {      
      session.user.role = token.role
      return session
    }
  }
}

export default NextAuth(authOptions)