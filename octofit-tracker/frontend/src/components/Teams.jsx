import { useState, useEffect } from 'react';
import { fetchData } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      const data = await fetchData('teams');
      setTeams(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadTeams();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading teams...</p></div>;

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">
                  <strong>Motto:</strong> {team.motto}
                </p>
                <p className="card-text">
                  <strong>Captain:</strong> {team.captain?.name || 'Unknown'}
                </p>
                <p className="card-text">
                  <strong>Members:</strong> {team.members?.length || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p>No teams found.</p>}
    </div>
  );
}
