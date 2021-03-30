import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { adminAuth } from "../../../../api/adminAuth";

export default adminAuth(async function modify(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.offre.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        titre: req.body.titre,
        lieu: req.body.lieu,
        domaine: req.body.domaine,
        description: req.body.description,
        entrepriseId: req.body.entrepriseId,
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
