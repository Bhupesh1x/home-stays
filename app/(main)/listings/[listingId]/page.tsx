import getCurrUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/shared/EmptyState";
import { getListingById } from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/getReservations";
import ListingClient from "@/app/components/listings/ListingClient";

async function ListingsIdPage({ params }: { params: { listingId: string } }) {
  const currUser = await getCurrUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currUser={currUser}
      reservations={reservations}
    />
  );
}

export default ListingsIdPage;
