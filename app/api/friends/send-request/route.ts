import dbConnect from "@/backend/lib/dbConnect";
import { logger } from "@/backend/logger";
import FriendRequest from "@/backend/model/FriendRequest";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await dbConnect();
  const { senderId, receiverId } = await req.json();

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "senderId and receiverId are required." }, { status: 400 });
  }

  try {
    const existingRequest = await FriendRequest.findOne({ senderId, receiverId });

    if (existingRequest) {
      return NextResponse.json({ error: "Friend request already sent." }, { status: 400 });
    }

    const friendRequest = new FriendRequest({ senderId, receiverId });
    await friendRequest.save();

    return NextResponse.json({ message: "Friend request sent successfully!" }, { status: 200 });
  } catch (error : unknown) {
    logger.error(error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
