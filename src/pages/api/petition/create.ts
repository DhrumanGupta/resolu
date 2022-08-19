import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send({ msg: `Method ${req.method} not allowed` });
  }
}
