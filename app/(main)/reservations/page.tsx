import getCurrUser from "@/app/actions/getCurrentUser";
import { getReservations } from "@/app/actions/getReservations";

import EmptyState from "@/app/components/shared/EmptyState";
import ReservationClient from "@/app/components/reservations/ReservationClient";

async function Reservationspage() {
  const currUser = await getCurrUser();

  if (!currUser) {
    return (
      <EmptyState title="Unauthorized" subTitle="Please login to continue." />
    );
  }

  const reservations = await getReservations({ authorId: currUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you haven no reservations on your property."
      />
    );
  }

  return <ReservationClient reservations={reservations} currUser={currUser} />;
}

export default Reservationspage;
