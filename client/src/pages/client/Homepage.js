import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicApiInstance from '../../Utils/PublicApiInstance';

const HomePage = () => {
  const [sets, setSets] = React.useState([]);

  const fetchSets = async () => {
    try {
      const response = await PublicApiInstance.get('/sets');
      setSets(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSets();
  }, []);
  return (
    <div className="container">
      <h1>Cricket Team Viewer</h1>
      <div id="sets-container">
        {sets.map((set, index) => (
          <Link to={`/players?set=${set.id}`} key={index} className="set-card">
            {set.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
