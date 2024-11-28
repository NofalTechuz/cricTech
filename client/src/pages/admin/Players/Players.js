import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PublicApiInstance from '../../../Utils/PublicApiInstance';
import Hoc from '../../../Layouts/admin/Hoc';
import TextInputField from '../../../modules/Admin/Forms/TextInputField';
import DropdownField from '../../../modules/Admin/Forms/DropdownField';

const Players = () => {
  const [sets, setSets] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState({
    name: '',
    set_id: '',
    skill: [],
    link: '',
  });
  const [addPlayerOpen, setAddPlayerOpen] = useState(false);
  const [editPlayerOpen, setEditPlayerOpen] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch sets for the dropdown
  const fetchSets = async () => {
    try {
      const response = await PublicApiInstance.get('/sets');
      setSets(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch sets.');
    }
  };

  // Fetch players
  const fetchPlayers = async () => {
    try {
      const response = await PublicApiInstance.get('/players');
      console.log(response)
      setPlayers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch players.');
    }
  };

  useEffect(() => {
    fetchSets();
    fetchPlayers();
  }, []);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "skill") {
      setPlayerData((prevData) => ({
        ...prevData,
        skill: checked
          ? [...prevData.skill, value] // Add value to the array
          : prevData.skill.filter((item) => item !== value), // Remove value if unchecked
      }));
    } else {
      setPlayerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleAddPlayer = async (e) => {
    e.preventDefault();
    console.log(playerData)
    if (!playerData.name || !playerData.set_id || !playerData.skill || !playerData.link) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.post('/players', playerData);
      toast.success('Player added successfully');
      setAddPlayerOpen(false);
      fetchPlayers();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add player.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlayer = async (e) => {
    e.preventDefault();
    if (!playerData.name || !playerData.set_id || !playerData.skill || !playerData.link) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.put(`/players/${playerId}`, playerData);
      toast.success('Player updated successfully');
      setEditPlayerOpen(false);
      fetchPlayers();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update player.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Players</h5>
          </div>
          <button className="primary-btn module-btn" onClick={() => setAddPlayerOpen(true)}>
            Add New Player
          </button>
        </div>

        <div className="course-form-container">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Set</th>
                <th>Skill</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { players?.map((player, index) => (
                  <tr key={player.id}>
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{sets.find((set) => set.id === player.set_id)?.name || 'N/A'}</td>
                    <td>{player.skill}</td>
                    <td>{player.link}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setPlayerData(player);
                          setPlayerId(player.id);
                          setEditPlayerOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Add Player Modal */}
        {addPlayerOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Add New Set</h5>
                </div>
                <div>
                  <button className="primary-btn module-btn" style={{ marginRight: '20px' }} onClick={handleAddPlayer}>
                    Save
                  </button>
                  <span onClick={() => setAddPlayerOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <form>
                {/* Name */}
                <div className="flex-row">
                  <div className="form-group mb-0">
                    <TextInputField
                      name="name"
                      label="Name"
                      value={playerData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Sets DropDown */}
                <div className="flex-row">
                  <div className="form-group mb-0">
                    <DropdownField
                      name="set_id"
                      label="Set"
                      options={sets}
                      labelKey={'name'}
                      valueKey={'id'}
                      value={playerData.set_id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Skill checkbox with store array with seprate value by comma */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: '100%' }}>
                    <label>
                      Skill <span className="required">*</span>
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="skill"
                        value="Beginner"
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Beginner</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="skill"
                        value="Intermediate"
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Intermediate</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="skill"
                        value="Advanced"
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Advanced</label>
                    </div>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="form-group mb-0">
                    <TextInputField
                      name="link"
                      label="Link"
                      value={playerData.link}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

       
        )}

        {/* Edit Player Modal */}
        {editPlayerOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <h5>Edit Player</h5>
              <form onSubmit={handleEditPlayer}>
                <div className="form-group">
                  <label>Player Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Player Name"
                    onChange={handleInputChange}
                    value={playerData.name}
                  />
                </div>
                <div className="form-group">
                  <label>Set</label>
                  <select name="set_id" onChange={handleInputChange} value={playerData.set_id}>
                    <option value="">Select Set</option>
                    {sets.map((set) => (
                      <option key={set.id} value={set.id}>
                        {set.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Skill</label>
                  <input
                    type="text"
                    name="skill"
                    placeholder="Enter Skill"
                    onChange={handleInputChange}
                    value={playerData.skill}
                  />
                </div>
                <div className="form-group">
                  <label>Link</label>
                  <input
                    type="text"
                    name="link"
                    placeholder="Enter Link"
                    onChange={handleInputChange}
                    value={playerData.link}
                  />
                </div>
                <button type="submit" className="primary-btn">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Players;
