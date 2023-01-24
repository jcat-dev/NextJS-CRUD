import { findDataByDni } from "@/mongoose/controllers/find.controller";
import studentModel from "@/mongoose/models/student.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return findDataByDni(studentModel, req, res)
}