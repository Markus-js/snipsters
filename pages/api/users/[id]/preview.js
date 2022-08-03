import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  const userId = req.query.id;
  switch (req.method) {
    case 'GET':
      const user = await prismaClient.User.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          image: true,
          followersIds: true,
        }
      });
      res.status(200).json(user);
      return;
    default:
      res.status(401).json({ error: 'Method Not Allowed' });
  }
}
