import getCurrUser from "../actions/getCurrentUser";
import { IListingParams, getListings } from "../actions/getListings";

import Container from "../components/shared/Container";
import EmptyState from "../components/shared/EmptyState";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  searchParams: IListingParams;
};

export default async function Home({ searchParams }: Props) {
  const currUser = await getCurrUser();
  const listings = await getListings(searchParams);

  if (!listings.length) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} currUser={currUser} />
        ))}
      </div>
    </Container>
  );
}
