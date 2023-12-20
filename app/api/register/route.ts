import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse(`Missing required fields`, { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
