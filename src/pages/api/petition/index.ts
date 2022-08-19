import authorizedRoute from "lib/middlewares/authorizedRoute";
import {
  getPetitions as getPetitionsFromDb,
  createPetition as createPetitionFromDb,
} from "lib/repos/petition";
import type { NextApiRequest, NextApiResponse } from "next";
import { Petition, User } from "types/DTOs";
import { ErrorFallback } from "types/responses";

interface GetRequest extends NextApiRequest {
  query: {
    cursor?: string;
    search?: string;
  };
}

const getPetitions = async (
  req: GetRequest,
  res: NextApiResponse<Petition[]>
) => {
  const { cursor, search } = req.query;

  const petitions = await getPetitionsFromDb({
    cursor,
    search,
  });
  return res.status(200).send(petitions);
};

interface PostRequest extends NextApiRequest {
  body: {
    title: string;
    description: string;
    goal: number;
    videoName: string;
    latitude: number;
    longitude: number;
  };
}

const createPetition = async (
  req: PostRequest,
  res: NextApiResponse<ErrorFallback<Petition>>,
  user: User
) => {
  const { title, description, goal, videoName, latitude, longitude } = req.body;
  if (
    title === undefined ||
    description === undefined ||
    goal === undefined ||
    videoName === undefined ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).send({ msg: "Missing required fields" });
  }

  const petition = await createPetitionFromDb({
    title,
    description,
    goal,
    videoName,
    latitude,
    longitude,
    user,
  });

  if (!petition) {
    return res.status(400).send({ msg: "Duplicate (1)" });
  }

  return res.status(200).send(petition);
};

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = (req.method as keyof typeof methods) || "GET";
  if (methods[method] === undefined) {
    return res.status(405).send({ msg: `${method} not allowed.` });
  }
  return await methods[method](req, res);
};

const methods = {
  GET: getPetitions,
  POST: authorizedRoute(createPetition),
};

export default route;
