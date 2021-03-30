import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { adminAuth } from "./../../../../api/adminAuth";
import { writeFile } from "fs/promises";

export default adminAuth(async function modify(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.actualite.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        titre: req.body.titre,
        texte: req.body.texte,
      },
    });
    try {
      writeFile(
        `./public/assets/actualite/imgActu${req.body.id}.png`,
        Buffer.from(req.body.image, "base64")
      );
    } catch (err) {
      res.json({ message: "Une erreur est survenue pour l'envoi de l'image" });
    }
    res.json({ message: "Modification effectué avec succès !" });
  } catch (e) {
    res.json({ message: "Une erreur est survenue" });
  } finally {
    await prisma.$disconnect();
  }
});
