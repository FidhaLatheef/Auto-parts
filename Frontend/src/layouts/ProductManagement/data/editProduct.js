import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import { useParams } from 'react-router-dom';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Socials from 'layouts/authentication/components/Socials';
import Separator from 'layouts/authentication/components/Separator';
import curved6 from "assets/images/curved-images/skyblue.jpg";
import { MenuItem, Select } from '@mui/material';
import { InputLabel } from '@mui/material';

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    brandName: '',
    modelName: '',
    categoryName: '',
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    categoriesList();
    brandsList();
  }, []);

  const categoriesList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category/categoryList");
      setCategoryList(response.data.data);
    } catch (error) {
      console.log("Error fetching category list:", error);
    }
  };

  const brandsList = async () => {
    try {
      
      const response = await axios.get("http://localhost:8000/brand/brandList");
      setBrandList(response.data.data);
    } catch (error) {
      console.log("Error fetching brand list:", error);
    }
  };

  const fetchProduct = useCallback(async () => {
    try {
      let response = await axios.get(`http://localhost:8000/product/getProductById/${id}`);
      const data = response.data;
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: files,
    }));

    const previewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewImages);
  };

  const handleForm = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!product.productName || product.productName.trim() === '') {
      newErrors.productName = 'Product Name cannot be empty';
    }

    if (!product.modelName || product.modelName.trim() === '') {
      newErrors.modelName = 'Model Name cannot be empty';
    }

    if (!product.description || product.description.trim() === '') {
      newErrors.description = 'Description cannot be empty';
    }

    if (!product.price || product.price.toString().trim() === '') {
      newErrors.price = 'Price cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('brandName', product.brandName);
      formData.append('modelName', product.modelName);
      formData.append('categoryName', product.categoryName);
      for (let i = 0; i < product.images.length; i++) {
        formData.append('images', product.images[i]);
      }

      axios.put(`http://localhost:8000/product/editProduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log('Product updated successfully');
      window.location.href = '/productManagement';
    } catch (error) {
      console.log('Error updating Product:', error);
    }
  };

  return (
    <BasicLayout
      title="Edit Product"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          {/* Additional content */}
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <InputLabel id="category-label">Product Name</InputLabel>
              <SoftInput
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Product Name"
              />
              {errors.productName && <SoftTypography variant="body2" color="error">{errors.productName}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Model Name</InputLabel>
              <SoftInput
                type="text"
                name="modelName"
                value={product.modelName}
                onChange={handleChange}
                placeholder="Model Name"
              />
              {errors.modelName && <SoftTypography variant="body2" color="error">{errors.modelName}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Description</InputLabel>
              <SoftInput
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Description"
              />
              {errors.description && <SoftTypography variant="body2" color="error">{errors.description}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Price</InputLabel>
              <SoftInput
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
              />
              {errors.price && <SoftTypography variant="body2" color="error">{errors.price}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={product.categoryName}
                onChange={handleChange}
                variant="standard"
                fullWidth
              >
                <MenuItem>
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
                value={product.brandName}
                onChange={handleChange}
                variant="standard"
                fullWidth
              >
                <MenuItem>
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
                onChange={handleImageChange}
                placeholder="Images"
                multiple
              />
              {previewImages.map((previewImage, index) => (
                <div key={index}>
                  <img
                    key={index}
                    src={previewImage}
                    alt={`Preview ${index + 1}`}
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
                Edit
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              {/* Additional content */}
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default EditProduct;
