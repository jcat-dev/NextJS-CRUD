import { Role } from "./role"

export interface Credential {
  email: string
  password: string
}

export interface Login {
  id: string
  role: Role,
  name: string
  email: string 
  image?: string | null | undefined;
}