import React, { useState, useEffect } from "react";
import { getUser } from "./utils/getUser";
import Profile from "./components/Profile";
import { useRouter } from "next/router";
import Layout from "layout/split";
import Aside from "./components/Aside";

export default function UserDetail() {
  const { query } = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    if (query.id) {
      getUser(query.id).then((data) => {
        setUser(data);
      });
    }
  }, [query.id]);

  return (
    user && (
      <Layout
        main={<Profile user={user} setUser={setUser} />}
        aside={<Aside user={user} />}
      />
    )
  );
}
