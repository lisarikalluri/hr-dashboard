'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <section className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((user) => (
              <Card key={user.id} user={user} isBookmarked removeBookmark={removeBookmark} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
