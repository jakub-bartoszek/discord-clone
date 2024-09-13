"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogFooter
} from "@/components/ui/dialog";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage
} from "@/components/ui/form";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
 name: z
  .string()
  .min(1, {
   message: "Channel name is required"
  })
  .refine((name) => name !== "general", {
   message: `Channel name cannot be "general"`
  }),
 type: z.nativeEnum(ChannelType)
});

export const CreateChannelModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const router = useRouter();
 const params = useParams();

 const isModalOpen = isOpen && type === "createChannel";
 const { channelType } = data;

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   type: channelType || ChannelType.TEXT
  }
 });

 useEffect(() => {
  if (channelType) {
   form.setValue("type", channelType);
  } else {
   form.setValue("type", ChannelType.TEXT);
  }
 }, [channelType, form]);

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
   const url = qs.stringifyUrl({
    url: "/api/channels",
    query: {
     serverId: params?.serverId
    }
   });
   await axios.post(url, values);

   form.reset();
   onClose();
   router.refresh;
  } catch (error) {
   console.log(error);
  }
 };

 const handleClose = () => {
  form.reset();
  onClose();
 };

 return (
  <Dialog
   open={isModalOpen}
   onOpenChange={handleClose}
  >
   <DialogContent>
    <DialogHeader className="pt-8 px-6">
     <DialogTitle className="text-2xl text-center font-bold">
      Customize channel
     </DialogTitle>
    </DialogHeader>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
     >
      <div className="space-y-8 px-6">
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="font-bold">
           Channel name
          </FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            className="bg-black/50 border-0 focus-visible:ring-0focus-visible: ring-offset-0"
            placeholder="Enter channel name"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Channel type</FormLabel>
          <Select
           disabled={isLoading}
           onValueChange={field.onChange}
           defaultValue={field.value}
          >
           <FormControl>
            <SelectTrigger className="bg-black/50 border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none">
             <SelectValue placeholder="Select a channel type" />
             <SelectContent
             className="bg-black/50 backdrop-blur-lg border-none">
              {Object.values(ChannelType).map((type) => (
               <SelectItem
               className="hover:bg-white/10 rounded-md cursor-pointer"
                key={type}
                value={type}
               >
                {type.toLowerCase()}
               </SelectItem>
              ))}
             </SelectContent>
            </SelectTrigger>
           </FormControl>
          </Select>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <DialogFooter className="px-6 py-4">
       <Button
        disabled={isLoading}
        variant={"primary"}
       >
        Create channel
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
