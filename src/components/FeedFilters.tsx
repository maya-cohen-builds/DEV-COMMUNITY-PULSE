import { SUBREDDITS, type SortMode } from "@/lib/reddit";
import { cn } from "@/lib/utils";

interface FeedFiltersProps {
  sort: SortMode;
  onSortChange: (s: SortMode) => void;
  selectedSubs: string[];
  onSubsChange: (subs: string[]) => void;
}

const sortOptions: { value: SortMode; label: string }[] = [
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
];

export function FeedFilters({ sort, onSortChange, selectedSubs, onSubsChange }: FeedFiltersProps) {
  const toggleSub = (sub: string) => {
    if (selectedSubs.includes(sub)) {
      onSubsChange(selectedSubs.filter((s) => s !== sub));
    } else {
      onSubsChange([...selectedSubs, sub]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        {sortOptions.map((o) => (
          <button
            key={o.value}
            onClick={() => onSortChange(o.value)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
              sort === o.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SUBREDDITS.map((sub) => (
          <button
            key={sub}
            onClick={() => toggleSub(sub)}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-mono transition-colors",
              selectedSubs.includes(sub)
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-secondary text-secondary-foreground border border-transparent hover:border-border"
            )}
          >
            r/{sub}
          </button>
        ))}
      </div>
    </div>
  );
}
