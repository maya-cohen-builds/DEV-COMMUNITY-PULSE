import { useState, useMemo } from "react";
import { useRedditFeed } from "@/hooks/useRedditFeed";
import { PostCard } from "@/components/PostCard";
import { FeedFilters } from "@/components/FeedFilters";
import { StatsBar } from "@/components/StatsBar";
import { TrendingPanel } from "@/components/TrendingPanel";
import { type SortMode } from "@/lib/reddit";
import { Loader2 } from "lucide-react";

export default function FeedPage() {
  const [sort, setSort] = useState<SortMode>("hot");
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const { data: posts, isLoading, error } = useRedditFeed(sort);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let result = posts;
    if (selectedSubs.length > 0) {
      result = result.filter((p) => selectedSubs.includes(p.subreddit));
    }
    return result.sort((a, b) => {
      if (sort === "new") return b.created_utc - a.created_utc;
      return b.score - a.score;
    });
  }, [posts, selectedSubs, sort]);

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 min-w-0 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground font-mono mb-1">Feed</h1>
          <p className="text-xs text-muted-foreground">
            Monitoring 6 AI/ML subreddits in real-time
          </p>
        </div>

        {posts && <StatsBar posts={filteredPosts} />}

        <FeedFilters
          sort={sort}
          onSortChange={setSort}
          selectedSubs={selectedSubs}
          onSubsChange={setSelectedSubs}
        />

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-negative/30 bg-negative/10 p-4 text-sm text-negative">
            Failed to load posts. Reddit may be rate-limiting requests.
          </div>
        )}

        <div className="space-y-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Trending sidebar */}
      <div className="w-64 shrink-0 hidden lg:block">
        <div className="sticky top-4 rounded-lg border border-border bg-card p-4">
          {posts && posts.length > 0 ? (
            <TrendingPanel posts={posts} compact />
          ) : (
            <p className="text-xs text-muted-foreground">Loading trends...</p>
          )}
        </div>
      </div>
    </div>
  );
}
