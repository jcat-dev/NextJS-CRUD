import database from "@/mongoose/database"
import { resError, resSuccessful } from "./queryResponse"

export async function findAllData(mongooseModel, res) {
  const db = await database()

  try {
    const result = await mongooseModel.find()

    return res.json({...resSuccessful, data: result})    
  } catch (error) {
    return res.json(resError)
  } finally {    
    db?.disconnect(() => console.log("BD disconnected."))
  }
}

export async function findDataByDni(mongooseModel, req, res) {
  const db = await database()

  try {
    const result = await mongooseModel.findOne({ dni: req.query.dni }).exec()  

    if (result) return res.json({...resSuccessful, data: result})
        
    throw new Error()
  } catch (error) {
    return res.json({...resError, msg: "DNI not found"})
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}

export async function findDataById(mongooseModel, req, res) {
  const db = await database()
  
  try {
    const result = await mongooseModel.findById(req.query.id).exec()

    if (result) return res.json({...resSuccessful, data: result})

    throw new Error()
  } catch (error) {
    return res.json({...resError, msg: "Data not found"})
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}
