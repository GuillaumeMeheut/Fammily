import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { adminAuth } from "../../../../api/adminAuth";

export default adminAuth(async function delEntreprise(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.entreprise.delete({
      where: {
        id: Number(req.body.id),
      },
    });
    res.json({ message: "Entreprise supprimé" });
  } catch (e) {
    res.json({ message: "Une erreur est survenue lors de la suppression" });
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
});
