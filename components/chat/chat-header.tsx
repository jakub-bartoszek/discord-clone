import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
 serverId: string;
 name: string;
 type: "channel" | "conversation";
 imageUrl?: string;
}

export const ChatHeader = ({
 serverId,
 name,
 type,
 imageUrl
}: ChatHeaderProps) => {
 return (
  <div className="text-md flex h-12 items-center bg-black/15 px-3 font-semibold">
   <MobileToggle serverId={serverId} />
   {type === "channel" && <Hash className="mr-2 h-5 w-5 text-white/50" />}
   {type === "conversation" && (
    <UserAvatar
     src={imageUrl}
     className="mr-2 h-5 w-5"
    />
   )}
   <p className="text-md font-semibold">{name}</p>
   <div className="ml-auto flex items-center">
    {type === "conversation" && <ChatVideoButton />}
    <SocketIndicator />
   </div>
  </div>
 );
};
