import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getProfil(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const entreprise = await prisma.entreprise.create({
      data: {
        nom: req.body.nom,
        siren: req.body.siren,
        ville: req.body.ville,
        departement: req.body.departement,
        mail: req.body.mail,
        tel: req.body.tel,
      },
    });
    res.json(entreprise);
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
