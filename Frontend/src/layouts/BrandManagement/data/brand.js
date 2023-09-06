import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/BrandManagement/components/Header";
import PlatformSettings from "layouts/categoryManagement/components/PlatformSettings";
import Footer from "examples/Footer";
import DefaultProjectCard from "layouts/BrandManagement/components/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";


function Brand() {

  const navigate = useNavigate();

  const [brands, setBrand] = useState([]);

  useEffect(() => {
    brandList();
  }, []);

  const brandList = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.get("http://localhost:8000/brand/brandList");
      setBrand(response.data.data);
    } catch (error) {
      if (error.response.status == "401") {
        window.location.href = "authentication/sign-in";
      }
    }
  };


  const handleEdit = (id) => {

    navigate(`/editBrand/${id}`);
  };

  const handleRemove = async (Id) => {
    const confirmed = window.confirm('Are You Sure Want To Delete ?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/brand/deleteBrand/${Id}`);
        console.log('deleted');
        brandList();
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
                Brands
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {brands.map((brand) => (
                <Grid item xs={12} md={6} xl={3} key={brand._id}>
                  <DefaultProjectCard
                    image={`http://localhost:8000/${brand.image.replace(/\\/g, '/')}`}
                    title={brand.brandName}
                    action={{}}
                    authors={[]}
                    onEdit={() => handleEdit(brand._id)}
                    onRemove={() => handleRemove(brand._id)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={6} xl={3}>
                <Link to="/addBrand">
                  <PlaceholderCard title={{ variant: "h5", text: "Add Brand" }} outlined />
                </Link>
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Brand;

