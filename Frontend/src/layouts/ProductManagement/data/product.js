import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftAvatar from 'components/SoftAvatar';
import SoftButton from 'components/SoftButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get("http://localhost:8000/product/productList")
      .then((response) => {
        setProducts(response.data);

      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });

  }


  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/product/deleteProduct/${id}`
        );
        console.log('Deleted');
        fetchProducts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCreate = () => {
    window.location.href = '/addProduct';
  };

  const columns = [
    { name: 'productName', align: 'left' },
    { name: 'images', align: 'left' },
    { name: 'price', align: 'left' },
    { name: 'description', align: 'left' },
    { name: 'action', align: 'center' },
  ];

  const rows = products.map((product) => ({
    productName: product.productName,
    images: (
      <SoftBox>
        <SoftAvatar
          src={`http://localhost:8000/${product.images[0]}`}
          alt={product.productName}
          size="xxl"
          variant="rounded"
        />
      </SoftBox>
    ),

    price: product.price,
    description: product.description,
    action: (
      <SoftBox display="flex" justifyContent="center">
        <SoftButton
          color="info"
          size="small"
          component={Link}
          to={`/editProduct/${product._id}`}
          style={{ marginRight: '8px' }}
        >
          Edit
        </SoftButton>

        <SoftButton
          color="secondary"
          size="small"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p={3}
      >
        <SoftButton variant="gradient" color="info" onClick={handleCreate}>
          Add Product
        </SoftButton>
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{ backgroundColor: '#74c3ed' }}
            >
              <SoftTypography variant="h6">Products</SoftTypography>
            </SoftBox>
          </Card>
          <br></br>
          <SoftBox
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Products;
