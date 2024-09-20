"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogDescription,
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

const formSchema = z.object({
 name: z.string().min(1, {
  message: "Server name is required"
 }),
 imageUrl: z.string().min(1, {
  message: "Server image is required"
 })
});

export const InitialModal = () => {
 const [isMounted, setIsMounted] = useState(false);

 const router = useRouter();

 useEffect(() => {
  setIsMounted(true);
 }, []);

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   imageUrl: ""
  }
 });

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
   await axios.post("/api/servers", values);

   form.reset();
   router.refresh;
   window.location.reload();
  } catch (error) {
   console.log(error);
  }
 };

 if (!isMounted) {
  return null;
 }

 return (
  <Dialog open>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Customize your server</DialogTitle>
     <DialogDescription>
      Give your server a personality with a name and an image. You can always
      change it later.
     </DialogDescription>
    </DialogHeader>
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="px-6 space-y-8">
       <div className="flex items-center justify-center text-center">
        <FormField
         control={form.control}
         name="imageUrl"
         render={({ field }) => (
          <FormItem>
           <FormControl>
            <FileUpload
             endpoint="serverImage"
             value={field.value}
             onChange={field.onChange}
            />
           </FormControl>
          </FormItem>
         )}
        />
       </div>
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Server Name</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter server name"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <DialogFooter>
       <Button
        variant="primary"
        disabled={isLoading}
       >
        Create server
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
