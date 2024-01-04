import { NextResponse } from "next/server";

import db from "@/app/lib/db";
import getCurrUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currUser = await getCurrUser();
    if (!currUser) {
      return new NextResponse(`User unauthorized`, { status: 401 });
    }

    const body = await req.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return new NextResponse(`Missing required fields`, { status: 400 });
    }

    const reservation = await db.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
