import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";

import { Hash, Mic, ShieldAlert, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
 serverId: string;
}

const iconMap = {
 [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
 [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />
};

const roleIconMap = {
 [MemberRole.GUEST]: null,
 [MemberRole.MODERATOR]: (
  <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
 ),
 [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
 const profile = await currentProfile();

 if (!profile) {
  return redirect("/");
 }

 const server = await db.server.findUnique({
  where: {
   id: serverId
  },
  include: {
   channels: {
    orderBy: {
     createdAt: "asc"
    }
   },
   members: {
    include: {
     profile: true
    },
    orderBy: {
     role: "asc"
    }
   }
  }
 });

 const textChannels = server?.channels.filter(
  (channel) => channel.type === ChannelType.TEXT
 );
 const audioChannels = server?.channels.filter(
  (channel) => channel.type === ChannelType.AUDIO
 );
 const members = server?.members.filter(
  (member) => member.profileId !== profile.id
 );

 if (!server) {
  redirect("/");
 }

 const role = server.members.find(
  (member) => member.profileId === profile.id
 )?.role;
 const allMembers = server?.members;

 return (
  <div className="flex flex-col h-full rounded-md w-full bg-black/30">
   <ServerHeader
    server={server}
    role={role}
   />
   <ScrollArea className="flex-1 px-3">
    <div className="mt-2">
     <ServerSearch
      data={[
       {
        label: "Text channels",
        type: "channel",
        data: textChannels?.map((channel) => ({
         id: channel.id,
         name: channel.name,
         icon: iconMap[channel.type]
        }))
       },
       {
        label: "Voice channels",
        type: "channel",
        data: audioChannels?.map((channel) => ({
         id: channel.id,
         name: channel.name,
         icon: iconMap[channel.type]
        }))
       },
       {
        label: "Members",
        type: "member",
        data: members?.map((member) => ({
         id: member.id,
         name: member.profile.name,
         icon: roleIconMap[member.role]
        }))
       }
      ]}
     />
    </div>
    <Separator className="bg-white/20 rounded-md my-2" />
    {!!textChannels?.length && (
     <div className="mb-2">
      <ServerSection
       sectionType="channels"
       channelType={ChannelType.TEXT}
       role={role}
       label="Text channels"
      />
      {textChannels.map((channel) => (
       <ServerChannel
        key={channel.id}
        channel={channel}
        role={role}
        server={server}
       />
      ))}
     </div>
    )}
    {!!audioChannels?.length && (
     <div className="mb-2">
      <ServerSection
       sectionType="channels"
       channelType={ChannelType.AUDIO}
       role={role}
       label="Voice channels"
      />
      {audioChannels.map((channel) => (
       <ServerChannel
        key={channel.id}
        channel={channel}
        role={role}
        server={server}
        members={allMembers}
       />
      ))}
     </div>
    )}
    {!!members?.length && (
     <div className="mb-2">
      <ServerSection
       sectionType="members"
       role={role}
       label="Members"
       server={server}
      />
      {members.map((member) => (
       <ServerMember
        key={member.id}
        member={member}
        server={server}
       />
      ))}
     </div>
    )}
   </ScrollArea>
  </div>
 );
};
