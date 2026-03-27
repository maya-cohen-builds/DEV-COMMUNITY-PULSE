import { ArrowUp, MessageSquare, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { type RedditPost, analyzeSentiment, timeAgo, type Sentiment } from "@/lib/reddit";
import { isBookmarked, addBookmark, removeBookmark } from "@/lib/bookmarks";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sentimentConfig: Record<Sentiment, { label: string; className: string }> = {
  positive: { label: "Positive", className: "bg-positive/15 text-positive" },
  negative: { label: "Negative", className: "bg-negative/15 text-negative" },
  neutral: { label: "Neutral", className: "bg-neutral/15 text-neutral" },
};

interface PostCardProps {
  post: RedditPost;
  onBookmarkChange?: () => void;
}

export function PostCard({ post, onBookmarkChange }: PostCardProps) {
  const [saved, setSaved] = useState(() => isBookmarked(post.id));
  const sentiment = analyzeSentiment(post.title, post.link_flair_text);
  const config = sentimentConfig[sentiment];

  const toggleBookmark = () => {
    if (saved) {
      removeBookmark(post.id);
    } else {
      addBookmark({
        postId: post.id,
        title: post.title,
        subreddit: post.subreddit,
        permalink: post.permalink,
        score: post.score,
        note: "",
        savedAt: Date.now(),
      });
    }
    setSaved(!saved);
    onBookmarkChange?.();
  };

  return (
    <div className="group rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[11px] font-medium text-primary">
              r/{post.subreddit}
            </span>
            <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", config.className)}>
              {config.label}
            </span>
            {post.link_flair_text && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground">
                {post.link_flair_text}
              </span>
            )}
          </div>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
          >
            {post.title}
          </a>
          <div className="flex items-center gap-3 mt-2 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <ArrowUp className="h-3 w-3" />
              {post.score.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              {post.num_comments}
            </span>
            <span className="text-xs">{timeAgo(post.created_utc)}</span>
            <span className="text-xs">u/{post.author}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleBookmark}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              saved
                ? "text-warning"
                : "text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"
            )}
            title={saved ? "Remove bookmark" : "Save post"}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
