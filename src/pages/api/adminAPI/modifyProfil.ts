import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { adminAuth } from "../../../../api/adminAuth";

export default adminAuth(async function modify(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.user.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        domaine: req.body.domaine,
        bac: req.body.bac,
        promo: req.body.promo,
        metier: req.body.metier,
        description: req.body.description,
        conseil: req.body.conseil,
        activate: req.body.active,
        etudiant: req.body.etudiant,
        isAdmin: req.body.admin,
      },
    });
    res.json({ message: "Modification effectué avec succès !" });
  } catch (e) {
    res.json({ message: "Une erreur est survenue" });
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
});
