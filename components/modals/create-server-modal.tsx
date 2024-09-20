"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";
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

export const CreateServerModal = () => {
 const { isOpen, onClose, type } = useModal();
 const router = useRouter();

 const isModalOpen = isOpen && type === "createServer";

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
    <DialogHeader>
     <DialogTitle>Customize your server</DialogTitle>
     <DialogDescription>
      Give your server a personality with a name and an image. You can always
      change it later.
     </DialogDescription>
    </DialogHeader>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
     >
      <div className="space-y-8 px-6">
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
          <FormLabel>Server name</FormLabel>
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
