"use client";

import { useMemo } from "react";

import { SafeListings, SafeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";

import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

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
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
            guestCount={listing.guestCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingClient;
