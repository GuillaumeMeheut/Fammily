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
        activate: true,
      },
    });
    res.json({ message: "Compte validé" });
  } catch (e) {
    res.json({ message: "Une erreur est survenue" });
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
});
