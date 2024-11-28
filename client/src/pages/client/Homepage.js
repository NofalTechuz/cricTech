import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicApiInstance from '../../Utils/PublicApiInstance';

const HomePage = () => {
  const [sets, setSets] = React.useState([]);
  const [teams, setTeams] = React.useState([]);

  const fetchSets = async () => {
    try {
      const response = await PublicApiInstance.get('/sets');
      setSets(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await PublicApiInstance.get('/teams');
      setTeams(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSets();
    fetchTeams();
  }, []);

  return (
    <div className="container">
      <h1>Cricket Team Viewer</h1>

      {/* Sets Section */}
      <h2>Sets</h2>
      <div id="sets-container" className="grid-container">
        {sets.map((set, index) => (
          <Link to={`/players?set=${set.id}`} key={index} className="set-card">
            <h3>{set.name}</h3>
            <p>{set.description || 'Description not available'}</p>
          </Link>
        ))}
      </div>

      {/* Teams Section */}
      <h2>Teams</h2>
      <div id="teams-container" className="grid-container">
        {teams.map((team, index) => (
          <Link to={`/team-details?team=${team.id}`} key={index} className="team-card">
            <h3>{team.name}</h3>
            <p>{team.motto || 'Motto not available'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
