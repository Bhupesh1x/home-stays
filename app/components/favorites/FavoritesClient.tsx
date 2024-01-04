import { SafeListings, SafeUser } from "@/app/types";

import Heading from "../shared/Heading";
import Container from "../shared/Container";
import ListingCard from "../listings/ListingCard";

type Props = {
  listings: SafeListings[];
  currUser?: SafeUser | null;
};

function FavoritesClient({ listings, currUser }: Props) {
  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="List of places you have favorited!"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} currUser={currUser} />
        ))}
      </div>
    </Container>
  );
}

export default FavoritesClient;
