import React from "react";
import { useSession } from "next-auth/react";
import Following from "./Following";
import MightKnow from "./MightKnow";
import Activities from "./Activities";
import style from './aside.module.scss';

export default function Aside({ user }) {
  const { data: session } = useSession();
  return (
    <section className={style.profileAside}>
      <Following user={user} />
      {session?.user?.id === user.id && <MightKnow user={user} />}
      <Activities user={user} />
    </section>
  );
}
