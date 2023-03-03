import database from "@/mongoose/database"
import userModel from "../models/user.model"
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { NewUser, UserWithID } from "@/src/types/user"
import { resError, resSuccessful } from "./queryResponse"
import { Credential, Login } from "@/src/types/credential"

export async function findUserWithPopulate(credential: Credential) {
  const db = await database() 

  try {
    if (!db) throw new Error()

    const data: UserWithID = await userModel.findOne({ email: credential.email })
      .populate({
        path: "admin",
        select: "name surname"
      })
      .populate({
        path: "student",
        select: "name surname"
      })
      .exec()

    const result = await bcrypt.compare(credential.password, data.password)

    if (result) {      
      const user: Login = {
        id: data._id.toString() ,
        email: data.email,
        role: data.role,
        name: ""
      }

      if (data.admin) {
        return { ...user, name: `${data.admin.name} ${data.admin.surname}` }
      }

      if (data.student) {
        return { ...user, name: `${data.student.name} ${data.student.surname}` }
      }
    }

    return null
  } catch (error) {
    return null
  } finally {    
    db?.disconnect(() => console.log("BD disconnected."))
  }
} 

export async function saveUser(req: NextApiRequest, res:NextApiResponse) {
  const db = await database() 

  try {
    if (!db) throw new Error()

    const newUser: NewUser = req.body
    const hash = await bcrypt.hash(newUser.password, 10)
    const data = new userModel({ ...newUser, password: hash })
    await data.save()

    return res.json({...resSuccessful, msg: "Save successful"})
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const msg = Object.values(error.errors).map((value: any) => value.message)

      return res.json({...resError, "msg": msg[0]})
    }

    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " already exists"

      return res.json({...resError, "msg": msg})
    }

    return res.json({...resError, "msg": "Save failed"})
  } finally {    
    db?.disconnect(() => console.log("BD disconnected."))
  }
}