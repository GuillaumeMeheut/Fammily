import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../../api/authenticated";

export default authenticated(async function getEtudiants(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const offres = await prisma.offre.findMany({
      include: {
        entreprise: true,
      },
    });
    res.json(offres);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
});
