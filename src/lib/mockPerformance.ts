export const getMockPerformanceHistory = () => {
  return Array.from({ length: 6 }).map((_, i) => ({
    month: `Month ${i + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};
