"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { cn } from "@/lib/utils";

export const SocketIndicator = () => {
 const { isConnected } = useSocket();

 return (
  <div
   className={cn(
    "text-white border-none inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    isConnected ? "bg-emerald-600" : "bg-yellow-600"
   )}
  >
   {isConnected ? "Live: Real-time updates" : "Fallback: Polling every 1s"}
  </div>
 );
};
