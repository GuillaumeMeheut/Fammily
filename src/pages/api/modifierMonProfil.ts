import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { authenticated } from "../../../api/authenticated";
import { writeFile } from "fs/promises";

export default authenticated(async function modify(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  verify(req.cookies.auth!, process.env.secret, async function (err, decoded: any) {
    if (!err && decoded) {
      try {
        await prisma.user.update({
          where: {
            id: decoded.id,
          },
          data: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            promo: req.body.promo,
            domaine: req.body.domaine,
            bac: req.body.bac,
            metier: req.body.metier,
            image: `/assets/profil/imgProfil${decoded.id}.png`,
            description: req.body.description,
            conseil: req.body.conseil,
          },
        });
        try {
          writeFile(
            `./public/assets/profil/imgProfil${decoded.id}.png`,
            Buffer.from(req.body.photo, "base64")
          );
        } catch (err) {
          res.json({ message: "Une erreur est survenue pour l'envoi de l'image" });
        }
        res.json({ message: "Changement effectué avec succès !" });
      } catch (e) {
        res.json({ message: "Une erreur est survenue, vérifiez à nouveau les champs" });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      res.status(401).json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }
  });
});
