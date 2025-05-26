'use client';
import { useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import Badge from './Badge';

export default function Card({
  user,
  isBookmarked,
  removeBookmark,
}: {
  user: any;
  isBookmarked?: boolean;
  removeBookmark?: (id: number) => void;
}) {
  const { addBookmark, bookmarks } = useBookmarks();

  // If isBookmarked is not passed, fallback to checking bookmarks
  const bookmarked = isBookmarked ?? bookmarks.some((u) => u.id === user.id);

  const [promoted, setPromoted] = useState(false);

  const handlePromote = () => {
    setPromoted(true);
    setTimeout(() => setPromoted(false), 3000);
  };

  return (
    <div className="p-4 rounded-xl border shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">{user.department}</p>
          <Badge rating={user.rating} />
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <a href={`/employee/${user.id}`}>
          <button className="btn-primary">View</button>
        </a>
        <button
          className="btn-secondary"
          onClick={() =>
            bookmarked ? removeBookmark?.(user.id) : addBookmark(user)
          }
        >
          {bookmarked ? 'Remove' : 'Bookmark'}
        </button>
        <button className="btn-success" onClick={handlePromote}>
          Promote
        </button>
        {promoted && (
          <span className="ml-4 text-green-600 font-semibold">
            Promoted successfully!
          </span>
        )}
      </div>
    </div>
  );
}
