import { NextResponse } from "next/server";
import { RoomServiceClient } from "livekit-server-sdk";

export async function GET(req: Request) {
 try {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const { searchParams } = new URL(req.url);

  if (!apiKey || !apiSecret || !wsUrl) {
   return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const channelId = searchParams.get("channelId");

  if (!channelId) {
   return new NextResponse("Channel ID missing", { status: 400 });
  }

  const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret);

  const participants = await roomService.listParticipants(channelId);

  return NextResponse.json(participants);
 } catch (error) {
  console.error("[PARTICIPANTS_ERROR]", error);
  return new NextResponse("Internal error", { status: 500 });
 }
}
