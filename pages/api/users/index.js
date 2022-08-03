import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  const userId = req.query.id;
  switch (req.method) {
    case 'GET':
      const users = await prismaClient.User.findMany({
        include: {
          snippets: {
            where: {
              AND: [
                { isDeleted: false },
                { public: true }
              ]
            }
          }
        }
      })
      res.status(200).json(users);
      return;
    default:
      res.status(401).json({ error: 'Method Not Allowed' });
  }
}
