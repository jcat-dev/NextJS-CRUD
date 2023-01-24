import { NextApiRequest, NextApiResponse } from "next";
import { findDataByDni } from "@/mongoose/controllers/find.controller"
import adminModel from "@/mongoose/models/admin.model";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return findDataByDni(adminModel, req, res)
}