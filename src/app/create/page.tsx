'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function CreateUser() {
  const [form, setForm] = useState({ name: '', email: '', dept: '' });

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <section className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Employee</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            className="w-full border p-2 rounded"
            value={form.dept}
            onChange={(e) => setForm({ ...form, dept: e.target.value })}
          />
          <button type="submit" className="btn-primary">Create</button>
        </form>
      </section>
    </main>
  );
}
