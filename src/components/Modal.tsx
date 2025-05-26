'use client';
import { useState } from 'react';

export default function Modal({ title, children, triggerLabel }: { title: string; children: React.ReactNode; triggerLabel: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-secondary">{triggerLabel}</button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {children}
            <button onClick={() => setOpen(false)} className="btn-primary mt-4">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
