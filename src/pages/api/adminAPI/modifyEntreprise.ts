import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { adminAuth } from "../../../../api/adminAuth";

export default adminAuth(async function modify(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.entreprise.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        nom: req.body.nom,
        siren: req.body.siren,
        ville: req.body.ville,
        departement: req.body.departement,
        mail: req.body.mail,
        tel: req.body.tel,
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
