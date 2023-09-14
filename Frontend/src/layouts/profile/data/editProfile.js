import axios from 'axios';
import { useState, useEffect } from 'react';
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

function EditProfile() {
    const fetchadminProfile=JSON.parse(localStorage.getItem("adminProfile"))
    const [adminProfile, setAdminProfile]=useState(fetchadminProfile)  
  const [agreement, setAgreement] = useState(true);
  const handleSetAgreement = () => setAgreement(!agreement);

  const { id } = useParams();

  const handleChange = (e) => {
    setAdminProfile({
      ...adminProfile,
      [e.target.name]: e.target.value,
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdminProfile({
      ...adminProfile,
      image: file
    });
  }
  const handleForm = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();
      formData.append('name', adminProfile.name);
      formData.append('email', adminProfile.email);
      formData.append('mobile', adminProfile.mobile);
      // formData.append('password', adminProfile.password);
      formData.append('location', adminProfile.location);
      formData.append('role', adminProfile.role);
      formData.append('image', adminProfile.image);

     axios.put(`http://localhost:8000/admin/editProfile/${id}`,formData, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })     .then(function (response) {
        console.log('hiiiiiiiii')
        // setAdminProfile(response.data.adminProfile);
        // console.log(response.data.adminProfile,'adminProfile')
        localStorage.setItem('adminProfile',JSON.stringify(response.data.adminProfile));
        // localStorage.setItem('adminProfile',response.data.adminProfile);
      })
      .catch(function (error) {
        console.log(error,"errrrr")
        console.log(error);
      });

    // console.log('Admin updated successfully');
    
    window.location.href = '/profile';
  } catch (error) {
    console.log('Error updating admin:', error);
  }
  };

  return (
    <BasicLayout
      title="Edit Admin"
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
                name="name"
                value={adminProfile.name}
                onChange={handleChange}
                placeholder="Name"
              />
              {/* {nameError && <SoftTypography variant="body2" color="error">{nameError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                name="email"
                value={adminProfile.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {/* {emailError && <SoftTypography variant="body2" color="error">{emailError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                name="mobile"
                value={adminProfile.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
              {/* {mobileError && <SoftTypography variant="body2" color="error">{mobileError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="location"
                value={adminProfile.location}
                onChange={handleChange}
                placeholder="Location"
              />
              {/* {locationError && <SoftTypography variant="body2" color="error">{locationError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="role"
                value={adminProfile.role}
                onChange={handleChange}
                placeholder="Role"
              />
              {/* {roleError && <SoftTypography variant="body2" color="error">{roleError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                name="image"
                onChange={handleImageChange}
                placeholder="Password"
              />
              {/* {passwordError && <SoftTypography variant="body2" color="error">{passwordError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
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
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
 }


export default EditProfile;
