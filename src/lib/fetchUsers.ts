export async function fetchUsers(page: number = 1, limit: number = 6) {
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  const data = await res.json();

  const departments = ['HR', 'Sales', 'Engineering', 'Design', 'Marketing'];

  return data.users.map((user: any) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    image: user.image,
    phone: user.phone,
    address: `${user.address.address}, ${user.address.city}`,
    bio: 'Passionate and result-oriented professional.',
  }));
}
