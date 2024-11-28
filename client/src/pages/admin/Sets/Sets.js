import React, { useEffect, useState } from 'react';
import Hoc from '../../../Layouts/admin/Hoc';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../../../Components/admin/DeleteConfirmationModal';
import axios from 'axios';
import TextareaInput from '../../../modules/Admin/Forms/TextareaInput';
import PublicApiInstance from '../../../Utils/PublicApiInstance';

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addSetOpen, setAddSetOpen] = useState(false);
  const [editSetOpen, setEditSetOpen] = useState(false);
  const [setId, setSetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setData, setSetData] = useState({
    name: '',
    description: '',
  });

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const fetchSets = async () => {
    try {
      const response = await PublicApiInstance.get('/sets');
      setSets(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch sets.');
    }
  };

  useEffect(() => {
    fetchSets();
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
      await handleDeleteSet(itemToDelete.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSetData({ ...setData, [name]: value });
  };

  const handleAddSet = async (e) => {
    e.preventDefault();
    if (!setData.name || !setData.description) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.post('/sets', setData);
      toast.success('Set added successfully');
      setAddSetOpen(false);
      fetchSets();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add set.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSet = async (e) => {
    e.preventDefault();
    if (!setData.name || !setData.description) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await PublicApiInstance.put(`/sets/${setId}`, setData);
      toast.success('Set updated successfully');
      setEditSetOpen(false);
      fetchSets();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update set.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSet = async (id) => {
    try {
      await PublicApiInstance.delete(`/sets/${id}`);
      toast.success('Set deleted successfully');
      fetchSets();
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
            <h5>Sets</h5>
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
              <span>Sets</span>
            </li>
          </ul>

          <button className="primary-btn module-btn" onClick={() => setAddSetOpen(true)}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sets.length > 0 && sets?.map((set, index) => (
                <tr key={set.id}>
                  <td>{index + 1}</td>
                  <td>{set.name}</td>
                  <td>{set.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setSetData(set);
                        setSetId(set.id);
                        setEditSetOpen(true);
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

        {addSetOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Add New Set</h5>
                </div>
                <div>
                  <button
                    className="primary-btn module-btn"
                    style={{ marginRight: '20px' }}
                    onClick={handleAddSet}
                  >
                    Save
                  </button>
                  <span onClick={() => setAddSetOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <form >
              <div className="flex-row">
                  <div className="form-group mb-0">
                    <label>
                      Set Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Set Name"
                      className="col12input"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Description */}
                <TextareaInput
                  name="description"
                  label="Description"
                  value={setData.description}
                  onChange={handleInputChange}
                />

            
              </form>
            </div>
          </div>
        )}

        {editSetOpen && (
            
        //   <div className="modal">
        //     <form onSubmit={}>
        //       <h2>Edit Set</h2>
        //       <input type="text" name="name" placeholder="Set Name" value={setData.name} onChange={handleInputChange} />
        //       <textarea
        //         name="description"
        //         placeholder="Description"
        //         value={setData.description}
        //         onChange={handleInputChange}
        //       />
        //       <button type="submit" className="btn btn-primary">
        //         {loading ? 'Updating...' : 'Update'}
        //       </button>
        //       <button onClick={() => setEditSetOpen(false)} className="btn btn-secondary">
        //         Cancel
        //       </button>
        //     </form>
        //   </div>

        <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Update Sets</h5>
                </div>
                <div>
                  <button
                    className="primary-btn module-btn"
                    style={{ marginRight: '20px' }}
                    onClick={handleEditSet}
                  >
                    Update
                  </button>
                  <span onClick={() => setAddSetOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <form >
              <div className="flex-row">
                  <div className="form-group mb-0">
                    <label>
                      Set Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Set Name"
                      className="col12input"
                      name="name"
                      onChange={handleInputChange}
                      value={setData.name}
                    />
                  </div>
                </div>

                {/* Description */}
                <TextareaInput
                  name="description"
                  label="Description"
                  value={setData.description}
                  onChange={handleInputChange}
                />

            
              </form>
            </div>
          </div>
        )}

        <DeleteConfirmationModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} />
      </div>
    </>
  );
};

export default Sets;
