import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

interface MetromPointsResponse {
  points: number;
}

export function useMetromPoints(account?: Address) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["MetromPoints", account],
    queryFn: async ({ queryKey }) => {
      const account = queryKey[1];
      if (!account) return null;

      try {
        const response = await fetch(
          new URL(
            `https://lv2d.api.dev.metrom.xyz/v1/points/${account.toLowerCase()}`
          )
        );

        if (!response.ok)
          throw new Error(
            `Error fetching Metrom points for account ${account}: ${await response.text()}`
          );

        const { points } = (await response.json()) as MetromPointsResponse;
        return points;
      } catch (error) {
        console.error(
          `Error fetching Metrom points for account ${account}: ${error}`
        );
        throw error;
      }
    },
    enabled: !!account,
  });

  return { points: data, loading: isLoading, error: isError };
}
