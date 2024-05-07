"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogFooter,
 DialogDescription
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

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
   <DialogContent className="bg-white text-black p-0 overflow-hidden">
    <DialogHeader className="pt-8 px-6">
     <DialogTitle className="text-2xl text-center font-bold">Delete server</DialogTitle>
     <DialogDescription>
      Are you sure you want to do this?
      <p>
       <span className="font-semibold text-indigo-500">{server?.name}</span> will be permamently
       deleted.
      </p>
     </DialogDescription>
    </DialogHeader>
    <DialogFooter className=" bg-gray-100 px-6 py-4">
     <div className="flex items-center justify-between w-full">
      <Button
       disabled={isLoading}
       onClick={onClose}
       variant="ghost"
      >
       Cancel
      </Button>
      <Button
       disabled={isLoading}
       onClick={onClick}
       variant="primary"
      >
       Confirm
      </Button>
     </div>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
};
