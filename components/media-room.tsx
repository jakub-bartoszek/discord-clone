"use client";

import { useState, useEffect } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { Profile } from "@prisma/client";

interface MediaRoomProps {
 chatId: string;
 video: boolean;
 audio: boolean;
 profile: Profile;
}

export const MediaRoom = ({
 chatId,
 video,
 audio,
 profile
}: MediaRoomProps) => {
 const [token, setToken] = useState("");

 useEffect(() => {
  (async () => {
   try {
    const res = await fetch(
     `/api/livekit?room=${chatId}&username=${profile.name}&userId=${profile.id}`
    );
    const data = await res.json();

    setToken(data.token);
   } catch (error) {
    console.log(error);
   }
  })();
 }, [profile.name, profile.id, chatId]);

 if (token === "") {
  return (
   <div className="flex flex-col flex-1 justify-center items-center">
    <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
    <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
   </div>
  );
 }

 return (
  <LiveKitRoom
   data-lk-theme="default"
   serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
   token={token}
   connect={true}
   video={video}
   audio={audio}
  >
   <VideoConference />
  </LiveKitRoom>
 );
};
