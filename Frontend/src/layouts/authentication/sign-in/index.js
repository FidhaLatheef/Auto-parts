/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-69.jpg";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'

function SignIn() {

  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [fieldRequired,setFieldRequired]=useState(false);

  const handleForm=(e)=>{
    e.preventDefault();

    if(email===''||password===''){
      setFieldRequired(true);
      toast.error("Please enter all fields");
      return;
    }

    const data={
      email:email,
      password:password
    };

    axios
    .post('http://localhost:8000/admin/Login',data)
    .then(function(response){
      
      if(response.data.fieldRequired){
      }else{
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('adminProfile',JSON.stringify(response.data.adminProfile));
        window.location.href='/dashboard'
      }
    })
    .catch(function(error){
      console.log(error);
      if(error.response && error.response.status===400){
        toast.error("Please enter valid credentials") 
       
      }
      
    })


  }

  return (
    <>
    <Toaster/>
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>

            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput 
          type="email"
          name='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}         
          placeholder="Email" />
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput 
          type="password"
          name='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
          placeholder="Password" />
        </SoftBox>

        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
          {/* {fieldRequired && (
              <SoftTypography
                variant="body2"
                color="error"
                textAlign="center"
                mt={2}
              >
                Please enter all the fields
              </SoftTypography>
            )} */}
               {/* {invalid && (
              <SoftTypography
                variant="body2"
                color="error"
                textAlign="center"
                mt={2}
              >
                {invalid}
              </SoftTypography>
            )} */}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={handleForm} variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
    </>
  );
}

export default SignIn;
