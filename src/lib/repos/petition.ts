import { prisma } from "lib/db";
import { Prisma } from "@prisma/client";
import type { Petition, User } from "types/DTOs";
import { hash } from "pages/api/videos";

type HydratedPetition = Prisma.PetitionGetPayload<{
  include: { votes: true; listedBy: true };
}>;

const DtoFromHydrated = (petition: HydratedPetition): Petition => ({
  id: petition.id,
  title: petition.title,
  description: petition.description,
  listedOn: petition.listedOn,
  goal: petition.goal,
  votes: petition.votes.length,
  latitude: petition.latitude,
  longitude: petition.longitude,
  videoId: petition.videoId,
  listedBy: petition.listedBy,
});

interface GetBookProps {
  cursor?: string;
  search?: string;
}

async function getPetitions({
  cursor,
  search,
}: GetBookProps): Promise<Petition[]> {
  const query: Parameters<typeof prisma.petition.findMany>[0] = {
    take: 20,
    orderBy: {
      listedOn: "desc",
    },
    include: {
      votes: {
        select: {
          voterEmail: true,
        },
      },
      listedBy: {
        select: {
          email: true,
          name: true,
          id: true,
        },
      },
    },
  };

  if (cursor) {
    query.cursor = { id: cursor };
  }

  if (search) {
    query.where = {
      ...query.where,
      title: { contains: search, mode: "insensitive" },
    };
  }

  const petitions = (await prisma.petition.findMany(
    query
  )) as HydratedPetition[];

  const transformed = petitions.map(DtoFromHydrated);

  return transformed;
}

async function getPetition({ id }: { id: string }): Promise<Petition | null> {
  if (!id) {
    return null;
  }

  const petition = (await prisma.petition.findFirst({
    where: { id },
    include: {
      votes: {
        select: {
          voterEmail: true,
        },
      },
      listedBy: {
        select: {
          email: true,
          name: true,
          id: true,
        },
      },
    },
  })) as HydratedPetition;

  if (!petition) {
    return null;
  }

  const transformed = DtoFromHydrated(petition);

  return transformed;
}

async function createPetition({
  title,
  description,
  goal,
  videoName,
  latitude,
  longitude,
  user,
}: {
  title: string;
  description: string;
  goal: number;
  videoName: string;
  latitude: number;
  longitude: number;
  user: User;
}): Promise<Petition | null> {
  const videoId = hash(videoName);
  const existsWithVideo =
    (await prisma.petition.count({ where: { videoId } })) > 0;
  if (existsWithVideo) {
    return null;
  }

  const petition = await prisma.petition.create({
    data: {
      title,
      description,
      goal,
      videoId,
      latitude,
      longitude,
      listedById: user.id,
    },
    include: {
      votes: {
        select: {
          voterEmail: true,
        },
      },
    },
  });

  return DtoFromHydrated(petition as HydratedPetition);
}

export { getPetitions, getPetition, createPetition };
