import { prismaClient } from "/prisma/prisma"

export default async function handler(req, res) {
  const userId = req.query.id;
  switch (req.method) {
    case 'GET':
      const data = await prismaClient.User.findUnique({
        where: { id: userId },
        select: {
          following: {
            select: {
              activity: {
                include: {
                  actor: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      followersIds: true,
                    }
                  },
                  targetUser: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      followersIds: true
                    }
                  },
                  targetSnippet: {
                    select: {
                      id: true,
                      title: true,
                      language: true,
                      content: true,
                      author: true,
                      favouritedByIds: true,
                      votesIds: true
                    }
                  }
                }
              },
            },
          },
        },
      });
      const activityFeed = data.following
        .flatMap(user => user.activity)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(-50);
      res.status(200).json(activityFeed);
      return;
    default:
      res.status(401).json({ error: 'Method Not Allowed' });
  }
}