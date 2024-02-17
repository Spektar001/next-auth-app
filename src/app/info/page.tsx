"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const InfoPage = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data;
  console.log(session);

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div>
      <h2 className="text-xl">
        Welcome, {userData?.user?.name || userData?.user?.email}
      </h2>
      <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </button>
    </div>
  );
};

export default InfoPage;
