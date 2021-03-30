import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import cookie from "cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    if (req.method === "POST") {
      const user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
          activate: true,
        },
      });

      compare(req.body.password, user.password, function (err, result) {
        if (!err && result) {
          const claims = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            isEtu: user.etudiant,
          };
          const jwt = sign(claims, process.env.secret, { expiresIn: "1h" });

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );
          res.json({ message: "Bienvenue" });
        } else {
          res.json({ message: "Email ou mot de passe incorrect" });
        }
      });
    } else {
      res.status(405).json({ message: "We only support POST" });
    }
  } catch (e) {
    res.json({ message: "Email ou mot de passe incorrect" });
  } finally {
    await prisma.$disconnect();
  }
}
