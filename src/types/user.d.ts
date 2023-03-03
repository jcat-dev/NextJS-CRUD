import { Admin, Student } from "./person"
import { Role } from "./role"

export interface NewUser {
  role: Role
  email: string
  password: string
  admin?: string
  student?: string
}

export interface User {
  role: Role
  email: string
  password: string
  admin?: Admin
  student?: Student
}

export interface UserWithID extends User {
  _id: string
}