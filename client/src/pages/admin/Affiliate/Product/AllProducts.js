import React, { useEffect, useState } from 'react';
import Hoc from '../../../../Layouts/admin/Hoc';
import DeleteConfirmationModal from '../../../../Components/admin/DeleteConfirmationModal';
import PrivateApiInstance from '../../../../Utils/PrivateApiInstance';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { urls } from '../../../../Utils/Constant';
import PublicApiInstance from '../../../../Utils/PublicApiInstance';
import { truncateText } from '../../../../Utils/TruncateText';

const AllProducts = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Status Change
  const handleStatusChange = async (status, id) => {
    console.log(status, id);
    try {
      const res = await PrivateApiInstance.patch(`/product/status/${id}`, { status });
      if (!res) {
        toast.error(res.data.status);
      }
      fetchProducts();
      toast.success('Status changed successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Delete
  const handleDeleteAds = async (id) => {
    try {
      const resData = await PrivateApiInstance.delete(`/product/${id}`);
      if (!resData) {
        toast.error("Something went wrong");
      }
      fetchProducts()
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const resData = await PublicApiInstance.get('/product');
      console.log(resData.data);
      setProducts(resData.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  if(loading){
    return (
      <div className="loader-container">
        <div className="loader">
          <h1>loading </h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Products</h5>
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
              <span>Products</span>
            </li>
          </ul>

          <button className="primary-btn module-btn" onClick={() => navigate(`/admin/add-product`)}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand Name</th>
                <th>Short Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Category</th>
                <th>Link</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_SERVER_ASSETS_URL}/${item?.product_image}`}
                      alt={item.product_name}
                      style={{ width: '100px', maxHeight: '100px' }}
                    />
                  </td>
                  <td>{item?.product_name}</td>

                  <td>{item?.brand_name}</td>
                  <td>{truncateText(item?.product_short_desc, 20)}</td>
                  <td>{item?.price}</td>
                  <td>{item?.discount}</td>
                  <td>{item?.category?.category_name}</td>
                  <td><a href={item?.affiliate_link} target='_blank' rel="noreferrer" >Visit</a></td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item?.status}
                        onClick={() => handleStatusChange(item?.status, item?.id)}
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
                            onClick={() => {
                              navigate(`/admin/edit-product/${item?.id}`);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <p>Edit</p>
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
      </div>
    </>
  );
};

export default AllProducts;
