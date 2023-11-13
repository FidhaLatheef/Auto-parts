import React, { useState, useEffect } from 'react';
import Styles from '../css/style.module.css';
import Header from 'UserFrontEnd/components/Header';
import Footer from 'UserFrontEnd/components/Footer';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import HeroBg from 'assets/images/breadcrumb-bg.jpg';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

function prof() {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  useEffect(() => {
    fetchProducts();
    categoriesList();
    brandsList();
  }, []);

  const categoriesList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/categoryList');
      setCategoryList(response.data.data);
    } catch (error) {
      console.log('Error fetching category list:', error);
    }
  };

  const brandsList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/brandList');
      setBrandList(response.data.data);
    } catch (error) {
      console.log('Error fetching brand list:', error);
    }
  };
  const fetchProducts = async () => {
    axios
      .get('http://localhost:8000/user/productList')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = 'authentication/sign-in';
        }
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleResetFilter = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchQuery('');
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductInCart = existingCart.some((item) => item.id === product._id);

    if (!isProductInCart) {
      const cartItem = {
        id: product._id,
        productname: product.productName,
        image: `http://localhost:8000/${product.images[0]}`,
        price: product.price,
        quantity: 1,
      };

      existingCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert('Product added to the cart !!');

      window.location.href = '/cart';
    } else {
      alert('Product is already in the cart');
    }
  };

  const handleAddToWishlist = (product) => {
    const existingWish = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWish = existingWish.some((item) => item.id === product._id);

    if (!isProductInWish) {
      const wishlistItem = {
        id: product._id,
        productname: product.productName,
        image: `http://localhost:8000/${product.images[0]}`,
        price: product.price,
        quantity: 1,
      };

      existingWish.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(existingWish));
      alert('Product added to the wishlist !!');

      window.location.href = '/wishlist';
    } else {
      alert('Product is already in the wishlist');
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.categoryName !== selectedCategory) {
        return false;
      }
      if (selectedBrand && product.brandName !== selectedBrand) {
        return false;
      }
      if (
        searchQuery &&
        !(
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 mb-3">
          <div className="row">
            {currentProducts.map((product) => (
              <div className="col-md-6 col-lg-4 mb-4" key={product._id}>
                <Link to={`/productDetails/${product._id}`} key={product._id} className="col-lg-3">
                  <div className="card">
                    <img src={`http://localhost:8000/${product.images[0]}`} style={{ height: '280px' }} className="card-img-top" alt="Gaming Laptop" />
                    <div className="card-body text-center" style={{ height: '280px', overflow: 'hidden' }}>
                      <h5 style={{ height: '20px' }}>{product.productName}</h5>
                      <h5 className="text-danger mb-3">₹{product.price}</h5>
                      <p className="small " style={{ height: '50px', overflow: 'hidden' }}>
                        <a href="#!" className="text-muted">
                          {product.description}
                        </a>
                      </p>
                      <div className="text-warning mb-3">
                        <i className="fa fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </div>
                      <div className="d-flex justify-content-center gap-3 ">
                        <a
                          href="#"
                          onClick={() => handleAddToCart(product)}
                          className="ripple ripple-surface btn btn-primary btn-warning"
                        >
                          Add To Cart
                        </a>
                        <a href="#" 
                        onClick={() => handleAddToWishlist(product)}
                        className="ripple ripple-surface btn btn-primary btn-primary "
                        >
                          Add To Wishlist
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default prof
