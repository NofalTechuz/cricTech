import React, { useEffect, useState } from 'react';
import Hoc from '../../../../Layouts/admin/Hoc';
import FileInputField from '../../../../modules/Admin/Forms/FileInputField';
import DropdownField from '../../../../modules/Admin/Forms/DropdownField';
import TextInputField from '../../../../modules/Admin/Forms/TextInputField';
import TextareaInput from '../../../../modules/Admin/Forms/TextareaInput';
import NumberInputField from '../../../../modules/Admin/Forms/NumberInputField';
import TagInputField from '../../../../modules/Admin/Forms/TagInputField';
import PublicApiInstance from '../../../../Utils/PublicApiInstance';
import { toast } from 'react-toastify';
import PrivateApiInstance from '../../../../Utils/PrivateApiInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { NormalizeArray } from '../../../../Utils/NormalizeArray';

const EditProduct = () => {
  const { id } = useParams();
  const initialValue = {
    product_name: '',
    brand_name: '',
    product_short_desc: '',
    product_desc: '',
    product_category: '',
    meta_keywords: [],
    original_price: '',
    discount_price: '',
    product_image: '',
    product_link: '',
    rating: 1,
  };
  const [productData, setProductData] = useState(initialValue);
  const [imgFileName, setImgFileName] = useState(null);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [addbtnLoading, setAddbtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // handle File change
  const handleFileChange = (file) => {
    setProductData({ ...productData, product_image: file });
    setImgFileName(file.name);
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    //validation
    console.info(productData.product_category);
    if (productData.product_category === '') {
      toast.error('Please select a category');
      return;
    }
    if (productData.rating < 1 || productData.rating > 10) {
      toast.error('Rating must be between 1 and 10');
      return;
    }
    // if(productData.discount_price > productData.original_price){
    //   toast.error("Discount price must be less than original price");
    //   return;
    // }

    if (
      !productData.product_name ||
      !productData.brand_name ||
      !productData.product_short_desc ||
      !productData.original_price ||
      !productData.discount_price ||
      !productData.product_image ||
      !productData.product_link
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setAddbtnLoading(true);
    try {
      const formData = new FormData();
      formData.append('product_name', productData.product_name);
      formData.append('brand_name', productData.brand_name);
      formData.append('product_short_desc', productData.product_short_desc);
      formData.append('product_desc', productData.product_desc);
      formData.append('product_category', productData.product_category);
      formData.append('meta_keywords', JSON.stringify(productData.meta_keywords));
      formData.append('original_price', productData.original_price);
      formData.append('discount_price', productData.discount_price);
      formData.append('product_image', productData.product_image);
      formData.append('product_link', productData.product_link);
      formData.append('rating', productData.rating);

      await PrivateApiInstance.put(`/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product Added Successfully');
      setAddbtnLoading(false);
      navigate('/admin/products');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      setAddbtnLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await PublicApiInstance.get('/product-category');
      // sort by name
      setCategories(res.data.data.sort((a, b) => a.category_name.localeCompare(b.category_name)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await PublicApiInstance.get(`/product/${id}`);
        setProductData({
          product_name: res.data.data.product_name,
          brand_name: res.data.data.brand_name,
          product_short_desc: res.data.data.product_short_desc,
          product_desc: res.data.data.product_desc,
          product_category: res.data.data.product_category_id,
          original_price: res.data.data.price,
          discount_price: res.data.data.discount,
          product_image: res.data.data.product_image,
          product_link: res.data.data.affiliate_link,
          rating: res.data.data.rating,
          meta_keywords: NormalizeArray(res.data.data.meta_keywords),
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);


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
              <h5>Edit Product</h5>
            </div>
            <div className="roll-btn">
              <button
                type="submit"
                className="primary-btn module-btn"
                disabled={addbtnLoading}
                onClick={handleSubmitData}
              >
                Update Product
              </button>
            </div>
          </div>
          <div className="course-form-container">
            <form>
              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <TextInputField
                    onChange={handleInputChange}
                    value={productData.product_name}
                    label="Product Name"
                    name="product_name"
                    placeholder="Enter Product Name"
                    required
                  />
                </div>
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <TextInputField
                    onChange={handleInputChange}
                    value={productData.brand_name}
                    label="Brand Name"
                    name="brand_name"
                    placeholder="Enter Brand Name"
                    required
                  />
                </div>
              </div>

              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '100%' }}>
                  <TextareaInput
                    label="Short Description"
                    name="product_short_desc"
                    placeholder="Enter Short Description"
                    rows={4}
                    onChange={handleInputChange}
                    value={productData.product_short_desc}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '100%' }}>
                  <TextareaInput
                    label="Long Description"
                    name="product_desc"
                    placeholder="Enter Long Description"
                    rows={10}
                    onChange={handleInputChange}
                    value={productData.product_desc}
                  />
                </div>
              </div>

              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <TextInputField
                    onChange={handleInputChange}
                    value={productData.original_price}
                    label="Original Price"
                    name="original_price"
                    placeholder="Enter Original Price"
                    required
                  />
                </div>
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <TextInputField
                    onChange={handleInputChange}
                    value={productData.discount_price}
                    label="With Discount Price"
                    name="discount_price"
                    placeholder="Enter With Discount Price"
                    required
                  />
                </div>
              </div>

              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <FileInputField
                    label="Product Image"
                    name="product_image"
                    onFileChange={handleFileChange}
                    initialFileName={imgFileName ? imgFileName : productData.product_image}
                    initialImageSrc={`${process.env.REACT_APP_SERVER_ASSETS_URL}/${productData.product_image}`}
                    required={true}
                  />
                </div>
                <div className="form-group mb-0" style={{ width: '48%' }}>
                  <DropdownField
                    label="Select Product Category"
                    name="product_category"
                    options={categories}
                    valueKey="id"
                    labelKey="category_name"
                    onChange={handleInputChange}
                    selectedValue={productData.product_category}
                    required
                  />
                </div>
              </div>
              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '80%' }}>
                  <TextInputField
                    onChange={handleInputChange}
                    value={productData.product_link}
                    label="Product Link"
                    name="product_link"
                    placeholder="Enter Product Link"
                    required
                  />
                </div>
              </div>

              <div className="flex-row">
                <div className="form-group mb-0" style={{ width: '49%' }}>
                  <TagInputField
                    label="Meta Keywords"
                    fieldName="meta_keywords" // Dynamic field name
                    productCategoryData={productData}
                    setProductCategoryData={setProductData}
                  />
                </div>
                <div className="form-group mb-0" style={{ width: '48%' }}>
                  <NumberInputField
                    label="Rating"
                    name="rating"
                    placeholder="Enter Rating"
                    min={1}
                    max={10}
                    value={productData.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default EditProduct;
