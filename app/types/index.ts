import { Listing, Reservation, User } from "@prisma/client";

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

export type SafeReservations = Omit<
  Reservation,
  "createdAt" | "updatedAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListings;
};
