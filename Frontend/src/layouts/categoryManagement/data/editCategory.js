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

function EditCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState({
    categoryName: '',
    image: ''
  });
  const [errorMessage, setErrorMessage] = useState('');


  const fetchCategory = useCallback(async () => {
    try {
      let response = await axios.get(`http://localhost:8000/category/getCategoryById/${id}`);
      const data = response.data;
      console.log(data);
      setCategory(data);
      
    } catch (err) {
      console.log(err);
      
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({
      ...category,
      image: file
    });
    // setImageUrl(URL.createObjectURL(file));
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (!category.categoryName || category.categoryName.trim() === '') {
      setErrorMessage('Category name cannot be empty');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('categoryName', category.categoryName);
      formData.append('image', category.image);

      axios.put(`http://localhost:8000/category/editCategory/${id}`, formData, {
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

      console.log('Category updated successfully');
      window.location.href = '/categoryManagement';
    } catch (error) {
      console.log('Error updating category:', error);
    }
  };


  return (
    <BasicLayout
      title="Edit Category"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">

        </SoftBox>

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="categoryName"
                value={category.categoryName}
                onChange={handleChange}
                placeholder="Name"
              />
              {errorMessage && <SoftTypography variant="body2" color="error">{errorMessage}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                name="image"
                id='image'
                onChange={handleImageChange}
                placeholder="Image"
              />
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
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default EditCategory;
