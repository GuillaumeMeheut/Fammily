import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getProfil(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const profils = await prisma.user.findMany();
    res.json(profils);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
