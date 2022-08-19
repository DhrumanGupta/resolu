import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import validate from "lib/middlewares/validate";
import type { ErrorFallback } from "types/responses";
import { withSessionRoute } from "lib/sesion";
import { getPetition } from "lib/repos/petition";
import { prisma } from "lib/db";

interface Request extends NextApiRequest {
  body: {
    petitionId: string;
    email: string;
  };
}

const schema = Joi.object({
  email: Joi.string().email().required(),
  petitionId: Joi.string().required(),
});

const handler = async (
  req: Request,
  res: NextApiResponse<ErrorFallback<{}>>
) => {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests allowed" });
    return;
  }

  const { email, petitionId } = req.body;

  const petition = await getPetition({ id: petitionId });
  if (!petition) {
    return res.status(404).send({ msg: "Petition Not Found" });
  }

  const userExists = await prisma.vote.findFirst({
    where: { voterEmail: email, petitionId },
  });

  if (userExists) {
    return res.status(409).send({ msg: "User already voted" });
  }

  const vote = await prisma.vote.create({
    data: {
      voterEmail: email,
      petitionId,
    },
  });

  res.status(201).send({ msg: "success" });
};

export default validate({ body: schema }, async (req, res) => {
  return await withSessionRoute(handler)(req, res);
});
