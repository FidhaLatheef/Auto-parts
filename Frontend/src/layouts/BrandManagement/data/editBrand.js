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
  const [brand, setBrand] = useState({
    brandName: '',
    image: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const fetchBrand = useCallback(async () => {
    try {
      let response = await axios.get(`http://localhost:8000/brand/getBrandById/${id}`);
      const data = response.data;
      console.log(data);
      setBrand(data);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        window.location.href = "authentication/sign-in";
      }
    }
  }, [id]);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  const handleChange = (e) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBrand({
      ...brand,
      image: file
    });
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (!brand.brandName || brand.brandName.trim() === '') {
      setErrorMessage('Brand name cannot be empty');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('brandName', brand.brandName);
      formData.append('image', brand.image);

      axios.put(`http://localhost:8000/brand/editBrand/${id}`, formData, {
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

      console.log('Brand updated successfully');
      window.location.href = '/brandManagement';
    } catch (error) {
      console.log('Error updating Brand:', error);
    }
  };


  return (
    <BasicLayout
      title="Edit Brand"
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
                name="brandName"
                value={brand.brandName}
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
