import qs from "query-string";
import { useQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";

interface ParticipantsQueryProps {
  queryKey: string;
  apiUrl: string;
  channelId: string;
}

export const useParticipantsQuery = ({
  queryKey,
  apiUrl,
  channelId
}: ParticipantsQueryProps) => {
  const { isConnected } = useSocket();

  const fetchParticipants = async () => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          channelId: channelId
        }
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const { data, status } = useQuery(
    //@ts-ignore
    {
      queryKey: [queryKey],
      queryFn: fetchParticipants,
      refetchInterval: isConnected ? false : 1000
    }
  );

  return { data, status };
};
