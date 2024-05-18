import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponseServerIo
) {
 if (req.method !== "POST")
  return res.status(405).json({ error: "Method not allowed" });

 try {
  const profile = await currentProfilePages(req);
  const { serverId, channelId } = req.body;

  if (!profile) return res.status(401).json({ error: "Unauthorized" });

  if (!serverId) return res.status(400).json({ error: "Server ID missing" });

  if (!channelId) return res.status(400).json({ error: "Channel ID missing" });

  const server = await db.server.findFirst({
   where: {
    id: serverId,
    members: {
     some: {
      profileId: profile.id
     }
    }
   },
   include: {
    members: true
   }
  });

  if (!server) return res.status(404).json({ message: "Server not found" });

  const channel = await db.channel.findFirst({
   where: {
    id: channelId,
    serverId: serverId
   }
  });

  if (!channel) return res.status(404).json({ message: "Channel not found" });

  const member = server.members.find(
   (member) => member.profileId === profile.id
  );

  if (!member) return res.status(404).json({ message: "Member not found" });

  const updatedMember = await db.member.update({
   where: { id: member.id },
   data: { currentChannelId: channelId }
  });

  const channelKey = `channel:${channelId}:participants`;

  res?.socket?.server?.io?.emit(channelKey, {
   action: "add",
   member: updatedMember
  });

  return res.status(200).json(updatedMember);
 } catch (error) {
  console.error("[PARTICIPANTS_POST]", error);
  return res.status(500).json({ error: "Internal Server Error" });
 }
}
