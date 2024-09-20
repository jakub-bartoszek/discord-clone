import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/server/server-sidebar";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
 return (
  <Sheet>
   <SheetTrigger asChild>
    <Button
     variant="ghost"
     className="p-0 mr-2 md:hidden"
    >
     <Menu />
    </Button>
   </SheetTrigger>
   <SheetContent
    side="left"
    className="p-0 flex gap-0 bg-[#2a0a51]/50 backdrop-blur-lg border-none"
   >
    <div className="w-[72px]">
     <NavigationSidebar />
    </div>
    <ServerSidebar serverId={serverId} />
   </SheetContent>
  </Sheet>
 );
};
