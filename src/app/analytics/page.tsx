'use client';

import { Bar } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const departmentRatings = {
  HR: 4.2,
  Engineering: 4.5,
  Marketing: 3.8,
  Sales: 4.0,
  Design: 4.1,
};

const bookmarkTrends = {
  Jan: 5,
  Feb: 10,
  Mar: 8,
  Apr: 15,
};

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <section className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>

        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Department-wise Avg Ratings</h2>
          <Bar
            data={{
              labels: Object.keys(departmentRatings),
              datasets: [
                {
                  label: 'Avg Rating',
                  data: Object.values(departmentRatings),
                  backgroundColor: '#3b82f6',
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Bookmark Trends</h2>
          <Bar
            data={{
              labels: Object.keys(bookmarkTrends),
              datasets: [
                {
                  label: 'Bookmarks',
                  data: Object.values(bookmarkTrends),
                  backgroundColor: '#10b981',
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
      </section>
    </main>
  );
}
