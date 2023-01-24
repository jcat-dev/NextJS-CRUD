import { Admin, Student } from "./person"
import { Role } from "./role"

export interface SearchUser {
  _id: string
  role: Role
  email: string
}

export interface NewUser {
  role: Role
  email: string
  password: string
  admin?: string
  student?: string
}

export interface User {
  _id: string
  role: Role
  email: string
  password: string
  admin?: Admin
  student?: Student
}