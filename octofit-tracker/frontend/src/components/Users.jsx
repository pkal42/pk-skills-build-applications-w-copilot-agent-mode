import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchData('users');
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadUsers();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading users...</p></div>;

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Fitness Level</th>
            <th>Favorite Activity</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-capitalize">{user.fitnessLevel}</td>
              <td>{user.favoriteActivity}</td>
              <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p>No users found.</p>}
    </div>
  );
}
