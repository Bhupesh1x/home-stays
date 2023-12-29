"use client";

import Image from "next/image";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/use-countries";

import Heading from "../shared/Heading";
import HeartButton from "../shared/HeartButton";

type Props = {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currUser?: SafeUser | null;
};

function ListingHead({ id, currUser, imageSrc, title, locationValue }: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.label}, ${location?.region}`}
      />
      <div className="h-[60vh] relative w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt="Image"
          fill
          className="object-cover rounded-md"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currUser={currUser} />
        </div>
      </div>
    </>
  );
}

export default ListingHead;
