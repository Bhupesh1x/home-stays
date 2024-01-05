import db from "../lib/db";

export type IListingParams = {
  userId?: string;
  roomCount?: number;
  guestCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
};

export async function getListings(params: IListingParams) {
  const {
    userId,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    category,
  } = params;

  try {
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: startDate },
                endDate: { gte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
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
