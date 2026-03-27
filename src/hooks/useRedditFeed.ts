import { useQuery } from "@tanstack/react-query";
import { fetchAllSubreddits, type SortMode, type RedditPost } from "@/lib/reddit";

export function useRedditFeed(sort: SortMode = "hot") {
  return useQuery<RedditPost[]>({
    queryKey: ["reddit-feed", sort],
    queryFn: () => fetchAllSubreddits(sort, 30),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
