import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function valid(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    await prisma.user.delete({
      where: {
        id: Number(req.query.id),
      },
    });

    res.json({ message: "Compte supprimé." });
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}
