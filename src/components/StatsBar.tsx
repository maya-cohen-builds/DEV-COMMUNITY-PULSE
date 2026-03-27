import { type RedditPost, analyzeSentiment } from "@/lib/reddit";
import { Activity, ArrowUp, MessageSquare, TrendingUp } from "lucide-react";

interface StatsBarProps {
  posts: RedditPost[];
}

export function StatsBar({ posts }: StatsBarProps) {
  const totalPosts = posts.length;
  const totalUpvotes = posts.reduce((s, p) => s + p.score, 0);
  const totalComments = posts.reduce((s, p) => s + p.num_comments, 0);
  const sentiments = posts.map((p) => analyzeSentiment(p.title, p.link_flair_text));
  const positiveRatio = sentiments.filter((s) => s === "positive").length;

  const stats = [
    { icon: Activity, label: "Posts", value: totalPosts },
    { icon: ArrowUp, label: "Upvotes", value: totalUpvotes.toLocaleString() },
    { icon: MessageSquare, label: "Comments", value: totalComments.toLocaleString() },
    { icon: TrendingUp, label: "Positive", value: `${Math.round((positiveRatio / Math.max(totalPosts, 1)) * 100)}%` },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <s.icon className="h-3.5 w-3.5" />
            <span className="text-[11px] font-mono uppercase tracking-wide">{s.label}</span>
          </div>
          <p className="text-lg font-semibold text-foreground font-mono">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
