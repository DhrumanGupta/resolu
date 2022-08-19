import { Petition } from "types/DTOs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPetition as getPetitionFromDB } from "lib/repos/petition";
import { ErrorFallback } from "types/responses";

const getPetition = async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorFallback<Petition>>
) => {
  const { id } = req.query as { id: string };
  const petition = await getPetitionFromDB({ id });
  if (!petition) {
    return res.status(404).send({ msg: "Not Found" });
  }
  return res.status(200).send(petition);
};

export default getPetition;
