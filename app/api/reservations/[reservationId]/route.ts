import db from "@/app/lib/db";
import { NextResponse } from "next/server";

import getCurrUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const currUser = await getCurrUser();
    const { reservationId } = params;

    if (!currUser) {
      return new NextResponse("User unauthorized", { status: 401 });
    }

    if (!reservationId || typeof reservationId !== "string") {
      return new NextResponse("Invalid Id", { status: 401 });
    }

    const reservation = await db.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: currUser.id }, { listing: { userId: currUser.id } }],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
