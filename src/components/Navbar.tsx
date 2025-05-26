'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">HR Dashboard</h1>
      <div className="flex items-center space-x-6">
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/bookmarks">Bookmarks</Link>
          <Link href="/analytics">Analytics</Link>
        </div>
        <ThemeToggle />
        {user && (
          <div className="flex items-center space-x-4">
            <span>{user.email}</span>
            <button
              onClick={logout}
              className="btn-secondary"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
