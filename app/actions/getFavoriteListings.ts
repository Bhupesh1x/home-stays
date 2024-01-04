import db from "../lib/db";
import getCurrUser from "./getCurrentUser";

export async function getFavoriteListings() {
  try {
    const currUser = await getCurrUser();

    if (!currUser) {
      return [];
    }

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currUser.favouriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
      updatedAt: favorite.updatedAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
