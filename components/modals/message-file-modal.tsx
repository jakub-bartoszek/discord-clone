"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
 Dialog,
 DialogHeader,
 DialogContent,
 DialogTitle,
 DialogDescription,
 DialogFooter
} from "@/components/ui/dialog";

const formSchema = z.object({
 fileUrl: z.string().min(1, {
  message: "Attachment is required"
 })
});

export const MessageFileModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const { apiUrl, query } = data;
 const router = useRouter();

 const isModalOpen = isOpen && type === "messageFile";

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   fileUrl: ""
  }
 });

 const handleClose = () => {
  form.reset();
  onClose();
 };

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
   const url = qs.stringifyUrl({
    url: apiUrl || "",
    query
   });

   await axios.post(url, {
    ...values,
    content: values.fileUrl
   });

   form.reset();
   router.refresh;
   handleClose();
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <Dialog
   open={isModalOpen}
   onOpenChange={handleClose}
  >
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Add an attachment</DialogTitle>
     <DialogDescription>Send file as a message</DialogDescription>
    </DialogHeader>
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="px-6">
       <div className="flex items-center justify-center text-center">
        <FormField
         control={form.control}
         name="fileUrl"
         render={({ field }) => (
          <FormItem>
           <FormControl>
            <FileUpload
             endpoint="messageFile"
             value={field.value}
             onChange={field.onChange}
            />
           </FormControl>
          </FormItem>
         )}
        />
       </div>
      </div>
      <DialogFooter>
       <Button
        variant="primary"
        disabled={isLoading}
       >
        Send
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
