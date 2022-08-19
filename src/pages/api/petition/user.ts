import { Petition, User } from "types/DTOs";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  DtoFromHydrated,
  getPetition as getPetitionFromDB,
} from "lib/repos/petition";
import { ErrorFallback } from "types/responses";
import { prisma } from "lib/db";
import authorizedRoute from "lib/middlewares/authorizedRoute";

const getPetition = async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorFallback<Petition[]>>,
  user: User
) => {
  const petitions = await prisma.petition.findMany({
    where: { listedById: user.id },
    include: { votes: true, listedBy: true },
  });
  return res.status(200).send(petitions.map(DtoFromHydrated));
};

export default authorizedRoute(getPetition);
