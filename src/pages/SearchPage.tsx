import { useState, useMemo } from "react";
import { useRedditFeed } from "@/hooks/useRedditFeed";
import { PostCard } from "@/components/PostCard";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data: posts, isLoading } = useRedditFeed("hot");

  const results = useMemo(() => {
    if (!posts || !query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subreddit.toLowerCase().includes(q) ||
        p.selftext.toLowerCase().includes(q) ||
        (p.link_flair_text && p.link_flair_text.toLowerCase().includes(q))
    );
  }, [posts, query]);

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground font-mono mb-1">Search</h1>
        <p className="text-xs text-muted-foreground">
          Search across all monitored subreddits
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by keyword..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {query.trim() && !isLoading && (
        <p className="text-xs text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      <div className="space-y-2">
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
