import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    if (req.method === "POST") {
      const email = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (!email) {
        hash(req.body.password, 10, async function (err, hash) {
          // Store hash in your password DB.

          const user = await prisma.user.create({
            data: {
              email: req.body.email,
              password: hash,
              nom: req.body.nom,
              prenom: req.body.prenom,
            },
          });
          res.json({
            message:
              "Création réussie ! Un email vous sera envoyé lorsque votre compte sera approuvé",
          });

          main(user).catch(console.error);
        });
      } else {
        res.json({ message: "Adresse mail déjà utilisé" });
      }
    } else {
      res.status(405).json({ message: "We only support POST" });
    }
  } catch (e) {
    res.json("Une erreur est survenue lors de la création de votre compte");
  } finally {
    await prisma.$disconnect();
  }
}

async function main(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "fammilylimoges@outlook.fr",
      pass: process.env.passwordMail,
    },
  });

  await transporter.sendMail({
    from: '"Fammily" <fammilylimoges@outlook.fr>',
    to: "fammilylimoges@outlook.fr",
    subject: "Validation d'un profil",
    html: `
  <b>${user.prenom} ${user.nom}</b> souhaite rejoindre Fammily, l'acceptez vous ?<br>
  <a href="${process.env.adress}api/UDtxeVn2ZsKWXXn1/valid/${user.id}">Validez</a><br>
  <a href="${process.env.adress}api/UDtxeVn2ZsKWXXn1/delete/${user.id}">Refusez</a>
  `,
  });
}
