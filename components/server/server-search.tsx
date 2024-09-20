"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Search } from "lucide-react";
import {
 CommandDialog,
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList
} from "@/components/ui/command";

interface ServerSearchProps {
 data: {
  label: string;
  type: "channel" | "member";
  data:
   | {
      icon: React.ReactNode;
      name: string;
      id: string;
     }[]
   | undefined;
 }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
 const [open, setOpen] = useState(false);
 const router = useRouter();
 const params = useParams();

 useEffect(() => {
  const down = (e: KeyboardEvent) => {
   if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    setOpen((open) => !open);
   }
  };

  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
 }, []);

 const onClick = ({ id, type }: { id: string; type: "channel" | "member" }) => {
  setOpen(false);

  if (type === "member") {
   return router.push(`/servers/${params?.serverId}/conversations/${id}`);
  }

  if (type === "channel") {
   return router.push(`/servers/${params?.serverId}/channels/${id}`);
  }
 };

 return (
  <>
   <button
    onClick={() => setOpen(true)}
    className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-white/5"
   >
    <Search className="h-4 w-4 text-white/50 transition group-hover:text-white" />
    <p className="text-sm font-semibold text-white/50 transition group-hover:text-white">
     Search
    </p>
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-black/30 px-1.5 font-mono text-[10px] font-medium ml-auto">
     <span className="text-s">CTRL</span>K
    </kbd>
   </button>
   <CommandDialog
    open={open}
    onOpenChange={setOpen}
   >
    <CommandInput
     className="mr-8"
     placeholder="Search all channels and members"
    />
    <CommandList>
     <CommandEmpty>No results found</CommandEmpty>
     {data.map(({ label, type, data }) => {
      if (!data?.length) return null;

      return (
       <CommandGroup
        className="pb-2"
        key={label}
        heading={label}
       >
        {data?.map(({ id, icon, name }) => {
         return (
          <CommandItem
           onSelect={() => onClick({ id, type })}
           key={id}
          >
           {icon}
           <span>{name}</span>
          </CommandItem>
         );
        })}
       </CommandGroup>
      );
     })}
    </CommandList>
   </CommandDialog>
  </>
 );
};
