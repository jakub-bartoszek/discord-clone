"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Member, MemberRole, Profile } from "@prisma/client";

import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface ChatItemProps {
 id: string;
 content: string;
 member: Member & {
  profile: Profile;
 };
 timestamp: string;
 fileUrl: string | null;
 deleted: boolean;
 currentMember: Member;
 isUpdated: boolean;
 socketUrl: string;
 socketQuery: Record<string, string>;
}

const roleIconMap = {
 GUEST: null,
 MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
 ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

const formSchema = z.object({
 content: z.string().min(1)
});

export const ChatItem = ({
 id,
 content,
 member,
 timestamp,
 fileUrl,
 deleted,
 currentMember,
 isUpdated,
 socketUrl,
 socketQuery
}: ChatItemProps) => {
 const [isEditing, setIsEditing] = useState(false);
 const { onOpen } = useModal();
 const params = useParams();
 const router = useRouter();

 const onMemberClick = () => {
  if (member.id === currentMember.id) {
   return;
  }

  router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
 };

 useEffect(() => {
  const handleKeyDown = (event: any) => {
   if (event.key === "Escape" || event.keyCode === 27) {
    setIsEditing(false);
   }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
 }, []);

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   content: content
  }
 });

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
   const url = qs.stringifyUrl({
    url: `${socketUrl}/${id}`,
    query: socketQuery
   });

   await axios.patch(url, values);

   form.reset();
   setIsEditing(false);
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  form.reset({
   content: content
  });
 }, [content, form]);

 const fileType = fileUrl?.split(".").pop();

 const isAdmin = currentMember.role === MemberRole.ADMIN;
 const isModerator = currentMember.role === MemberRole.MODERATOR;
 const isOwner = currentMember.id === member.id;
 const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
 const canEditMessage = !deleted && isOwner && !fileUrl;
 const isPDF = fileType === "pdf" && fileUrl;
 const isImage = !isPDF && fileUrl;

 return (
  <div className="relative group flex items-center hover:bg-white/5 rounded-md p-4 transition w-full">
   <div className="group flex gap-x-2 items-start w-full">
    <div
     onClick={onMemberClick}
     className="cursor-pointer hover:drop-shadow-md transition"
    >
     <UserAvatar src={member.profile.imageUrl} />
    </div>
    <div className="flex flex-col w-full">
     <div className="flex items-center gap-x-2">
      <div className="flex items-center">
       <p
        onClick={onMemberClick}
        className="font-semibold text-sm cursor-pointer"
       >
        {member.profile.name}
       </p>
       <ActionTooltip label={member.role}>
        {roleIconMap[member.role]}
       </ActionTooltip>
      </div>
      <span className="text-xs text-white/50">{timestamp}</span>
     </div>
     {isImage && (
      <a
       href={fileUrl}
       target="_blank"
       rel="noopener noreferer"
       className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center h-48 w-48"
      >
       <Image
        src={fileUrl}
        alt={content}
        fill
        className="object-cover"
       />
      </a>
     )}
     {isPDF && (
      <div className="relative flex items-center p-2 mt-2 rounded-md">
       <FileIcon className="h-10 w-10 fill-indigo-400" />
       <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferer"
        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
       >
        {fileUrl}
       </a>
      </div>
     )}
     {!fileUrl && !isEditing && (
      <p
       className={cn(
        "text-sm text-white/90",
        deleted && "italic text-white/50 text-xs mt-1"
       )}
      >
       {content}
       {isUpdated && !deleted && (
        <span className="text-[10px] mx-2 text-white/50">(edited)</span>
       )}
      </p>
     )}
     {!fileUrl && isEditing && (
      <Form {...form}>
       <form
        className="flex items-center w-full gap-x-2 pt-2"
        onSubmit={form.handleSubmit(onSubmit)}
       >
        <FormField
         control={form.control}
         name="content"
         render={({ field }) => (
          <FormItem className="flex-1">
           <FormControl>
            <div className="relative w-full">
             <Input
              disabled={isLoading}
              className="p-2 bg-black/30 placeholder:text-white/50 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Edited message"
              {...field}
             />
            </div>
           </FormControl>
          </FormItem>
         )}
        />
        <Button
         disabled={isLoading}
         variant="primary"
        >
         Save
        </Button>
       </form>
       <span className="text-[10px] mt-1 text-zinc-400">
        Press ESC to cancel, enter to save
       </span>
      </Form>
     )}
    </div>
   </div>
   {canDeleteMessage && (
    <div className="hidden group-hover:flex items-center gap-x-2 absolute p-2 -top-2 right-5 rounded-md bg-black/50 backdrop-blur-lg">
     {canEditMessage && (
      <ActionTooltip label="Edit">
       <Edit
        onClick={() => setIsEditing(true)}
        className="ml-auto h-4 w-4 cursor-pointer text-white/50 transition hover:text-white"
       />
      </ActionTooltip>
     )}
     <ActionTooltip label="Delete">
      <Trash
       onClick={() =>
        onOpen("deleteMessage", {
         apiUrl: `${socketUrl}/${id}`,
         query: socketQuery
        })
       }
       className="ml-auto h-4 w-4 cursor-pointer text-white/50 transition hover:text-white"
      />
     </ActionTooltip>
    </div>
   )}
  </div>
 );
};
