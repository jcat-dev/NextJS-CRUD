import { findDataById } from "@/mongoose/controllers/find.controller";
import planModel from "@/mongoose/models/plan.model";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return findDataById(planModel, req, res)
}