import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/categoryManagement/components/Header";
import PlatformSettings from "layouts/categoryManagement/components/PlatformSettings";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";


function Category() {

  const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      categoryList();
     }, []); 

     const categoryList=async()=>{
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios.get("http://localhost:8000/category/categoryList")
      .then((response) => { console.log(response.message);
        if(response.message == "No token provided"){
          window.location.href="login";
        }else{
          setCategories(response.data.data);
        }
        
      })
      .catch((error) => { 
        if(error.response.status == "401"){
          window.location.href="authentication/sign-in";
        }
      });

     }
    
    const handleEdit = (id) => {
     
      navigate(`/editCategory/${id}`);
    };
  
    const handleRemove = async (Id) => {
      const confirmed = window.confirm('Are You Sure Want To Delete ?');
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:8000/category/deleteCategory/${Id}`);
          
          console.log('deleted');
          categoryList();
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    return (
      <DashboardLayout>
        <Header />
  
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Categories
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1}>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={3}>
                {categories.map((category) => (
                  <Grid item xs={12} md={6} xl={3} key={category._id}>
                    <DefaultProjectCard
                      style={{ height: "700px" }}
                      image={`http://localhost:8000/${category.image.replace(/\\/g, '/')}`}
                      
                      title={category.categoryName}
                      // description={category.description}
                      action={{}}
                      authors={[]}
                      onEdit={()=>handleEdit(category._id)}
                      onRemove={() => handleRemove(category._id)}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} md={6} xl={3}>
                  <Link to="/addCategory">
                    <PlaceholderCard title={{ variant: "h5", text: "Add Category" }} outlined />
                  </Link>
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </DashboardLayout>
    );
  }
  
  export default Category;
  
