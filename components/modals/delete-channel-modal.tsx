"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogFooter,
 DialogDescription
} from "@/components/ui/dialog";

export const DeleteChannelModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const router = useRouter();

 const isModalOpen = isOpen && type === "deleteChannel";
 const { server, channel } = data;

 const [isLoading, setIsLoading] = useState(false);

 const onClick = async () => {
  try {
   setIsLoading(true);
   const url = qs.stringifyUrl({
    url: `/api/channels/${channel?.id}`,
    query: {
     serverId: server?.id
    }
   });

   await axios.delete(url);

   onClose();
   router.refresh();
   router.push(`/servers/${server?.id}`);
  } catch (error) {
   console.log(error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <Dialog
   open={isModalOpen}
   onOpenChange={onClose}
  >
   <DialogContent className="w-auto">
    <DialogHeader>
     <DialogTitle>Delete channel</DialogTitle>
     <DialogDescription className="whitespace-nowrap">
      Are you sure you want to do this?
      <br />
      <span className="whitespace-nowrap font-semibold text-indigo-500">
       #{channel?.name}{" "}
      </span>
      will be permamently deleted.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <div className="flex w-full items-center justify-between">
      <Button
       disabled={isLoading}
       onClick={onClose}
      >
       Cancel
      </Button>
      <Button
       disabled={isLoading}
       onClick={onClick}
       variant="destructive"
      >
       Delete
      </Button>
     </div>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
};
