import { NextApiRequest, NextApiResponse } from "next";
import { findAllData } from "@/mongoose/controllers/find.controller";
import { saveData } from "@/mongoose/controllers/save.controller";
import { deleteDataById } from "@/mongoose/controllers/delete.controller";
import { updateDataById } from "@/mongoose/controllers/update.controller"
import planModel from "@/mongoose/models/plan.model";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET": return await findAllData(planModel, res); break;
    case "POST": return saveData(planModel, req, res); break;
    case "DELETE": return deleteDataById(planModel, req, res); break;
    case "PUT": return updateDataById(planModel, req, res); break;
    
    default: return res.json({
      "status": null, 
      "msg": "Error Method", 
      "data": null
    }); break;
  }
  
}