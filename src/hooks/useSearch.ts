export const useSearch = (data: any[], query: string) => {
  const q = query.toLowerCase();
  return data.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q)
  );
};
