"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import useCountries from "@/app/hooks/use-countries";
import { SafeListings, SafeReservations, SafeUser } from "@/app/types";

import Button from "../shared/Button";
import HeartButton from "../shared/HeartButton";

type Props = {
  listing: SafeListings;
  currUser?: SafeUser | null;
  reservation?: SafeReservations;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
};

function ListingCard({
  listing,
  currUser,
  reservation,
  actionId = "",
  actionLabel,
  onAction,
  disabled,
}: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing?.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

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
        <p className="font-light">{reservationDate || listing.category}</p>
        <div className="flex items-center gap-1">
          <p className="font-semibold">$ {price}</p>
          {!reservation && <p className="font-light">night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;
