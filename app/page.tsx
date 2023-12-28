import db from "./lib/db";
import getCurrUser from "./actions/getCurrentUser";

import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const currUser = await getCurrUser();
  const listings = await db.listing.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
