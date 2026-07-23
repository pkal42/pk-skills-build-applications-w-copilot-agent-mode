import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      const data = await fetchData('activities');
      setActivities(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadActivities();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading activities...</p></div>;

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name || 'Unknown'}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {activities.length === 0 && <p>No activities found.</p>}
    </div>
  );
}
