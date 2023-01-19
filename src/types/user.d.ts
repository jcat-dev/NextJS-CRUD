import { Admin, Student } from "./person"
import { Role } from "./role"

export interface User {
  _id: string
  role: Role
  email: string
  password: string
  admin?: Admin
  student?: Student
}