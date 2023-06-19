'use client'

import { useSession } from "next-auth/react";

export const TestClientSideSession = () => {
  const { data: session, status } = useSession();

  return <div>{JSON.stringify(session)}</div>
}