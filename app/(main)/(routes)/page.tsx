import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
 return (
  <main className="h-full">
   <SignedOut>
    <div className="flex h-full items-center justify-center ">
     <div className="bg-indigo-500 p-2 rounded-md font-bold text-white">
      <SignInButton />
     </div>
    </div>
   </SignedOut>
   <SignedIn>
    <UserButton />
   </SignedIn>
   <ModeToggle />
  </main>
 );
}
