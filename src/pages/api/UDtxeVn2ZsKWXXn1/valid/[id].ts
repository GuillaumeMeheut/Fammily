import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

export default async function valid(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        activate: true,
      },
    });

    main(user.email).catch(console.error);

    res.json({ message: "Compte validé ! Un email a été envoyé à l'étudiant." });
  } catch (e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
}

async function main(email) {
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
    to: email,
    subject: "Compte approuvé !",
    html: `
      Félicitation ! Votre compte a été approuvée, vous pouvez dès à présent compléter vos informations en cliquant <a href='${process.env.adress}modifierProfil'>ici</a>.
      `,
  });
}
