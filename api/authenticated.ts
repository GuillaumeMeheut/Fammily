import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, process.env.secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }

    res.status(401).json({ message: "Désolé, vous n'êtes pas connecté..." });
  });
};
