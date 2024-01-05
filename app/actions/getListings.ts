import db from "../lib/db";

export type IListingParams = {
  userId?: string;
};

export async function getListings(params: IListingParams) {
  const { userId } = params;

  try {
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await db.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
