import { saveData } from "@/mongoose/controllers/save.controller";
import adminModel from "@/mongoose/models/admin.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
 
  switch (method) {
    case "GET":  break;
    case "POST": return saveData(adminModel, req, res); break;
    case "PUT": break;
    case "DELETE": break;

    default: return res.json({
      "status": null, 
      "msg": "Error method", 
      "data": null
    }); break;
  }
}