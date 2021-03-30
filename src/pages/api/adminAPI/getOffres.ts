import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getProfil(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const emplois = await prisma.offre.findMany({
      include: {
        entreprise: true,
      },
    });
    res.json(emplois);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
