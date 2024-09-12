"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

interface ServerSectionProps {
 label: string;
 role?: MemberRole;
 sectionType: "channels" | "members";
 channelType?: ChannelType;
 server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
 label,
 role,
 sectionType,
 channelType,
 server
}: ServerSectionProps) => {
 const { onOpen } = useModal();

 return (
  <div className="flex items-center justify-between py-2">
   <p className="text-xs uppercase font-semibold text-white/50">{label}</p>
   {role !== MemberRole.GUEST && sectionType === "channels" && (
    <ActionTooltip
     label="Create channel"
     side="top"
    >
     <button
      onClick={() => onOpen("createChannel", { channelType })}
      className="text-white/50 hover:text-white transition"
     >
      <Plus className="w-4 h-4" />
     </button>
    </ActionTooltip>
   )}
   {role === MemberRole.ADMIN && sectionType === "members" && (
    <ActionTooltip
     label="Manage members"
     side="top"
    >
     <button
      onClick={() => onOpen("members", { server })}
      className="text-white/50 hover:text-white transition"
     >
      <Settings className="w-4 h-4" />
     </button>
    </ActionTooltip>
   )}
  </div>
 );
};
