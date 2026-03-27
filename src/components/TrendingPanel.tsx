import { extractTrendingTerms, type RedditPost } from "@/lib/reddit";
import { TrendingUp } from "lucide-react";

interface TrendingPanelProps {
  posts: RedditPost[];
  compact?: boolean;
}

export function TrendingPanel({ posts, compact }: TrendingPanelProps) {
  const terms = extractTrendingTerms(posts, compact ? 10 : 20);
  const maxCount = terms[0]?.count || 1;

  return (
    <div className="space-y-3">
      {!compact && (
        <div className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="font-mono text-sm font-semibold">Trending Topics</h2>
        </div>
      )}
      <div className="space-y-1">
        {terms.map((t, i) => (
          <div key={t.term} className="flex items-center gap-2 group">
            <span className="font-mono text-[10px] text-muted-foreground w-5 text-right">
              {i + 1}
            </span>
            <div className="flex-1 flex items-center gap-2">
              <div
                className="h-1.5 rounded-full bg-primary/40"
                style={{ width: `${(t.count / maxCount) * 100}%`, minWidth: 4 }}
              />
              <span className="font-mono text-xs text-foreground shrink-0">{t.term}</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
