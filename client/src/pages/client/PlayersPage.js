import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PublicApiInstance from '../../Utils/PublicApiInstance';
import '../../assets/css/client/Players.css';
import '../../assets/css/admin/form.css';
import DropdownField from '../../modules/Admin/Forms/DropdownField';

const PlayersPage = () => {
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");

  const set = new URLSearchParams(location.search).get('set');

  const fetchPlayers = async () => {
    try {
      const response = await PublicApiInstance.get(`/players/sets/${set}`);
      console.log(response);
      setPlayers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch players.');
    }
  };


  const fetchTeams = async () => {
    try {
      const response = await PublicApiInstance.get('/teams');
      setTeams(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch teams.');
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, [set]);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };


  const SoldPlayer = async (id) => {
    if(teamId === "") {
      toast.error('Please select a team');
      return
    }
    try {
      const data = { teamId: teamId };
      await PublicApiInstance.put(`/players/sold/${id}`, data);
      toast.success('Player sold successfully');
      fetchPlayers();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to sold player.');
    }
  };

  return (
    <div className="container">
      <h1>Cricket Team Viewer</h1>
      <h2>{set ? `Set ${set} Players` : 'Players'}</h2>
      <Link to="/" className="back-button">
        Back to Sets
      </Link>
      <div class="container">
        <div class="card-grid">
        {players.map((player, index) => (
  <div className="player-card" key={index} onClick={() => handlePlayerClick(player)}>
    {/* Ribbon */}
    {player.is_sold && (
      <div
        className={`player-ribbon ${player.is_sold == 1 ? 'sold' : 'unsold'}`}
      >
        {player.is_sold == 1 ? 'Sold' : 'Unsold'}
      </div>
    )}
    <div className="player-logo">
      <img src="/player.webp" alt="Player" className="player-image" />
    </div>
    <h2 className="player-name">{player.name}</h2>
    <div className="player-roles">
      {player.skill.includes('batsman') && (
        <span className="role batsman" title="Batsman">🏏</span>
      )}
      {player.skill.includes('bowler') && (
        <span className="role bowler" title="Bowler">🎳</span>
      )}
      {player.skill.includes('wicket keeper') && (
        <span className="role wicketkeeper" title="Wicketkeeper">🧤</span>
      )}
    </div>
    {/* <div className="player-actions">
      <p>Is Sold: {player.is_sold ? "Yes" : "No"}</p>
    </div> */}
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

          {
            !selectedPlayer.is_sold && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <div>
                <button className="back-button" onClick={closeModal}>
                  Unsold
                </button>
              </div> */}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <form>
                  <div className="flex-row" style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Select Team</label>
                    <div className="form-group mb-0">
                      <DropdownField
                        options={teams}
                        valueKey="id"
                        labelKey="name"
                        name="skill"
                        onChange={(e) => {
                          setTeamId(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </form>
                <button className="back-button" onClick={() => {SoldPlayer(selectedPlayer.id)}}>
                  Sold
                </button>
              </div>
            </div>
            )
          }
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
