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
import curved6 from 'assets/images/curved-images/curved149.jpg';

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const handleSetAgreement = () => setAgreement(!agreement);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [exist,setExist]=useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || mobile === '' || password === '') {
      setFieldRequired(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };

    axios
      .post('http://localhost:8000/admin/signUp', data)
      .then(function (response) {
        if (response.data.fieldRequired) {
          setFieldRequired(true);
        } else {
          window.location.href='/authentication/sign-in';        
        }
      })
      .catch(function (error) {
        console.log(error);
        if(error.response && error.response.status===400){
          setExist("Admin already exists");
        }
      });
  
  };

  return (
    <BasicLayout
      title="Welcome!"
      // description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
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
                type='number'
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
             {exist && (
              <SoftTypography
                variant="body2"
                color="error"
                textAlign="center"
                mt={2}
              >
                {exist}
              </SoftTypography>
            )}
            <SoftBox mt={4} mb={1}>
              <SoftButton
                onClick={handleForm}
                variant="gradient"
                color="dark"
                fullWidth
              >
                Sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
