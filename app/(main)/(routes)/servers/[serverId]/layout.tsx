import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";

import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
 children,
 params
}: {
 children: React.ReactNode;
 params: { serverId: string };
}) => {
 const profile = await currentProfile();

 if (!profile) {
  return auth().redirectToSignIn();
 }

 const server = await db.server.findUnique({
  where: {
   id: params.serverId,
   members: {
    some: {
     profileId: profile.id
    }
   }
  }
 });

 if (!server) {
  return redirect("/");
 }

 return (
  <div className="h-full w-full flex gap-2">
   <div className="hidden md:flex h-full w-60 z-20 flex-col">
    <ServerSidebar serverId={params.serverId} />
   </div>
   <main className="h-full rounded-md w-full overflow-hidden">{children}</main>
  </div>
 );
};

export default ServerIdLayout;
