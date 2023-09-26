import axios from 'axios';
import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
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
import { Toaster, toast } from 'react-hot-toast';

function AddUser() {
  const [agreement, setAgreement] = useState(true);
  const handleSetAgreement = () => setAgreement(!agreement);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [exist, setExist] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || mobile === '' || password === '' || !image === '') {
      setFieldRequired(true);
      toast.error('Please enter all fields')
      return;
    }

    const formData = new FormData();
     
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("image", image);

    axios
      .post('http://localhost:8000/user/signUp',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
          window.location.href = '/Users';

      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setExist(true);
          toast.error('User Already Exist')
          if (error.response.status == "401") {
            window.location.href = "authentication/sign-in";
          }
        }
      });
  };

  return (
   
    <BasicLayout
      title="Add User"
      image={curved6}
    >
       <Toaster/>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">

        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
              />
            </SoftBox>
            {/* <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </SoftBox> */}
            {/* <SoftBox mb={2}>
              <SoftInput
                type="text"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
              />
            </SoftBox> */}
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                placeholder="Image"
              />
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
                Add
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

export default AddUser;
