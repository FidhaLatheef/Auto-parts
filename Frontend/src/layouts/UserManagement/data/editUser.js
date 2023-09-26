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

function EditUser() {
  const [agreement, setAgreement] = useState(true);
  const handleSetAgreement = () => setAgreement(!agreement);

  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    image:''
  });

  // const [nameError, setNameError] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [mobileError, setMobileError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [locationError, setLocationError] = useState('');
  // const [roleError, setRoleError] = useState('');
  // const [imageError, setImageError] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/getUserById/${id}`);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.log('Error fetching user:', error);
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      image: file
    });
  }
  const handleForm = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('mobile', user.mobile);
      formData.append('password', user.password);
      formData.append('image', user.image);

     axios.put(`http://localhost:8000/user/editUser/${id}`,formData, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      })     .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log('User updated successfully');
    window.location.href = '/Users';
  } catch (error) {
    console.log('Error updating user:', error);
  }
  };

  return (
    <BasicLayout
      title="Edit User"
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
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
              />
              {/* {nameError && <SoftTypography variant="body2" color="error">{nameError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {/* {emailError && <SoftTypography variant="body2" color="error">{emailError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
              {/* {mobileError && <SoftTypography variant="body2" color="error">{mobileError}</SoftTypography>} */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {/* {passwordError && <SoftTypography variant="body2" color="error">{passwordError}</SoftTypography>} */}
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


export default EditUser;
