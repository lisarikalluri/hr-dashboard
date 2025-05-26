'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchUsers } from '@/lib/fetchUsers';
import Tabs from '@/components/Tabs';
import Navbar from '@/components/Navbar';
import Badge from '@/components/Badge';
import { getMockPerformanceHistory } from '@/lib/mockPerformance';

export default function EmployeePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers().then((data) => {
      const selected = data.find((u: any) => u.id === parseInt(id as string));
      setUser(selected);
    });
  }, [id]);

  if (!user) return <div className="p-10">Loading...</div>;

  const tabsContent = {
    Overview: (
      <div>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </div>
    ),
    Projects: (
      <ul className="list-disc ml-5">
        <li>Internal HR Revamp</li>
        <li>Hiring Pipeline Automation</li>
      </ul>
    ),
    Feedback: (
      <form className="space-y-4">
        <textarea
          placeholder="Leave feedback..."
          className="w-full p-2 border rounded"
        />
        <button className="btn-primary">Submit</button>
      </form>
    ),
  };

  const performance = getMockPerformanceHistory();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <section className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.image} className="w-20 h-20 rounded-full" alt={user.name} />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p>{user.department}</p>
            <Badge rating={user.rating} />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Performance History</h2>
        <ul className="mb-4 space-y-1">
          {performance.map((p, idx) => (
            <li key={idx} className="text-sm">{p.month}: ⭐ {p.rating}/5</li>
          ))}
        </ul>

        <Tabs content={tabsContent} />
      </section>
    </main>
  );
}
