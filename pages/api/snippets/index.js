import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const snippets = await prismaClient.Snippet.findMany({
          where: {
            AND: [
              { public: true },
              { isDeleted: false },
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
            public: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        res.status(200).json(snippets);
      } catch(e) {
        console.error(e);
        res.status(500).json({ error: e.message });
      }
      break;
    case 'POST':
      const { title, content, authorId, isPublic, language, description } = req.body
      try {
        if (isPublic) {
          const createAction = await prismaClient.Action.create({
            data: {
              type: 'CREATE_SNIPPET',
              actor: {
                connect: { id: authorId },
              }
            }
          })
          const snippet = await prismaClient.Snippet.create({
            data: {
              title,
              author: {
                connect: { id: authorId },
              },
              events: {
                connect: { id: createAction.id },
              },
              content,
              language,
              public: true,
              description: description,
            },
          });
          res.status(201).json(snippet);
          return;
        }
        const snippet = await prismaClient.Snippet.create({
          data: {
            title,
            author: {
              connect: { id: authorId },
            },
            content,
            language,
            public: false,
          },
        });
        res.status(201).json(snippet);
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message });
      }
      break;
    default:
      res.status(401).json({ error: 'Method Not Allowed' })
  }
}