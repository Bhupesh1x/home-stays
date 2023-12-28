import { NextResponse } from "next/server";

import db from "@/app/lib/db";
import getCurrUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currUser = await getCurrUser();
    const body = await req.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    if (!currUser) {
      return new NextResponse(`User Unauthorized`, { status: 401 });
    }

    const listing = await db.listing.create({
      data: {
        title,
        description,
        category,
        guestCount,
        bathroomCount,
        roomCount,
        imageSrc,
        locationValue: location.value,
        price: parseInt(price),
        userId: currUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
