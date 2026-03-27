import { useRedditFeed } from "@/hooks/useRedditFeed";
import { TrendingPanel } from "@/components/TrendingPanel";
import { Loader2 } from "lucide-react";

export default function TrendingPage() {
  const { data: posts, isLoading } = useRedditFeed("hot");

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground font-mono mb-1">Trending Topics</h1>
        <p className="text-xs text-muted-foreground">
          Most frequently mentioned terms across all monitored subreddits
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : posts ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <TrendingPanel posts={posts} />
        </div>
      ) : null}
    </div>
  );
}
