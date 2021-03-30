import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getEntreprises(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const entreprises = await prisma.entreprise.findMany();
    res.json(entreprises);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
