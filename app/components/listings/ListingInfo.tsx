"use client";

import dynamic from "next/dynamic";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/use-countries";

import Avatar from "../shared/Avatar";
import ListingCategory from "./ListingCategory";

type Props = {
  user: SafeUser;
  category:
    | {
        label: string;
        icon: JSX.Element;
        description: string;
      }
    | undefined;
  description: string;
  locationValue: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
};

const Map = dynamic(() => import("../shared/Map"), {
  ssr: false,
});

function ListingInfo({
  user,
  category,
  bathroomCount,
  description,
  guestCount,
  locationValue,
  roomCount,
}: Props) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 space-y-5">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <p>Hosted By {user?.name}</p>
        <Avatar src={user?.image} />
      </div>
      <div className="flex items-center gap-3 font-light text-neutral-500">
        <p>{guestCount} Guests</p>
        <p>{roomCount} Rooms</p>
        <p>{bathroomCount} Bathrooms</p>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />

      <Map center={coordinates!} />
    </div>
  );
}

export default ListingInfo;
