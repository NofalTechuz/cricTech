import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PublicApiInstance from '../../Utils/PublicApiInstance';
import '../../assets/css/client/Players.css';
import '../../assets/css/admin/form.css';
import DropdownField from '../../modules/Admin/Forms/DropdownField';

const TeamPlayers = () => {
    const location = useLocation();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState("");
  
    const set = new URLSearchParams(location.search).get('team');
  
    const fetchPlayers = async () => {
      try {
        const response = await PublicApiInstance.get(`/players/teams/${set}`);
        console.log(response);
        setPlayers(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch players.');
      }
    };
  
  
    const fetchTeams = async (id) => {
      try {
        const response = await PublicApiInstance.get(`/teams/${id}`);
        console.log(response.data)
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch teams.');
      }
    };
  
    useEffect(() => {
      fetchPlayers();
      fetchTeams(set);
    }, [set]);
  
    const handlePlayerClick = (player) => {
      setSelectedPlayer(player);
    };
  
    const closeModal = () => {
      setSelectedPlayer(null);
    };
  
  
  
    return (
      <div className="container">
        <h1>Cricket Team Viewer</h1>
        <h2>{teams ? `${teams.name} Players` : 'Players'}</h2>
        <Link to="/" className="back-button">
          Back to Sets
        </Link>
        <div class="container">
          <div class="card-grid">
            {players.map((player, index) => (
              <div class="player-card" onClick={() => handlePlayerClick(player)}>
                <div class="player-logo">
                  <img src="/player.webp" alt="Player 1" class="player-image" />
                </div>
                <h2 class="player-name">{player.name}</h2>
                <div class="player-roles">
                  {player.skill.includes('batsman') && (
                    <span class="role batsman" title="Batsman">
                      🏏
                    </span>
                  )}
                  {player.skill.includes('bowler') && (
                    <span class="role bowler" title="Bowler">
                      🎳
                    </span>
                  )}
                  {player.skill.includes('wicket keeper') && (
                    <span class="role wicketkeeper" title="Wicketkeeper">
                      🧤
                    </span>
                  )}
                </div>
                <div class="player-actions">
                 <p>is Sold : {player.is_sold ? "Yes" : "No"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div id="players-container">
          {players.map((player, index) => (
            <div key={index} className="player-card" onClick={() => handlePlayerClick(player)}>
              <div className="player-avatar">
                <span className="player-icon">👤</span>
              </div>
              <div className="player-name">{player.name}</div>
              <div className="player-roles">
                {player.skill.includes('batsman') && <span className="role-icon">🏏</span>}
                {player.skill.includes('bowler') && <span className="role-icon">🎳</span>}
                {player.skill.includes('wicket keeper') && <span className="role-icon">🧤</span>}
              </div>
            </div>
          ))}
        </div> */}
  
        {selectedPlayer && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedPlayer.name}</h2>
              <iframe
                src={selectedPlayer.link}
                title={selectedPlayer.name}
                width="100%"
                height="650px"
                style={{ border: 'none' }}
              ></iframe>
  
           
            </div>
          </div>
        )}
      </div>
    );
}

export default TeamPlayers