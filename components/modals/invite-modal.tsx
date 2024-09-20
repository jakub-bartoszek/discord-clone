"use client";

import { useState } from "react";
import axios from "axios";
import { useOrigin } from "@/hooks/use-origin";
import { useModal } from "@/hooks/use-modal-store";

import { Check, Copy, RefreshCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle
} from "@/components/ui/dialog";

export const InviteModal = () => {
 const { onOpen, isOpen, onClose, type, data } = useModal();
 const origin = useOrigin();

 const isModalOpen = isOpen && type === "invite";
 const { server } = data;

 const [copied, setCopied] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

 const onCopy = () => {
  navigator.clipboard.writeText(inviteUrl);
  setCopied(true);

  setTimeout(() => {
   setCopied(false);
  }, 1000);
 };

 const onNew = async () => {
  try {
   setIsLoading(true);
   const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

   onOpen("invite", { server: response.data });
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
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Invite Friends!</DialogTitle>
    </DialogHeader>
    <div className="p-6">
     <Label>Server invite link</Label>
     <div className="flex items-center my-2 gap-x-2">
      <Input
       disabled={isLoading}
       value={inviteUrl}
      />
      <Button
       disabled={isLoading}
       onClick={onCopy}
      >
       {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
     </div>
     <Button
      className="mt-4"
      variant="primary"
      onClick={onNew}
     >
      Generate a new link
      <RefreshCw className="w-4 h-4 ml-2" />
     </Button>
    </div>
   </DialogContent>
  </Dialog>
 );
};
