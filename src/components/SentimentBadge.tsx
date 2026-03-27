import { cn } from "@/lib/utils";
import type { Sentiment } from "@/lib/reddit";

const config: Record<Sentiment, { label: string; className: string }> = {
  positive: { label: "Positive", className: "bg-positive/15 text-positive" },
  negative: { label: "Negative", className: "bg-negative/15 text-negative" },
  neutral: { label: "Neutral", className: "bg-neutral/15 text-neutral" },
};

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const c = config[sentiment];
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide", c.className)}>
      {c.label}
    </span>
  );
}
