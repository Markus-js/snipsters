import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  const snippetId = req.query.id;
  switch (req.method) {
    case 'GET':
      const snippet = await prismaClient.Snippet.findMany({
        where: {
          AND: [
            {id: snippetId},
            {isDeleted: false},
          ]
        },
        select: {
          id: true,
          title: true,
          author: true,
          content: true,
          language: true,
          createdAt: true,
          description: true,
          tags: true,
          votesIds: true,
          favouritedBy: true,
          refactors: true,
          basedOn: true,
          comments: true,
        }
      });
      res.status(200).json(snippet);
      return;
    case 'PATCH':
      const { action, userId } = JSON.parse(req.body);
      const userSession = await prismaClient.Session.findUnique({
        where: {
          sessionToken: req.cookies['next-auth.session-token']
        }
      })
      switch (action) {
        case 'DELETE':
          try {
            await prismaClient.Action.deleteMany({
              where: {
                AND: [
                  { targetSnippetId: snippetId },
                ]
              },
            })
            const deleted = await prismaClient.Snippet.updateMany({
              where: {
                AND: [
                  { id: snippetId },
                  { authorId: userSession.userId },
                ]
              },
              data: {
                votesIds: {
                  set: [],
                },
                favouritedByIds: {
                  set: [],
                },
                refactorsIds: {
                  set: [],
                },
                isDeleted: true,
              },
            });
            if (deleted.count === 0) {
              res.status(401).json({ deleted: false });
              return;
            }
            res.status(200).json({ deleted: true });
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'VOTE':
          try {
            await prismaClient.Action.create({
              data: {
                type: 'VOTE_SNIPPET',
                actor: {
                  connect: { id: userId },
                },
                targetSnippet: {
                  connect: { id: snippetId },
                }
              }
            })
            const upvoted = await prismaClient.Snippet.update({
              where:{ id: snippetId },
              data: {
                votes: {
                  connect: {
                    id: userId
                  }
                }
              },
              include: {
                author: true,
              }
            })
            res.status(200).json(upvoted);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'UNVOTE':
          try {
            await prismaClient.Action.deleteMany({
              where: {
                AND: [
                  { targetSnippetId: snippetId },
                  { actorId: userId },
                  { type: 'VOTE_SNIPPET' },
                ]
              },
            })
            const unvoted = await prismaClient.Snippet.update({
              where: { id: snippetId },
              data: {
                votes: {
                  disconnect: {
                    id: userId
                  }
                }
              },
              include: {
                author: true,
              }
            })
            res.status(200).json(unvoted);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'FAVORITE':
          try {
            await prismaClient.Action.create({
              data: {
                type: 'FAVOURITE_SNIPPET',
                actor: {
                  connect: { id: userId },
                },
                targetSnippet: {
                  connect: { id: snippetId },
                }
              }
            })
            const favorited = await prismaClient.Snippet.update({
              where: { id: snippetId },
              data: {
                favouritedBy: {
                  connect: {
                    id: userId
                  }
                }
              },
              include: {
                author: true,
              }
            });
            res.status(200).json(favorited);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'UNFAVORITE':
          try {
            await prismaClient.Action.deleteMany({
              where: {
                AND: [
                  { targetSnippetId: snippetId },
                  { actorId: userId },
                  { type: 'FAVOURITE_SNIPPET' },
                ]
              },
            })
            const unfavorited = await prismaClient.Snippet.update({
              where: { id: snippetId },
              data: {
                favouritedBy: {
                  disconnect: { id: userId },
                }
              },
              include: {
                author: true,
              }
            });
            res.status(200).json(unfavorited);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'PUBLIC':
          try {
            await prismaClient.Action.create({
              data: {
                type: 'CREATE_SNIPPET',
                actor: {
                  connect: { id: userSession.userId },
                },
                targetSnippet: {
                  connect: { id: snippetId }
                },
              }
            })
            const publicSnippet = await prismaClient.Snippet.updateMany({
              where: {
                AND: [
                  { id: snippetId },
                  { authorId: userSession.userId },
                ]
              },
              data: {
                public: true,
              }
            });
            if (publicSnippet.count === 0) {
              res.status(401).json({ error: 'Unauthorized' });
              return;
            }
            res.status(200).json({ isPublic: true });
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'PRIVATE':
          try {
            await prismaClient.Action.deleteMany({
              where: {
                AND: [
                  { targetSnippetId: snippetId },
                  { actorId: userSession.userId },
                  { type: 'CREATE_SNIPPET' },
                ]
              },
            });
            const privateSnippet = await prismaClient.Snippet.updateMany({
              where: {
                AND: [
                  { id: snippetId },
                  { authorId: userSession.userId },
                ]
              },
              data: {
                public: false
              }
            });
            if (privateSnippet.count === 0) {
              res.status(401).json({ error: 'Unauthorized' });
              return;
            }
            res.status(200).json({ isPublic: false });
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        default:
          res.status(400).json({ error: 'Method Not Allowed' });
      }
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}
