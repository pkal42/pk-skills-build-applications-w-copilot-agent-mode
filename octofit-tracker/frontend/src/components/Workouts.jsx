import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      const data = await fetchData('workouts');
      setWorkouts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadWorkouts();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading workouts...</p></div>;

  const difficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mt-5">
      <h1>Workouts</h1>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description}</p>
                <span className={`badge bg-${difficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
                <p className="card-text mt-2">
                  <small>
                    <strong>Duration:</strong> {workout.durationMinutes} min |{' '}
                    <strong>Focus:</strong> {workout.focusArea}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p>No workouts found.</p>}
    </div>
  );
}
