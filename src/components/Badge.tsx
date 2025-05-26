export default function Badge({ rating }: { rating: number }) {
  const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500'];
  const color = colors[rating - 1] || 'bg-gray-300';

  return (
    <span className={`inline-block mt-1 px-2 py-1 text-xs text-white rounded ${color}`}>
      ⭐ {rating}/5
    </span>
  );
}
