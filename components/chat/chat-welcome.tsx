import { Hash } from "lucide-react";

interface ChatWelcomeProps {
 name: string;
 type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
 return (
  <div className="mb-4 space-y-2 px-4">
   {type === "channel" && (
    <div className="flex h-[75px] w-[75px] bg-black/30 text-white items-center justify-center rounded-full">
     <Hash className="h-12 w-12" />
    </div>
   )}
   <p className="text-xl font-bold md:text-3xl">
    {type === "channel" ? "Welcome to #" : ""}
    {name}
   </p>
   <p className="text-sm text-white/50">
    {type === "channel"
     ? `This is the start of #${name} channel.`
     : `This is the start of your conversation with ${name}`}
   </p>
  </div>
 );
};
