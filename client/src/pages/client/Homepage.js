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
    <>
      <div style={{ backgroundImage:"linear-gradient(143.7deg,#a72056 0,#fc0 100%)", color: 'white', padding: '20px', textAlign: 'center', position:"sticky", height:"100px" }}>
        <h1 style={{ color: 'white' }}>Techuz Cricket League Season - 4</h1>
      </div>
      <div className="container">
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
            <div style={{ backgroundImage:`linear-gradient(143.7deg,${team.color_1} 0,${team.color_2} 100%)`, }} className='team-card'>

            <Link to={`/team-details?team=${team.id}`} key={index} style={{textDecoration:"none", color:"white"}} >
              <h3>{team.name}</h3>
              <p>{team.motto || 'Motto not available'}</p>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
