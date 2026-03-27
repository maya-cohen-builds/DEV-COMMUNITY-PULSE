import { useState, useCallback } from "react";
import { getBookmarks, removeBookmark, updateBookmarkNote, type Bookmark } from "@/lib/bookmarks";
import { ExternalLink, Trash2, MessageSquare, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = useCallback(() => setBookmarks(getBookmarks()), []);

  const handleRemove = (postId: string) => {
    removeBookmark(postId);
    refresh();
  };

  const handleNoteChange = (postId: string, note: string) => {
    updateBookmarkNote(postId, note);
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground font-mono mb-1">Bookmarks</h1>
        <p className="text-xs text-muted-foreground">
          {bookmarks.length} saved posts
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No bookmarks yet. Save posts from the feed to track them here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((b) => (
            <div key={b.postId} className="rounded-lg border border-border bg-card p-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[11px] text-primary">r/{b.subreddit}</span>
                  <a
                    href={`https://reddit.com${b.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-foreground hover:text-primary transition-colors mt-0.5 line-clamp-2"
                  >
                    {b.title}
                  </a>
                  <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-xs">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" /> {b.score}
                    </span>
                    <span>Saved {new Date(b.savedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={`https://reddit.com${b.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleRemove(b.postId)}
                    className="p-1.5 text-muted-foreground hover:text-negative"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Notes */}
              <div className="mt-3">
                {editingId === b.postId ? (
                  <textarea
                    autoFocus
                    defaultValue={b.note}
                    onBlur={(e) => {
                      handleNoteChange(b.postId, e.target.value);
                      setEditingId(null);
                      refresh();
                    }}
                    placeholder="Add a note..."
                    className="w-full bg-muted text-foreground text-xs p-2 rounded border border-border focus:border-primary focus:outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <button
                    onClick={() => setEditingId(b.postId)}
                    className={cn(
                      "text-xs w-full text-left p-2 rounded hover:bg-muted transition-colors",
                      b.note ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {b.note || "Click to add notes..."}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
