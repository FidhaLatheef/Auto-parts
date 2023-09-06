import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Socials from 'layouts/authentication/components/Socials';
import Separator from 'layouts/authentication/components/Separator';
import curved6 from "assets/images/curved-images/skyblue.jpg";

function AddBrand() {
  const [brandName, setBrandName] = useState('');
  const [image, setImage] = useState(null);
  const [fieldRequired, setFieldRequired] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    if (brandName === '' || !image) {
      setFieldRequired(true);
      return;
    }

    const formData = new FormData();
    formData.append('brandName', brandName);
    formData.append('image', image);

    axios
      .post('http://localhost:8000/brand/addBrand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response.data);
        window.location.href = '/brandManagement';
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <BasicLayout title="Add Brand" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftTypography variant="h6" fontWeight="medium">
                Brand Name :
              </SoftTypography>
              <SoftInput
                type="text"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand Name"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="h6" fontWeight="medium">
                Image :
              </SoftTypography>
              <SoftInput
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
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
                Add
              </SoftButton>
            </SoftBox>
            {fieldRequired && (
              <SoftTypography
                variant="body2"
                color="error"
                textAlign="center"
                mt={2}
              >
                Please enter all the fields
              </SoftTypography>
            )}
            <SoftBox mt={3} textAlign="center">
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default AddBrand;
