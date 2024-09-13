import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
 const profile = await currentProfile();

 if (!profile) {
  redirect("/");
 }

 const servers = await db.server.findMany({
  where: {
   members: {
    some: {
     profileId: profile.id
    }
   }
  }
 });

 return (
  <div className="flex h-full w-full flex-col items-center space-y-4 rounded-md bg-black/40 py-3">
   <NavigationAction />
   <Separator className="mx-auto h-[2px] w-10 rounded-md bg-[#eb07ff]" />
   <ScrollArea className="w-full flex-1">
    {servers.map((server) => (
     <div
      key={server.id}
      className="mb-4"
     >
      <NavigationItem
       id={server.id}
       name={server.name}
       imageUrl={server.imageUrl}
      />
     </div>
    ))}
   </ScrollArea>
   <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
    <UserButton
     afterSignOutUrl="/"
     appearance={{
      elements: {
       avatarBox: "h-[48px] w-[48px]"
      }
     }}
    />
   </div>
  </div>
 );
};
