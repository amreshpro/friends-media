import { NextResponse } from "next/server";

import { logger } from "@/backend/logger";
import dbConnect from "@/backend/lib/dbConnect";
import User from "@/backend/model/User";

export async function POST(req: Request) {
  await dbConnect();
  const { followerId, followedId } = await req.json();

  if (!followerId || !followedId) {
    return NextResponse.json({ error: "followerId and followedId are required." }, { status: 400 });
  }

  try {
    await User.findByIdAndUpdate(followerId, { $addToSet: { following: followedId } });
    await User.findByIdAndUpdate(followedId, { $addToSet: { followers: followerId } });

    return NextResponse.json({ message: "User followed successfully!" }, { status: 200 });
  } catch (error:unknown) {
    logger.error(error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
