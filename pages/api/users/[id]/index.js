import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  const userId = req.query.id;
  const sessionToken = req.cookies['next-auth.session-token'] || null;
  switch (req.method) {
    case 'GET':
      try {
        if (sessionToken) {
          const userSession = await prismaClient.Session.findUnique({
            where: {
              sessionToken
            }
          })
          const loggedInUser = userSession.userId === userId
          const user = await prismaClient.User.findUnique({
            where: { id: userId },
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
              snippets: {
                where: loggedInUser
                  ? { isDeleted: false }
                  : {
                      AND: [
                        { public: true },
                        { isDeleted: false },
                      ]
                },
                include: {
                  author: { select: { id: true, name: true, image: true, followersIds: true } },
                },
                orderBy: {
                  createdAt: 'desc',
                }
              },
              following: true,
              followingIds: true,
              followers: true,
              followersIds: true,
              favourites: true,
              votedForIds: true,
              activity: true
            }
          });
          res.status(200).json(user);
          return;
        }
        const user = await prismaClient.User.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            image: true,
            snippets: {
              where: {
                AND: [
                  { public: true },
                  { isDeleted: false }
                ] 
              },
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                author: { select: { id: true, name: true, image: true, followersIds: true } },
              }
            },
            following: true,
            followingIds: true,
            followers: true,
            followersIds: true,
            favourites: true,
            votedForIds: true,
            activity: true
          }
        });
        res.status(200).json(user);
        return;
      } catch(e) {
        res.status(500).json({ error: e.message })
      }
    case 'PATCH':
      const { action, followerId } = JSON.parse(req.body);
      switch (action) {
        case 'FOLLOW':
          try {
            await prismaClient.Action.create({
              data: {
                type: 'FOLLOW_USER',
                actor: {
                  connect: { id: followerId },
                },
                targetUser: {
                  connect: { id: userId },
                }
              }
            })
            const following = await prismaClient.User.update({
              where: { id: userId },
              data: {
                followers: {
                  connect: { id: followerId }
                }
              },
              include: {
                snippets: true,
                followers: true,
                following: true,
              },
            });
            res.status(200).json(following);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
        case 'UNFOLLOW':
          try {
            await prismaClient.Action.deleteMany({
              where: {
                AND: [
                  { targetUserId: userId },
                  { actorId: followerId },
                  { type: 'FOLLOW_USER' },
                ]
              },
            })
            const unfollowed = await prismaClient.User.update({
              where: { id: userId },
              data: {
                followers: {
                  disconnect: { id: followerId }
                }
              },
              include: {
                snippets: true,
                followers: true,
                following: true,
              },
            });
            res.status(200).json(unfollowed);
            return;
          } catch(e) {
            res.status(500).json({ error: e.message })
          }
      }
      return;
    default:
      res.status(401).json({ error: 'Method Not Allowed' });
  }
}
