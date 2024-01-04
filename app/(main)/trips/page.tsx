import getCurrUser from "@/app/actions/getCurrentUser";
import { getReservations } from "@/app/actions/getReservations";

import EmptyState from "@/app/components/shared/EmptyState";
import TripsClient from "@/app/components/trips/TripsClient";

async function TripsPage() {
  const currUser = await getCurrUser();

  if (!currUser) {
    return (
      <EmptyState title="Unauthorized" subTitle="Please login to continue." />
    );
  }

  const reservations = await getReservations({ userId: currUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currUser={currUser} />;
}

export default TripsPage;
