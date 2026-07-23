import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await fetchData('leaderboard');
      setLeaderboard(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadLeaderboard();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading leaderboard...</p></div>;

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
            <th>Weekly Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry._id}>
              <td>
                <strong>#{entry.rank}</strong>
              </td>
              <td>{entry.user?.name || 'Unknown'}</td>
              <td>{entry.team?.name || 'Unknown'}</td>
              <td className="fw-bold">{entry.points}</td>
              <td>{entry.weeklyStreak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
      {leaderboard.length === 0 && <p>No leaderboard data found.</p>}
    </div>
  );
}
