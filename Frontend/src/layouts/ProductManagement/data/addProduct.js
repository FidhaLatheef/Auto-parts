import axios from 'axios';
import { useState, useEffect } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Select from "@mui/material/Select";
import Checkbox from '@mui/material/Checkbox';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Socials from 'layouts/authentication/components/Socials';
import Separator from 'layouts/authentication/components/Separator';

// Images
import curved6 from "assets/images/curved-images/skyblue.jpg";
import { InputLabel, MenuItem } from '@mui/material';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([])
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fieldRequired, setFieldRequired] = useState(false);

  useEffect(() => {
    categoriesList();
    brandsList();
  }, []);

  const categoriesList = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.get("http://localhost:8000/category/categoryList");
      setCategoryList(response.data.data);
    } catch (error) {
      console.log("Error fetching category list:", error);
    }
  };

  const brandsList = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.get("http://localhost:8000/brand/brandList");
      setBrandList(response.data.data);
    } catch (error) {
      console.log("Error fetching brand list:", error);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();

    if (productName === '' || description === '' || price === '' || modelName === '' ||
      brandName === '' || categoryName === '' || images === '') {
      setFieldRequired('Please enter all fields');
      return;
    }


    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('brandName', brandName);
    formData.append('modelName', modelName);
    formData.append('categoryName', categoryName);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    axios
      .post('http://localhost:8000/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response.data);
        window.location.href = '/productManagement';
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const selectedPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(selectedPreviews);
  };


  return (
    <BasicLayout
      title="Add Product"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <InputLabel id="category-label">Product Name</InputLabel>
              <SoftInput
                type="text"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Model Name</InputLabel>
              <SoftInput
                type="text"
                name="modelName"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Model Name"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Description</InputLabel>
              <SoftInput
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Price</InputLabel>
              <SoftInput
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem >
                  Select a category
                </MenuItem>
                {categoryList.map((category) => (
                  <MenuItem key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>

            <SoftBox mb={2}>
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem >
                  Select a brand
                </MenuItem>
                {brandList.map((brand) => (
                  <MenuItem key={brand._id} value={brand.brandName}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="h6" fontWeight="medium">
                Image :
              </SoftTypography>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleImage}
                placeholder="Images"
                multiple
              />
              {imagePreviews.map((previewUrl, index) => (
                <div key={index}>
                  <img
                    src={previewUrl}
                    alt={`Image Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                  />
                </div>
              ))}
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                onClick={handleForm}
                variant="gradient"
                color="secondary"
                fullWidth
              >
                Add
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              {fieldRequired && <SoftTypography variant="body2" color="error">{fieldRequired}</SoftTypography>}
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default AddProduct;
