"use client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ChannelParticipantProps {
 member: Member & { profile: Profile };
 server: Server;
}

const roleIconMap = {
 [MemberRole.GUEST]: null,
 [MemberRole.MODERATOR]: (
  <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
 ),
 [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

export const ChannelParticipant = ({ member }: ChannelParticipantProps) => {
 const params = useParams();
 const router = useRouter();

 const icon = roleIconMap[member.role];

 const onClick = () => {
  router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
 };

 return (
  <button
   onClick={onClick}
   className="pl-8 group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
  >
   <UserAvatar
    src={member.profile.imageUrl}
    className="h-6 w-6 md:h-6 md:w-6"
   />
   <p
    className={cn(
     "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
     params?.memberId === member.id &&
      "text-primary dark:text-zinc-200 dark:group-hover:text-white"
    )}
   >
    {member.profile.name}
   </p>
   {icon}
  </button>
 );
};
