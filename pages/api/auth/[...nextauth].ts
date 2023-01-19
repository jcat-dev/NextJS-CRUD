import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserWithPopulate } from "@/mongoose/controllers/user.controller"
import { User } from "@/src/types/user"

const credentials = {
  email: { label: "email", type: "email" },
  password: { label: "Password", type: "password" },
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",      
      credentials: credentials,
      async authorize(credentials) {        
        const searchUser = {
          email: credentials?.email,
          password: credentials?.password
        }
        
        const data: User = await getUserWithPopulate(searchUser)

        if (data) {
          const user = {
            id: data._id,
            email: data.email,
            role: data.role
          }

          if (data.admin) {
            return { ...user, name: `${data.admin.name} ${data.admin.surname}` }
          }
  
          if (data.student) {
            return { ...user, name: `${data.student.name} ${data.student.surname}` }
          }
        }       
        
        return null
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