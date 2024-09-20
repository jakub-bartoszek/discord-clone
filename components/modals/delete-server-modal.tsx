"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export const DeleteServerModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const router = useRouter();

 const isModalOpen = isOpen && type === "deleteServer";
 const { server } = data;

 const [isLoading, setIsLoading] = useState(false);

 const onClick = async () => {
  try {
   setIsLoading(true);

   await axios.delete(`/api/servers/${server?.id}`);

   onClose();
   router.refresh();
   router.push("/");
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
     <DialogTitle>Delete server</DialogTitle>
     <DialogDescription className="whitespace-nowrap">
      Are you sure you want to do this?
      <br />
      <span className="font-semibold text-indigo-500">{server?.name}</span> will
      be permamently deleted.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <div className="flex items-center justify-between w-full">
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
