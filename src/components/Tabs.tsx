'use client';
import { useState } from 'react';

const tabs = ['Overview', 'Projects', 'Feedback'];

export default function Tabs({ content }: { content: Record<string, React.ReactNode> }) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{content[activeTab]}</div>
    </div>
  );
}
