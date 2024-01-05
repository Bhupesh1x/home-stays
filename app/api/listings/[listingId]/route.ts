import db from "@/app/lib/db";
import { NextResponse } from "next/server";

import getCurrUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currUser = await getCurrUser();

    const { listingId } = params;

    if (!currUser) {
      return new NextResponse("User Unauthorized", { status: 500 });
    }

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid Id", { status: 500 });
    }

    const listing = await db.listing.deleteMany({
      where: {
        id: listingId,
        userId: currUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
