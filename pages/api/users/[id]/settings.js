import { prismaClient } from "/prisma/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      const { action, userId, avatar, value } = JSON.parse(req.body);
      switch (action) {
        case "AVATAR":
          const profilePicture = await prismaClient.User.update({
            where: { id: userId },
            data: {
              image: avatar,
            },
          });
          res.status(200).json(profilePicture);
          return;
        case "NAME":
          const name = await prismaClient.User.update({
            where: { id: userId },
            data: {
              name: value,
            },
          });
          res.status(200).json(name);
          return;
        case "BIO":
          const bio = await prismaClient.User.update({
            where: { id: userId },
            data: {
              bio: value,
            },
          });
          res.status(200).json(bio);
          return;
      }
      return;
    default:
      res.status(401).json({ error: "Method Not Allowed" });
  }
}
