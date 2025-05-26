'use client'

import React, { useState, useMemo } from 'react'
import Card from './Card'

export default function UserList({ users }: { users: any[] }) {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')

  // Extract all departments from users
  const departments = useMemo(() => {
    const unique = new Set(users.map(u => u.department))
    return ['All', ...Array.from(unique)]
  }, [users])

  // Filter logic
  const filtered = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase())
    )
    const matchesDept = department === 'All' || user.department === department
    return matchesSearch && matchesDept
  })

  return (
    <div>
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500"
        />

        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* 👤 Filtered Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
