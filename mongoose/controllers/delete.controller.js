import database from "@/mongoose/database"
import { resError, resSuccessful } from "./queryResponse"

export async function deleteDataById(mongooseModel, req, res) {
  const db = await database()

  try {
    await mongooseModel.findByIdAndDelete(req.body._id)

    return res.json({...resSuccessful, msg: "Delete successful"})
  } catch (error) {
    return res.json({...resError, msg: "Delete failed"})
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}