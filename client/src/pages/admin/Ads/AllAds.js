import React, { useEffect, useState } from 'react';
import Hoc from '../../../Layouts/admin/Hoc';
import { NavLink } from 'react-router-dom';
import { urls } from '../../../Utils/Constant';
import { toast } from 'react-toastify';
import PrivateApiInstance from '../../../Utils/PrivateApiInstance';
import PublicApiInstance from '../../../Utils/PublicApiInstance';
import { formatDate } from '../../../Utils/Datefuntion';
import DeleteConfirmationModal from '../../../Components/admin/DeleteConfirmationModal';

const AllAds = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addAdsOpen, setAddAdsOpen] = useState(false); // state for open add user modal
  const [editAdsOpen, setEditAdsOpen] = useState(false); // state for open edit user modal

  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');
  const [fileName, setFileName] = useState('');
  const [addbtnLoading, setAddbtnLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [adsId, setAdsId] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
      await handleDeleteAds(itemToDelete.id); // Reuse your delete function
    }
  };

  const [adsData, setAdsData] = useState({
    advertiser_name: '',
    ads_company_name: '',
    ads_cost: '',
    placement_area: null,
    ads_code: '',
    ads_image: '',
    ads_url: '',
    is_image_or_video: true,
    start_date: '',
    end_date: '',
    is_custom_ads: false,
    status: true,
  });

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Function to toggle visibility of add user modal
  const userToggleModal = () => {
    setAddAdsOpen(!addAdsOpen);
  };

  // Function to toggle visibility of edit user modal
  const editAdsToggleModal = async (id) => {
    if (!editAdsOpen) {
      setAdsId(id);
      try {
        const res = await PublicApiInstance.get(`/ads/${id}`);
        if (res.data.data.length > 0) {
          setAdsData(res.data.data[0]);
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAdsId(null);
      setAdsData({
        advertiser_name: '',
        ads_company_name: '',
        ads_cost: '',
        placement_area: null,
        ads_code: '',
        ads_image: '',
        ads_url: '',
        is_image_or_video: true,
        start_date: '',
        end_date: '',
        is_custom_ads: false,
        status: true,
      });
    }
    setEditAdsOpen(!editAdsOpen);
    setIsImageSelected(false);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdsData({ ...adsData, ads_image: file });
      setFileName(file.name);
      setIsImageSelected(true);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdsData({ ...adsData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAdsData({ ...adsData, [name]: value === 'true' });
  };

  // Status Change
  const handleStatusChange = async (status, id) => {
    console.log(status, id);
    try {
      const res = await PrivateApiInstance.patch(`/ads/status/${id}`, { status });
      if (!res) {
        toast.error(res.data.status);
      }
      console.log(res.data);
      toast.success('Status changed successfully');
      fetchAds();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleAddAds = async (e) => {
    e.preventDefault();
    if (
      adsData.advertiser_name === '' ||
      adsData.ads_company_name === '' ||
      adsData.ads_cost === '' ||
      adsData.placement_area === null ||
      adsData.start_date === '' ||
      adsData.end_date === ''
    ) {
      console.log(adsData);
      toast.error('Please fill all the fields');
      return;
    }
    console.log(adsData.is_custom_ads);
    if (adsData.is_custom_ads) {
      if (adsData.ads_image === '' && adsData.ads_url === '') {
        toast.error('Please Upload Image or Video');
        return;
      }
    } else {
      if (adsData.ads_code === '') {
        toast.error('Please Enter Ads Code');
        return;
      }
    }

    if (new Date(adsData.end_date) < new Date(adsData.start_date)) {
      toast.error('End date should be greater than start date');
      return;
    }

    const formData = new FormData();
    formData.append('advertiser_name', adsData.advertiser_name);
    formData.append('ads_company_name', adsData.ads_company_name);
    formData.append('ads_cost', adsData.ads_cost);
    formData.append('placement_area', adsData.placement_area);
    formData.append('ads_code', adsData.ads_code);
    formData.append('ads_image', adsData.ads_image);
    formData.append('ads_url', adsData.ads_url);
    formData.append('is_image_or_video', adsData.is_image_or_video);
    formData.append('start_date', adsData.start_date);
    formData.append('end_date', adsData.end_date);
    formData.append('is_custom_ads', adsData.is_custom_ads);
    formData.append('status', adsData.status);

    setAddbtnLoading(true);
    try {
      const resData = await PrivateApiInstance.post('/ads', adsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(resData);
      if (!resData) {
        toast.error(resData.data.message);
      }
      console.log(resData.data.data);
      toast.success(resData.data.message);
      setAdsData({
        advertiser_name: '',
        ads_company_name: '',
        ads_cost: '',
        placement_area: null,
        ads_code: '',
        ads_image: '',
        ads_url: '',
        is_image_or_video: true,
        start_date: '',
        end_date: '',
        is_custom_ads: false,
        status: true,
      });
      setAddAdsOpen(false);
      fetchAds();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setAddbtnLoading(false);
    setIsImageSelected(false);
  };

  const handleEditAds = async (e) => {
    e.preventDefault();
    if (
      adsData.advertiser_name === '' ||
      adsData.ads_company_name === '' ||
      adsData.ads_cost === '' ||
      adsData.placement_area === null ||
      adsData.start_date === '' ||
      adsData.end_date === ''
    ) {
      console.log(adsData);
      toast.error('Please fill all the fields');
      return;
    }
    console.log(adsData.is_custom_ads);
    if (adsData.is_custom_ads) {
      if (adsData.ads_image === '' && adsData.ads_url === '') {
        toast.error('Please Upload Image or Video');
        return;
      }
    } else {
      if (adsData.ads_code === '') {
        toast.error('Please Enter Ads Code');
        return;
      }
    }

    const formData = new FormData();
    formData.append('advertiser_name', adsData.advertiser_name);
    formData.append('ads_company_name', adsData.ads_company_name);
    formData.append('ads_cost', adsData.ads_cost);
    formData.append('placement_area', adsData.placement_area);
    formData.append('ads_code', adsData.ads_code);
    formData.append('ads_image', adsData.ads_image);
    formData.append('ads_url', adsData.ads_url);
    formData.append('is_image_or_video', adsData.is_image_or_video);
    formData.append('start_date', adsData.start_date);
    formData.append('end_date', adsData.end_date);
    formData.append('is_custom_ads', adsData.is_custom_ads);
    formData.append('status', adsData.status);

    setAddbtnLoading(true);
    try {
      const resData = await PrivateApiInstance.put(`/ads/${adsId}`, adsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(resData);
      if (!resData) {
        toast.error(resData.data.message);
      }
      toast.success('Updated Successfully');
      setAdsData({
        advertiser_name: '',
        ads_company_name: '',
        ads_cost: '',
        placement_area: null,
        ads_code: '',
        ads_image: '',
        ads_url: '',
        is_image_or_video: true,
        start_date: '',
        end_date: '',
        is_custom_ads: false,
        status: true,
      });
      setAddAdsOpen(false);
      setEditAdsOpen(false);
      fetchAds();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setAddbtnLoading(false);
    setIsImageSelected(false);
  };

  const fetchAds = async () => {
    try {
      const resData = await PublicApiInstance.get('/ads');
      if (!resData) {
        toast.error(resData.data.message);
      }
      setAds(resData.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteAds = async (id) => {
    try {
      const resData = await PrivateApiInstance.delete(`/ads/${id}`);
      if (!resData) {
        toast.error(resData.data.message);
      }
      toast.success("Deleted Successfully");
      fetchAds();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Ads</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li>
              <NavLink to={urls.ADMIN_DASHBOARD} className={'active-tootip'}>
                Dashboard
              </NavLink>
              <span> / </span>
              <span>Ads</span>
            </li>
          </ul>

          <button className="primary-btn module-btn" onClick={userToggleModal}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Advertiser Name</th>
                <th>Company Name</th>
                <th>Cost</th>
                <th>Placement</th>
                <th>Custom Ads</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.advertiser_name}</td>

                  <td>{item.ads_company_name}</td>
                  <td>{item.ads_cost}</td>
                  <td>{item.placement_area}</td>
                  <td>{item.is_custom_ads ? 'Yes' : 'No'}</td>
                  <td>{formatDate(item.start_date)}</td>
                  <td>{formatDate(item.end_date)}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.status}
                        onClick={() => handleStatusChange(item.status, item.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td>
                    <div className={`menu-container ${activeDropdown === index ? 'active' : ''}`}>
                      <div className="menu-button" onClick={() => toggleDropdown(index)}>
                        {' '}
                        ⋮{' '}
                      </div>
                      {activeDropdown === index && (
                        <div className="menu-content">
                          <a
                            href={() => false}
                            // onClick={() => {
                            //   editToggleModal();
                            // }}
                            style={{ cursor: 'pointer' }}
                          >
                            <p onClick={() => editAdsToggleModal(item.id)}>Edit</p>
                          </a>
                          <p onClick={() => openDeleteModal(item)} style={{ cursor: 'pointer' }}>
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          warnMsg={`Are you sure you want to delete ads of <strong>${itemToDelete?.advertiser_name}</strong>`}
        />

        {/* Add Ads Modal */}
        {addAdsOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Add New Ads</h5>
                </div>
                <div>
                  <button
                    className="primary-btn module-btn"
                    style={{ marginRight: '20px' }}
                    onClick={handleAddAds}
                    disabled={addbtnLoading}
                  >
                    Save
                  </button>
                  <span onClick={userToggleModal}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <form>
                {/* Advertiser Name / Ads Company Name / Ads Cost */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>
                      Advertiser Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Advertiser Name"
                      className="col12input"
                      name="advertiser_name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>Ads Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter Ads Company Name"
                      className="col12input"
                      name="ads_company_name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>Ads Cost</label>
                    <input
                      type="text"
                      placeholder="Enter Ads Cost"
                      className="col12input"
                      onChange={handleInputChange}
                      name="ads_cost"
                    />
                  </div>
                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>Ads Placement Area</label>
                    <select className="col12input" name="placement_area" onChange={handleInputChange}>
                      <option value={null}>Select</option>
                      <option value="1">Top</option>
                      <option value="2">Sidebar</option>
                      <option value="3">Footer</option>
                    </select>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="radio-group">
                    <label>Custom Ads</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="is_custom_ads"
                          value="true"
                          checked={adsData.is_custom_ads === true}
                          onChange={handleRadioChange}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="is_custom_ads"
                          value="false"
                          checked={adsData.is_custom_ads === false}
                          onChange={handleRadioChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {adsData.is_custom_ads && (
                  <div>
                    <div className="flex-row">
                      <div className="radio-group">
                        <label>Image or Video</label>

                        <div>
                          <label>
                            <input
                              type="radio"
                              name="is_image_or_video"
                              value={true}
                              checked={adsData.is_image_or_video === true}
                              onChange={handleRadioChange}
                            />
                            Image {adsData.is_image_or_video}
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="is_image_or_video"
                              value={false}
                              checked={adsData.is_image_or_video === false}
                              onChange={handleRadioChange}
                            />
                            Video URL
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="form-group mb-0" style={{ width: '100%' }}>
                        {adsData.is_image_or_video === true && (
                          <div
                            className="flex-row"
                            style={{
                              width: '100%',
                              border: 'none',
                              alignItems: 'end',
                              gap: '20px',
                              justifyContent: 'normal',
                            }}
                          >
                            <div className="form-group mb-0" style={{ width: '90%' }}>
                              <label>
                                Profile Picture <span className="required">*</span>
                              </label>
                              <input type="text" placeholder="" className="col12input" value={fileName} readOnly />
                            </div>

                            <button className="primary-btn module-btn" type="button" onClick={handleButtonClick}>
                              Browse
                            </button>

                            <input
                              id="fileInput"
                              type="file"
                              style={{ display: 'none' }}
                              name="ads_image"
                              accept="image/*"
                              onChange={handleFileChange}
                            />

                            <div>
                              <img
                                src={imageSrc}
                                style={{ width: '67px', maxHeight: '67px' }}
                                alt="Selected Thumbnail"
                              />
                            </div>
                          </div>
                        )}

                        {adsData.is_image_or_video === false && (
                          <div className="flex-row" style={{ border: 'none' }}>
                            <div className="form-group mb-0" style={{ width: '100%' }}>
                              <label>Video URL</label> <br />
                              <input
                                type="url"
                                name="ads_url"
                                value={adsData.ads_url}
                                onChange={handleInputChange}
                                placeholder="Enter Video URL"
                                className="col12input"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ads Code (if not custom ads) */}
                {!adsData.is_custom_ads && (
                  <div className="flex-row">
                    <div className="form-group mb-0" style={{ width: '100%' }}>
                      <label>Ads Code</label>
                      <textarea
                        name="ads_code"
                        value={adsData.ads_code}
                        onChange={handleInputChange}
                        placeholder="Enter Ads Code"
                        className="col12input"
                        rows="5"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={adsData.start_date}
                      onChange={handleInputChange}
                      required
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>End Date</label>
                    <input
                      type="date"
                      name="end_date"
                      value={adsData.end_date}
                      onChange={handleInputChange}
                      required
                      className="col12input"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Ads Modal */}
        {editAdsOpen && (
          <div className="modal">
            <div className="model-form-container" style={{ width: '60%' }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Edit Ads</h5>
                </div>
                <div>
                  <button className="primary-btn module-btn" onClick={handleEditAds} style={{ marginRight: '20px' }}>
                    Update
                  </button>
                  <span onClick={editAdsToggleModal}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <form>
                {/* Advertiser Name / Ads Company Name / Ads Cost */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>
                      Advertiser Name {adsData.advertiser_name + ' SS'}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Advertiser Name"
                      className="col12input"
                      name="advertiser_name"
                      value={adsData.advertiser_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>Ads Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter Ads Company Name"
                      className="col12input"
                      name="ads_company_name"
                      value={adsData.ads_company_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: '49%' }}>
                    <label>Ads Cost</label>
                    <input
                      type="text"
                      placeholder="Enter Ads Cost"
                      className="col12input"
                      value={adsData.ads_cost}
                      onChange={handleInputChange}
                      name="ads_cost"
                    />
                  </div>
                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>Ads Placement Area</label>
                    <select
                      className="col12input"
                      name="placement_area"
                      value={adsData.placement_area}
                      onChange={handleInputChange}
                    >
                      <option value={null}>Select</option>
                      <option value="1">Top</option>
                      <option value="2">Sidebar</option>
                      <option value="3">Footer</option>
                    </select>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="radio-group">
                    <label>Custom Ads</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="is_custom_ads"
                          value="true"
                          checked={adsData.is_custom_ads === true}
                          onChange={handleRadioChange}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="is_custom_ads"
                          value="false"
                          checked={adsData.is_custom_ads === false}
                          onChange={handleRadioChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {adsData.is_custom_ads && (
                  <div>
                    <div className="flex-row">
                      <div className="radio-group">
                        <label>Image or Video</label>

                        <div>
                          <label>
                            <input
                              type="radio"
                              name="is_image_or_video"
                              value={true}
                              checked={adsData.is_image_or_video === true}
                              onChange={handleRadioChange}
                            />
                            Image
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="is_image_or_video"
                              value={false}
                              checked={adsData.is_image_or_video === false}
                              onChange={handleRadioChange}
                            />
                            Video URL
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="form-group mb-0" style={{ width: '100%' }}>
                        {adsData.is_image_or_video === true && (
                          <div
                            className="flex-row"
                            style={{
                              width: '100%',
                              border: 'none',
                              alignItems: 'end',
                              gap: '20px',
                              justifyContent: 'normal',
                            }}
                          >
                            <div className="form-group mb-0" style={{ width: '90%' }}>
                              <label>
                                Profile Picture <span className="required">*</span>
                              </label>
                              <input type="text" placeholder="" className="col12input" value={fileName} readOnly />
                            </div>

                            <button className="primary-btn module-btn" type="button" onClick={handleButtonClick}>
                              Browse
                            </button>

                            <input
                              id="fileInput"
                              type="file"
                              style={{ display: 'none' }}
                              name="ads_image"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                            {isImageSelected ? (
                              <div>
                                <img
                                  src={imageSrc}
                                  style={{ width: '67px', maxHeight: '67px' }}
                                  alt="Select Thumbnail"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src={`${process.env.REACT_APP_SERVER_ASSETS_URL}/${adsData.ads_image}`}
                                  style={{ width: '67px', maxHeight: '67px' }}
                                  alt="Selected Thumbnail"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {adsData.is_image_or_video === false && (
                          <div className="flex-row" style={{ border: 'none' }}>
                            <div className="form-group mb-0" style={{ width: '100%' }}>
                              <label>Video URL</label> <br />
                              <input
                                type="url"
                                name="ads_url"
                                value={adsData.ads_url}
                                onChange={handleInputChange}
                                placeholder="Enter Video URL"
                                className="col12input"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ads Code (if not custom ads) */}
                {!adsData.is_custom_ads && (
                  <div className="flex-row">
                    <div className="form-group mb-0" style={{ width: '100%' }}>
                      <label>Ads Code</label>
                      <textarea
                        name="ads_code"
                        value={adsData.ads_code}
                        onChange={handleInputChange}
                        placeholder="Enter Ads Code"
                        className="col12input"
                        rows="5"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formatDate(adsData.start_date)}
                      onChange={handleInputChange}
                      required
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: '48%' }}>
                    <label>End Date</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formatDate(adsData.end_date)}
                      onChange={handleInputChange}
                      required
                      className="col12input"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllAds;
