import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PublicApiInstance from "../../Utils/PublicApiInstance";

const playersData = {
    A: [
      {
        name: "Player A1",
        roles: ["batter", "bowler"],
        battingAvg: 45.5,
        bowlingAvg: 25.3,
        catches: 50,
        link: "https://cricheroes.com/player-profile/2985185/ketan-aahuja/stats",
      },
      {
        name: "Player A2",
        roles: ["bowler"],
        battingAvg: 22.1,
        bowlingAvg: 18.7,
        catches: 30,
        link: "https://cricheroes.com/player-profile/2985185/ketan-aahuja/stats",
      },
      {
        name: "Player A3",
        roles: ["batter", "wk"],
        battingAvg: 35.8,
        bowlingAvg: null,
        catches: 150,
        link: "https://cricheroes.com/player-profile/2985185/ketan-aahuja/stats",
      },
    ],
    B: [
      {
        name: "Player B1",
        roles: ["batter"],
        battingAvg: 52.3,
        bowlingAvg: 35.1,
        catches: 40,
        link: "https://example.com/player-b1",
      },
      {
        name: "Player B2",
        roles: ["bowler", "batter"],
        battingAvg: 18.9,
        bowlingAvg: 22.5,
        catches: 25,
        link: "https://example.com/player-b2",
      },
      {
        name: "Player B3",
        roles: ["wk", "batter", "bowler"],
        battingAvg: 30.2,
        bowlingAvg: 28.5,
        catches: 130,
        link: "https://example.com/player-b3",
      },
    ],
    // Add data for Set C similarly
  };
  
  const PlayersPage = () => {
    const location = useLocation();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
  
    const set = new URLSearchParams(location.search).get("set");
  
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

    useEffect(() => {

      fetchPlayers();
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
        <h2>{set ? `Set ${set} Players` : "Players"}</h2>
        <Link to="/" className="back-button">
          Back to Sets
        </Link>
        <div id="players-container">
          {players.map((player, index) => (
            <div
              key={index}
              className="player-card"
              onClick={() => handlePlayerClick(player)}
            >
              <div className="player-avatar">
                <span className="player-icon">👤</span>
              </div>
              <div className="player-name">{player.name}</div>
              <div className="player-roles">
                {player.skill.includes("batsman") && <span className="role-icon">🏏</span>}
                {player.skill.includes("bowler") && <span className="role-icon">🎳</span>}
                {player.skill.includes("wicket keeper") && <span className="role-icon">🧤</span>}
              </div>
            </div>
          ))}
        </div>
  
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
                height="500px"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PlayersPage;
  