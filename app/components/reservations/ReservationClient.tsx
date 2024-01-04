"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { SafeReservations, SafeUser } from "@/app/types";

import Heading from "../shared/Heading";
import Container from "../shared/Container";
import ListingCard from "../listings/ListingCard";

type Props = {
  reservations: SafeReservations[];
  currUser?: SafeUser | null;
};

function ReservationClient({ reservations, currUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      const notify = toast.loading("Cancelling Reservation...");
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation Cancelled", {
          id: notify,
        });
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            currUser={currUser}
            actionId={reservation.id}
            actionLabel="Cancel Guest Reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationClient;
