// Local storage bookmarks (no auth required)
export interface Bookmark {
  postId: string;
  title: string;
  subreddit: string;
  permalink: string;
  score: number;
  note: string;
  savedAt: number;
}

const STORAGE_KEY = "community-pulse-bookmarks";

export function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBookmark(bookmark: Bookmark): void {
  const bookmarks = getBookmarks();
  if (!bookmarks.find((b) => b.postId === bookmark.postId)) {
    bookmarks.unshift(bookmark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }
}

export function removeBookmark(postId: string): void {
  const bookmarks = getBookmarks().filter((b) => b.postId !== postId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function updateBookmarkNote(postId: string, note: string): void {
  const bookmarks = getBookmarks().map((b) =>
    b.postId === postId ? { ...b, note } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(postId: string): boolean {
  return getBookmarks().some((b) => b.postId === postId);
}
