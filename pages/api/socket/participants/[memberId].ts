import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponseServerIo
) {
 if (req.method !== "DELETE" && req.method !== "PATCH") {
  return res.status(405).json({ error: "Method not allowed" });
 }

 try {
  const profile = await currentProfilePages(req);
  const { memberId, serverId, channelId } = req.query;
  const { currentChannelId } = req.body;

  if (!profile) {
   return res.status(401).json({ error: "Unauthorized" });
  }

  if (!serverId) {
   return res.status(401).json({ error: "Server ID missing" });
  }

  if (!channelId) {
   return res.status(401).json({ error: "Channel ID missing" });
  }

  const server = await db.server.findFirst({
   where: {
    id: serverId as string,
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

  if (!server) {
   return res.status(404).json({ error: "Server not found" });
  }

  const channel = await db.channel.findFirst({
   where: {
    id: channelId as string,
    serverId: serverId as string
   }
  });

  if (!channel) {
   return res.status(404).json({ error: "Channel not found" });
  }

  const member = server.members.find((member) => member.id === memberId);

  if (!member) {
   return res.status(404).json({ error: "Member not found" });
  }

  let updatedMember;
  if (req.method === "DELETE") {
   updatedMember = await db.member.update({
    where: {
     id: member.id
    },
    data: {
     currentChannelId: null
    }
   });
  }

  if (req.method === "PATCH") {
   updatedMember = await db.member.update({
    where: {
     id: member.id
    },
    data: {
     currentChannelId
    }
   });
  }

  const channelKey = `channel:${channelId}:participants`;

  res?.socket?.server?.io?.emit(channelKey, {
   action: req.method === "DELETE" ? "remove" : "update",
   member: updatedMember
  });

  return res.status(200).json(updatedMember);
 } catch (error) {
  console.log("[PARTICIPANT_ID]", error);
  return res.status(500).json({ error: "Internal error" });
 }
}
