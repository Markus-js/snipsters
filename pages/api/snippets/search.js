import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const searchQuery = req.query;
      try {
        const snippets = await prismaClient.Snippet.findMany({
          where: {
            AND: [
              { public: true },
              { isDeleted: false },
              { title: { contains: searchQuery.query, mode: 'insensitive' }},
              {
                language: {
                  in: searchQuery.language.split(',')
                },
              }
            ]
          },
          select: {
            id: true,
            title: true,
            author: { select: { id: true, name: true, image: true, followersIds: true } },
            content:true,
            language: true,
            createdAt: true,
            description: true,
            tags: true,
            votesIds: true,
            favouritedByIds: true,
            refactorsIds: true,
          }
        });
        res.status(200).json(snippets);
      } catch(e) {
        console.error(e);
        res.status(500).json({ error: e.message });
      }
      break;
    default:
      res.status(401).json({ error: 'Method Not Allowed' })
  }
}