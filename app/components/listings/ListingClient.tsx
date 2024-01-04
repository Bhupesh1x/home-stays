"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";

import { SafeListings, SafeUser } from "@/app/types";
import { useModal } from "@/app/hooks/use-modal-hook";
import { categories } from "@/app/components/navbar/Categories";

import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservations from "./ListingReservations";

const initialRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  listing: SafeListings & {
    user: SafeUser;
  };
  currUser?: SafeUser | null;
  reservations: Reservation[];
};

function ListingClient({ listing, currUser, reservations = [] }: Props) {
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

  const { onOpen } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialRange);

  const onCreateReservations = useCallback(async () => {
    if (!currUser) {
      return onOpen("login");
    }

    setIsLoading(true);
    try {
      await axios.post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success("Listing Reserved");
      setDateRange(initialRange);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [
    currUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    onOpen,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

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
          <div className="order-first md:order-last md:col-span-3 mb-10">
            <ListingReservations
              price={listing.price}
              totalPrice={totalPrice}
              dateRange={dateRange}
              onDateChange={(value) => setDateRange(value)}
              onSubmit={onCreateReservations}
              disabledDates={disabledDates}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingClient;
