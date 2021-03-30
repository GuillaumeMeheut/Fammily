import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
    );

    res.json({ message: "Déconnecté" });
  } catch (e) {
    res.json({ message: "Erreur lors de la déconnexion" });
  }
}
