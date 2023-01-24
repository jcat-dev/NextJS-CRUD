import { saveData } from "@/mongoose/controllers/save.controller";
import userModel from "@/mongoose/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return saveData(userModel, req, res)
}