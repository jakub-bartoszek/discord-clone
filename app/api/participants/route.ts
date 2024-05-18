import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const PARTICIPANTS_BATCH = 10;

export async function GET(req: Request) {
 try {
  const profile = await currentProfile();
  const { searchParams } = new URL(req.url);

  const cursor = searchParams.get("cursor");
  const channelId = searchParams.get("channelId");

  if (!profile) return new NextResponse("Unauthorized", { status: 401 });

  if (!channelId)
   return new NextResponse("Channel ID missing", { status: 400 });

  let participants = [];

  if (cursor) {
   participants = await db.member.findMany({
    take: PARTICIPANTS_BATCH,
    skip: 1,
    cursor: {
     id: cursor
    },
    where: {
     currentChannelId: channelId
    },
    include: {
     profile: true
    },
    orderBy: { createdAt: "desc" }
   });
  } else {
   participants = await db.member.findMany({
    take: PARTICIPANTS_BATCH,
    where: { currentChannelId: channelId },
    include: {
     profile: true
    },
    orderBy: { createdAt: "desc" }
   });
  }

  let nextCursor = null;

  if (participants.length === PARTICIPANTS_BATCH) {
   nextCursor = participants[PARTICIPANTS_BATCH - 1].id;
  }

  return NextResponse.json({ items: participants, nextCursor });
 } catch (error) {
  console.error("[PARTICIPANTS_GET]", error);
  return new NextResponse("Internal error", { status: 500 });
 }
}
