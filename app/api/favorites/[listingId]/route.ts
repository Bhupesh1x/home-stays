import { NextResponse } from "next/server";

import db from "@/app/lib/db";
import getCurrUser from "@/app/actions/getCurrentUser";

type IParams = {
  listingId: string;
};

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { listingId } = params;
    const currUser = await getCurrUser();

    if (!currUser)
      return new NextResponse(`User Unauthorized`, { status: 401 });

    if (!listingId || typeof listingId !== "string")
      return new NextResponse(`Invalid Id`, { status: 400 });

    let favouriteIds = [...(currUser.favouriteIds || [])];

    favouriteIds.push(listingId);

    const user = await db.user.update({
      where: {
        id: currUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { listingId } = params;
    const currUser = await getCurrUser();

    if (!currUser)
      return new NextResponse(`User Unauthorized`, { status: 401 });

    if (!listingId || typeof listingId !== "string")
      return new NextResponse(`Invalid Id`, { status: 400 });

    let favouriteIds = [...(currUser.favouriteIds || [])];

    favouriteIds.filter((id) => id !== listingId);

    const user = await db.user.update({
      where: {
        id: currUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
