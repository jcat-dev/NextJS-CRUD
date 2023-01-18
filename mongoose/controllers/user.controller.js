import database from "@/mongoose/database"
import userModel from "../models/user.model"

export async function getUserWithPopulate(user) {
  const db = await database() 

  try {
    return await userModel.findOne(user).populate("admin").populate("student").exec()
  } catch (error) {
    return null
  } finally {    
    db?.disconnect(() => console.log("BD disconnected."))
  }
} 
