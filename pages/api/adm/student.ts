import { saveData } from "@/mongoose/controllers/save.controller";
import studentModel from "@/mongoose/models/student.model";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest ,res: NextApiResponse) {
  return saveData(studentModel, req, res)
}