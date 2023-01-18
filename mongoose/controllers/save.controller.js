import database from "@/mongoose/database"
import { resError, resSuccessful } from "./queryResponse"

export async function saveData(mongooseModel, req, res) {
  const db = await database()
  
  try {
    const newData = mongooseModel(req.body)
    await newData.save()

    return res.json({...resSuccessful, msg: "Save successful"})
  } catch (error) {
    
    if (error.name === "ValidationError") {
      const msg = Object.values(error.errors).map(value => value.message)

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