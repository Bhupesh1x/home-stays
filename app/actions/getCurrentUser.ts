import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "../lib/db";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currUser = await db.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currUser) {
      return null;
    }

    return currUser;
  } catch (error) {
    return null;
  }
}
