import { saveUser } from "@/mongoose/controllers/user.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await saveUser(req, res)
}