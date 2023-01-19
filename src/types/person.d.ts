import { Plan } from "./plan"

export interface Admin {
  _id: string 
  name: string
  surname: string
  dni: string
  phone: string
  email: string
  birthday: Date
}

export interface Student extends Admin {
  plan: Plan
}