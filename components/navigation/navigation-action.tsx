"use client";

import { useModal } from "@/hooks/use-modal-store";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export const NavigationAction = () => {
 const { onOpen } = useModal();

 return (
  <div>
   <ActionTooltip
    side="right"
    align="center"
    label="Add a server"
   >
    <button
     onClick={() => onOpen("createServer")}
     className="group flex items-center"
    >
     <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-[#250f4a] group-hover:bg-[#eb07ff]">
      <Plus
       className="group-hover:text-white transition text-[#eb07ff]"
       size={25}
      />
     </div>
    </button>
   </ActionTooltip>
  </div>
 );
};
