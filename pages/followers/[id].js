import React from "react";
import FollowersDetails from "features/FollowersDetails";
import Layout from "layout/fullscreen";
import { prismaClient } from "prisma/prisma";

export default function Followers({ user }) {
  return <Layout main={<FollowersDetails user={user} />} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const user = await prismaClient.User.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
      followers: true,
    },
  });
  return {
    props: {
      user,
    },
  };
}
