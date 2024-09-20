"use client";

import { useState } from "react";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";

import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogFooter,
 DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteMessageModal = () => {
 const { isOpen, onClose, type, data } = useModal();

 const isModalOpen = isOpen && type === "deleteMessage";
 const { apiUrl, query } = data;

 const [isLoading, setIsLoading] = useState(false);

 const onClick = async () => {
  try {
   setIsLoading(true);
   const url = qs.stringifyUrl({
    url: apiUrl || "",
    query
   });

   await axios.delete(url);

   onClose();
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
     <DialogTitle>Delete message</DialogTitle>
     <DialogDescription className="whitespace-nowrap">
      Are you sure you want to do this?
      <br />
      The message will be permamently deleted.
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
