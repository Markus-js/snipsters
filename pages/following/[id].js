import React from "react";
import FollowingDetails from "features/FollowingDetails";
import Layout from "layout/fullscreen";
import { prismaClient } from "prisma/prisma";

export default function Following({ user }) {
  return <Layout main={<FollowingDetails user={user} />} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const user = await prismaClient.User.findUnique({
    where: { id },
  });
  return {
    props: {
      user,
    },
  };
}
