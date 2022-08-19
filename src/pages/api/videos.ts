import type { NextApiRequest, NextApiResponse } from "next";
import busboy, { FileInfo } from "busboy";
import fs from "fs";
import { prisma } from "lib/db";
import { createHash } from "crypto";
import type { Readable } from "stream";
import { User } from "types/DTOs";
import authorizedRoute from "lib/middlewares/authorizedRoute";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CHUNK_SIZE_IN_BYTES = 1000000; // ~1mb
// type Data = {
//   name: string;
// };

const hash = (data: string): string => {
  return createHash("md5").update(data).digest("hex");
};

function uploadVideoStream(
  req: NextApiRequest,
  res: NextApiResponse
  user: User
) {
  console.log(req.session.user);
  const bb = busboy({ headers: req.headers });

  let valid: undefined | boolean = undefined;

  bb.on("file", async (_, file, info) => {
    if (valid === false) {
      req.unpipe(bb);
      return res.status(400).send({ msg: "Invalid petition" });
    }
    const fileName = hash(info.filename);

    // if (valid === undefined) {
    //   const user = await prisma.petition.findFirst({
    //     where: { videoId: fileName },
    //   });
    //   if (!user) {
    //     valid = false;
    //     req.unpipe(bb);
    //     return res.status(400).send({ msg: "Invalid petition" });
    //   }
    // }

    const filePath = `./videos/${fileName}.mp4`;

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end("Video uploaded successfully!");
  });

  req.pipe(bb);

  return;
}

function getVideoStream(req: NextApiRequest, res: NextApiResponse) {
  const range = req.headers.range;

  if (!range || !req.query.videoId) {
    return res.status(400).send({ msg: "No range provided" });
  }

  const videoId = hash(req.query.videoId as string);
  const videoPath = `./videos/${videoId}.mp4`;

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send({ msg: "Video not found" });
  }

  const videoSizeInBytes = fs.statSync(videoPath).size;

  const chunkStart = Number(range.replace(/\D/g, ""));
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd,
  });

  videoStream.pipe(res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method || "GET";

  if (method == "GET") {
    return getVideoStream(req, res);
  }

  if (method == "POST") {
    return authorizedRoute(uploadVideoStream)(req, res);
  }

  return res.status(405).send({ msg: `Method ${method} not allowed` });
}
