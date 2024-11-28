import React, { useEffect, useState } from 'react';
import Hoc from '../../../Layouts/admin/Hoc';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../../../Components/admin/DeleteConfirmationModal';
import axios from 'axios';
import TextareaInput from '../../../modules/Admin/Forms/TextareaInput';
import PublicApiInstance from '../../../Utils/PublicApiInstance';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const [setId, setTeamId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setData, setTeamData] = useState({
    name: '',
  });

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
    fetchTeams();
  }, []);

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteTeam(itemToDelete.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...setData, [name]: value });
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!setData.name) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.post('/teams', setData);
      toast.success('Team added successfully');
      setAddTeamOpen(false);
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add set.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeam = async (e) => {
    e.preventDefault();
    if (!setData.name) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.put(`/teams/${setId}`, setData);
      toast.success('Team updated successfully');
      setEditTeamOpen(false);
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update set.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await PublicApiInstance.delete(`/teams/${id}`);
      toast.success('Team deleted successfully');
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete set.');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Teams</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li>
              Dashboard
              <span> / </span>
              <span>Teams</span>
            </li>
          </ul>

          <button className="primary-btn module-btn" onClick={() => setAddTeamOpen(true)}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length > 0 &&
                teams?.map((set, index) => (
                  <tr key={set.id}>
                    <td>{index + 1}</td>
                    <td>{set.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setTeamData(set);
                          setTeamId(set.id);
                          setEditTeamOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" style={{ marginLeft: '10px' }} onClick={() => openDeleteModal(set)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {addTeamOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Add New Team</h5>
                </div>
                <div>
                  <button className="primary-btn module-btn" style={{ marginRight: '20px' }} onClick={handleAddTeam}>
                    Save
                  </button>
                  <span onClick={() => setAddTeamOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <form>
                <div className="flex-row">
                  <div className="form-group mb-0">
                    <label>
                      Team Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Team Name"
                      className="col12input"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {editTeamOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Update Teams</h5>
                </div>
                <div>
                  <button className="primary-btn module-btn" style={{ marginRight: '20px' }} onClick={handleEditTeam}>
                    Update
                  </button>
                  <span onClick={() => setAddTeamOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <form>
                <div className="flex-row">
                  <div className="form-group mb-0">
                    <label>
                      Team Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Team Name"
                      className="col12input"
                      name="name"
                      onChange={handleInputChange}
                      value={setData.name}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <DeleteConfirmationModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} />
      </div>
    </>
  );
};

export default Team;
