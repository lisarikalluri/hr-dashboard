'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { fetchUsers } from '@/lib/fetchUsers';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import CreateUserModal from '@/components/CreateUserModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  useEffect(() => {
    if (user) loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user]);

  async function loadUsers() {
    setLoading(true);
    const newUsers = await fetchUsers(page);
    setUsers((prev) => [...prev, ...newUsers]);
    setLoading(false);
  }

  function handleCreateUser(newUser: any) {
    setUsers((prev) => [newUser, ...prev]);
    setShowCreateModal(false);
  }

  // Filter and search users by name, email, or department (case-insensitive)
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.department.toLowerCase().includes(term);

    const matchesDepartment = filterDepartment ? user.department === filterDepartment : true;

    return matchesSearch && matchesDepartment;
  });

  if (!user) return null; // Avoid showing before redirect

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Employee Dashboard</h2>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create User
          </button>
        </header>

        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/2
                       bg-white text-black
                       dark:bg-gray-700 dark:text-white
                       dark:border-gray-600"
          />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/4 mt-4 sm:mt-0
                       bg-white text-black
                       dark:bg-gray-700 dark:text-white
                       dark:border-gray-600"
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <AnimatePresence>
          {showCreateModal && (
            <CreateUserModal
              onClose={() => setShowCreateModal(false)}
              onCreate={handleCreateUser}
            />
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id ? `${user.id}-${index}` : index} // unique key
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card user={user} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="btn-secondary"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </main>
    </>
  );
}
