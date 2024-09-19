import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="h-full flex md:p-2 gap-2">
   <div className="hidden md:flex h-full w-[72px] z-30 flex-col">
    <NavigationSidebar />
   </div>
   <main className="h-full w-full">{children}</main>
  </div>
 );
};

export default MainLayout;
