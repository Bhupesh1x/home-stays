"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/app/types";
import { Listing } from "@prisma/client";

import HeartButton from "../shared/HeartButton";
import useCountries from "@/app/hooks/use-countries";

type Props = {
  listing: Listing;
  currUser?: SafeUser | null;
};

function ListingCard({ listing, currUser }: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing?.locationValue);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="aspect-square rounded-xl overflow-hidden relative w-full">
          <Image
            src={listing.imageSrc}
            fill
            className="h-full w-full object-cover group-hover:scale-110 transition"
            alt="listing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currUser={currUser} />
          </div>
        </div>
        <p className="font-semibold">
          {location?.label}, {location?.region}
        </p>
        <p className="font-light">{listing.category}</p>
        <div className="flex items-center gap-1">
          <p className="font-semibold">$ {listing.price}</p>
          <p className="font-light">night</p>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
