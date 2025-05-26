'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
  onCreate: (user: any) => void;
};

export default function CreateUserModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !department.trim()) {
      setError('All fields are required');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      department,
    };

    onCreate(newUser);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.form
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-lg font-semibold dark:text-white">Create User</h2>
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <div className="flex justify-end space-x-4 pt-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
