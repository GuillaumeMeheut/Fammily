import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const adminAuth = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, process.env.secret, async function (err, decoded: any) {
    if (!err && decoded && decoded.isAdmin === true) {
      return await fn(req, res);
    } else {
      res.status(401).json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }
  });
};
