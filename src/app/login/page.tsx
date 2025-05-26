'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, pwd);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/image1.jpg')" }}
      ></div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-16 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-lg p-10 md:p-12 rounded-2xl shadow-xl w-full max-w-xl space-y-6"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
          {error && <p className="text-red-600 font-medium">{error}</p>}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
