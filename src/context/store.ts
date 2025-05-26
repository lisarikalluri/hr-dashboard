import { create } from 'zustand';

type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  rating: number;
};

type Store = {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (id: number) => void;
};

export const useBookmarkStore = create<Store>((set) => ({
  bookmarks: [],
  addBookmark: (user) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, user],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((u) => u.id !== id),
    })),
}));
