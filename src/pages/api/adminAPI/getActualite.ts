import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getActualites(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const actualites = await prisma.actualite.findMany();
    res.json(actualites);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
