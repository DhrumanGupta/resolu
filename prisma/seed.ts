import { PrismaClient, User } from "@prisma/client";
import { generateHashWithSalt } from "../src/lib/crypto";

const prisma = new PrismaClient();

const createUser = async ({
  password,
  email,
  name,
}: {
  password: string;
  email: string;
  name: string;
}) => {
  const { salt, hash } = generateHashWithSalt(password);
  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      salt,
      passwordHash: hash,
    },
  });
};

async function main() {
  const user = await createUser({
    email: "test@gmail.com",
    password: "test1234",
    name: "Test Person",
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
