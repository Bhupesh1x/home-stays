import getCurrUser from "@/app/actions/getCurrentUser";
import { getFavoriteListings } from "@/app/actions/getFavoriteListings";

import EmptyState from "@/app/components/shared/EmptyState";
import FavoritesClient from "@/app/components/favorites/FavoritesClient";

async function FavoritesPage() {
  const currUser = await getCurrUser();
  const listings = await getFavoriteListings();

  if (!listings.length) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient listings={listings} currUser={currUser} />;
}

export default FavoritesPage;
