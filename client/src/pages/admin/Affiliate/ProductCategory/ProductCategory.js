import React, { useEffect, useState } from 'react';
import Hoc from '../../../../Layouts/admin/Hoc';
import DeleteConfirmationModal from '../../../../Components/admin/DeleteConfirmationModal';
import { toast } from 'react-toastify';
import PrivateApiInstance from '../../../../Utils/PrivateApiInstance';
import PublicApiInstance from '../../../../Utils/PublicApiInstance';
import { truncateText } from '../../../../Utils/TruncateText';
import { NormalizeArray } from '../../../../Utils/NormalizeArray';

function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // State for the category being edited
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal
  const [itemToDelete, setItemToDelete] = useState(null); // State for the item to be deleted
  const [editCatID, setEditCatID] = useState(null);

  const [productCategoryData, setProductCategoryData] = useState({
    name: '',
    description: '',
    icon: '',
    meta_tags: [],
    meta_keywords: [],
    canonical_url: '',
  });
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');
  const [fileName, setFileName] = useState('');
  const [addbtnLoading, setAddbtnLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductCategoryData({ ...productCategoryData, icon: file });
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductCategoryData({ ...productCategoryData, [name]: value });
  };

  // Add meta tag or keyword on key press (Enter or Comma)
  const handleMetaInputKeyDown = (e, type) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newValue = e.target.value.trim();
      if (newValue && !productCategoryData[type].includes(newValue)) {
        setProductCategoryData((prevData) => ({
          ...prevData,
          [type]: [...prevData[type], newValue], // Add the new tag/keyword to the array
        }));
        e.target.value = ''; // Clear input field
      }
    }
  };

  // Remove meta tag or keyword
  const handleRemoveTag = (e, type, value) => {
    e.preventDefault();
    setProductCategoryData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((tag) => tag !== value), // Remove the clicked tag/keyword from the array
    }));
  };

  // Handle add or edit
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (productCategoryData.name === '') {
      toast.error('Please enter category name');
      return;
    }

    if (productCategoryData.description === '') {
      toast.error('Please enter category description');
      return;
    }

    if (productCategoryData.icon === '') {
      toast.error('Please select category icon');
      return;
    }

    setAddbtnLoading(true);

    const formData = new FormData();
    formData.append('name', productCategoryData.name);
    formData.append('icon', productCategoryData.icon);
    formData.append('description', productCategoryData.description);
    formData.append('meta_tags', JSON.stringify(productCategoryData.meta_tags));
    formData.append('meta_keywords', JSON.stringify(productCategoryData.meta_keywords));
    formData.append('canonical_url', productCategoryData.canonical_url);

    if (editingCategory) {
      // Edit existing category

      try {
        const res = await PrivateApiInstance.put(`/product-category/${editCatID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        toast.success('Product Category Updated Successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
    } else {
      // Add new category

      try {
        const res = await PrivateApiInstance.post('/product-category', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        toast.success('Product Category Added Successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
    }

    setProductCategoryData({
      name: '',
      description: '',
      icon: '',
      meta_tags: '',
      meta_keywords: '',
      canonical_url: '',
    });

    setImageSrc('https://via.placeholder.com/150');
    setFileName('');

    setAddbtnLoading(false);
    fetchCategories();
    setEditingCategory(null);
    setEditCatID(null);

  };

  // Open delete modal
  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const res = await PrivateApiInstance.delete(`/product-category/${itemToDelete.id}`);
        console.log(res.data);
        toast.success('Product Category Deleted Successfully');
        fetchCategories();
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
      closeDeleteModal();
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await PublicApiInstance.get('/product-category');
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      // Fetch the existing data for the category being edited
      setProductCategoryData({
        name: editingCategory.category_name,
        description: editingCategory.category_desc,
        icon: editingCategory.category_icon,
        // convert into array and then store
        meta_tags: NormalizeArray(editingCategory.meta_tags),

        meta_keywords: NormalizeArray(editingCategory.meta_keywords),
        canonical_url: editingCategory.canonical_url,
      });

      setImageSrc(`${process.env.REACT_APP_SERVER_ASSETS_URL}/${editingCategory.category_icon}`);
      setFileName(editingCategory.category_icon);
      
      setEditCatID(editingCategory.id);
    }
  }, [editingCategory]);

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Product Categories</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="course-form-container" style={{ display: 'flex', gap: '20px' }}>
          <div className="list-data">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((category, idx) => (
                    <tr key={category.id}>
                      <td>{idx+1}</td>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_SERVER_ASSETS_URL}/${category.category_icon}`}
                          alt={category.category_name}
                          style={{ width: '100px', maxHeight: '100px' }}
                        />
                      </td>
                      <td>{category.category_name}</td>
                      <td>{truncateText(category.category_desc, 20)}</td>

                      <td>
                        {editCatID !== category.id ? (
                          <>
                            <span
                              className="edit"
                              onClick={() => {
                                setEditingCategory(category);
                              }}
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </span>
                            <span className="xmark edit" onClick={() => openDeleteModal(category)}>
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className="edit"
                              onClick={() => {
                                setEditingCategory(null);
                                setEditCatID(null);
                                setProductCategoryData({
                                  name: '',
                                  description: '',
                                  icon: '',
                                  meta_tags: [],
                                  meta_keywords: [],
                                  canonical_url: '',
                                });
                                
                                setImageSrc('https://via.placeholder.com/150');
                                setFileName('');
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="roll-container">
            <h5>{editingCategory ? 'Edit Category' : 'Add Category'}</h5>
            <form onSubmit={handleSaveCategory}>
              <div className="form-group">
                <label>
                  Category Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className="col12input"
                  name="name"
                  value={productCategoryData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mb-0" style={{ width: '100%' }}>
                <label>
                  Category Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Category Description"
                  className="col12input"
                  rows="5"
                  value={productCategoryData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="flex-row"
                style={{
                  width: '100%',
                  border: 'none',
                  alignItems: 'end',
                  gap: '20px',
                  justifyContent: 'normal',
                  padding: '0 0 10px 0',
                }}
              >
                <div className="form-group mb-0" style={{ width: '90%' }}>
                  <label>
                    Category Icon <span className="required">*</span>
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
                  name="icon"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <div>
                  <img src={imageSrc} style={{ width: '67px', maxHeight: '67px' }} alt="Selected Icon" />
                </div>
              </div>

              {/* Meta Tags Field */}
              <div className="form-group">
                <label>Meta Tags</label>
                <input
                  type="text"
                  placeholder="Enter Meta Tags (separated by commas)"
                  className="col12input"
                  onKeyDown={(e) => handleMetaInputKeyDown(e, 'meta_tags')}
                />
                {productCategoryData.meta_tags.length > 0 && (
                  <div className="tags-container">
                    {productCategoryData.meta_tags.map((tag, index) => (
                      <span key={index} className="tag-block" onClick={(e) => handleRemoveTag(e, 'meta_tags', tag)}>
                        {tag} <i className="fa-solid fa-xmark"></i>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Meta Keywords</label>
                <input
                  type="text"
                  placeholder="Enter Meta Keywords (separated by commas)"
                  className="col12input"
                  onKeyDown={(e) => handleMetaInputKeyDown(e, 'meta_keywords')}
                />
                {productCategoryData.meta_keywords.length > 0 && (
                  <div className="tags-container">
                    {productCategoryData.meta_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="tag-block"
                        onClick={(e) => handleRemoveTag(e, 'meta_keywords', keyword)}
                      >
                        {keyword} <i className="fa-solid fa-xmark"></i>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Canonical URL</label>
                <input
                  type="text"
                  placeholder="Enter Canonical URL"
                  className="col12input"
                  name="canonical_url"
                  value={productCategoryData.canonical_url}
                  onChange={handleInputChange}
                />
              </div>

              <div className="roll-btn">
                <button type="submit" className="primary-btn module-btn" disabled={addbtnLoading}>
                  {editingCategory ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          warnMsg={`Are you sure you want to delete the category <strong>${itemToDelete?.name}</strong>?`}
        />
      </div>
    </>
  );
}

export default ProductCategory;
