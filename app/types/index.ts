import { Listing, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListings = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
