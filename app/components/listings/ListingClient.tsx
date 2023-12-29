"use client";

import { useMemo } from "react";

import ListingHead from "./ListingHead";

import { SafeListings, SafeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";

type Props = {
  listing: SafeListings & {
    user: SafeUser;
  };
  currUser?: SafeUser | null;
};

function ListingClient({ listing, currUser }: Props) {
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

  return (
    <div className="max-w-screen-lg mx-auto px-6 lg:px-0">
      <div className="flex flex-col gap-6">
        <ListingHead
          id={listing.id}
          currUser={currUser}
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
        />
      </div>
    </div>
  );
}

export default ListingClient;
