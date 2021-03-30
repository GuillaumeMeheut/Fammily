import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { authenticated } from "../../../api/authenticated";

export default authenticated(async function getProfil(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    verify(req.cookies.auth!, process.env.secret, async function (err, decoded: any) {
      if (!err && decoded) {
        const user = await prisma.user.findFirst({
          where: {
            id: decoded.id,
            activate: true,
          },
        });
        res.json(user);
      } else {
        res.status(401).json({ message: "Vous n'êtes pas connecté" });
      }
    });
  } catch (e) {
    res.json({ message: "Une erreur est survenue" });
  } finally {
    await prisma.$disconnect();
  }
});
