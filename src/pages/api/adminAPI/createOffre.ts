import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getProfil(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const emploi = await prisma.offre.create({
      data: {
        titre: req.body.titre,
        lieu: req.body.lieu,
        domaine: req.body.domaine,
        description: req.body.description,
        entrepriseId: req.body.entrepriseId,
      },
    });
    res.json(emploi);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
