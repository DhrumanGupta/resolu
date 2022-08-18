import { prisma } from "lib/db";
import { withSessionRoute } from "lib/sesion";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/DTOs";

const authorizedRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
  ) => undefined | Promise<any> | void
) => {
  return withSessionRoute(async (req, res) => {
    if (!req.session.user) {
      return res.status(401).send({ msg: "Not logged in" });
    }

    const user = await prisma.user.findFirst({
      where: { id: req.session.user?.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      req.session.destroy();
      return res.status(403).send({ msg: "Not logged in" });
    }

    return handler(req, res, user);
  });
};

export default authorizedRoute;
