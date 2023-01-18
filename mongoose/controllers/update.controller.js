import database from "@/mongoose/database"
import { resError, resSuccessful } from "./queryResponse"

export async function updateDataById(mongooseModel, req, res) {
  const db = await database()

  try {
    const { _id, ...data } = req.body
    await mongooseModel.findByIdAndUpdate( _id, data)

    return res.json(resSuccessful)
  } catch (error) {
    return res.json({...resError, msg: "Update failed"})
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}
