"use client";

import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
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

export const ServerMember = ({ member }: ServerMemberProps) => {
 const params = useParams();
 const router = useRouter();

 const icon = roleIconMap[member.role];

 const onClick = () => {
  router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
 };

 return (
  <button
   onClick={onClick}
   className={cn(
    "group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 transition hover:bg-white/5",
    params?.memberId === member.id && "bg-white/10 hover:bg-white/15"
   )}
  >
   <UserAvatar
    src={member.profile.imageUrl}
    className="h-8 w-8 md:h-8 md:w-8"
   />
   <p
    className={cn(
     "text-sm font-semibold text-white/50 transition group-hover:text-white",
     params?.memberId === member.id && "text-white"
    )}
   >
    {member.profile.name}
   </p>
   {icon}
  </button>
 );
};
