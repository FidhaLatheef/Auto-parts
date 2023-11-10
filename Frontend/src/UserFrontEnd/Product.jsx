import React, { useState, useEffect } from 'react';
import Styles from '../css/style.module.css';
import Header from 'UserFrontEnd/components/Header';
import Footer from 'UserFrontEnd/components/Footer';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import HeroBg from 'assets/images/breadcrumb-bg.jpg';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

function Product() {
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
    <div className={Styles.home}>
      <Header />
      <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Products</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>Products</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      {/* Car Section Begin */}
      <section className={`${Styles.car} ${Styles.spad}`}>
        <div className={Styles.carcontainer}>
          <Row className="row">
            <div className="col-lg-3">
              <div className={Styles.car__sidebar}>
                <div className={Styles.car__search}>
                  <h5> Search</h5>
                  <form action="#">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button type="submit">
                      <i className="material-icons">search</i>
                    </button>
                  </form>
                </div>
                <div className={Styles.car__filter}>
                  <h5> Filter</h5>
                  <form action="#">
                    <select value={selectedBrand} onChange={handleBrandChange}>
                      <option value="">Select Brand</option>
                      {brandList.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.brandName}
                        </option>
                      ))}
                    </select>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                      <option value="">Select Category</option>
                      {categoryList.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    <div className={Styles.car__filter__btn}>
                      <button type="submit" className={Styles.sitebtn} onClick={handleResetFilter}>
                        Reset Filter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className={Styles.car__filter__option}>
                <div className="row">
                  <div className="col-lg-6 col-md-6"></div>
                  <div className="col-lg-6 col-md-6">
                    <div className={`${Styles.car__filter__option__item} ${Styles.car__filter__option__itemright}`}>
                      <h5>Sort By</h5>
                      <select value={sortOrder} onChange={handleSortChange}>
                        <option value="dsc">Price: Highest Fist</option>
                        <option value="asc">Price: Lowest Fist</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product listing start */}
              <section className={`${Styles.productListing} ${Styles.spad}`} >
              <div className={Styles.cardcontainer}>
                  <Row className="row">
                    {/* {currentProducts.map((product) => (
                      <Link to={`/productDetails/${product._id}`} key={product._id} className="col-lg-3">
                        <div className={Styles.car__item}>
                          <div className={Styles.car__item__pic__slider}>
                            <img
                              src={`http://localhost:8000/${product.images[0]}`}
                              alt={`Product: ${product.productName}`}
                              style={{ height: '250px' }}
                            />
                          </div>
                          <div className={Styles.productButtons}>

                            <button className={`${Styles.cartBtn} ${Styles.productBtn}`} onClick={() => handleAddToCart(product)}>
                              <i className="material-icons">shopping_cart</i>
                            </button>
                            <button className={`${Styles.cartBtn} ${Styles.productBtn}`} onClick={() => handleAddToWishlist(product)}>
                              <i className="material-icons">favorite</i>
                            </button>
                          </div>
                          <div className={Styles.car__item__text}>
                            <div className={Styles.car__item__text__inner}>
                              <h4>{product.productName}</h4>
                              <p className={Styles.productPrice}>{product.price}</p>
                              <p style={{ maxWidth: "700px" }}>
                                {product.description}
                              </p>

                            </div>
                          </div>
                        </div>
                      </Link>
                    ))} */}
                     {currentProducts.map((product) => (
                   <Link to={`/productDetails/${product._id}`} key={product._id} className="col-lg-3">
                    <div className="card" style={{height:"100%"}} >

                    <img className="card-img-top" src={`http://localhost:8000/${product.images[0]}`}
                      alt={`Product: ${product.productName}`} />
                    <div className="card-body">
                      {/* <h5 className="card-title">Card title</h5> */}
                      <div className={Styles.productButtons}>

                        <button className={`${Styles.cartBtn} ${Styles.productBtn}`} onClick={() => handleAddToCart(product)}>
                          <i className="material-icons">shopping_cart</i>
                        </button>
                        <button className={`${Styles.cartBtn} ${Styles.productBtn}`} onClick={() => handleAddToWishlist(product)}>
                          <i className="material-icons">favorite</i>
                        </button>
                      </div>

                      <h4>{product.productName}</h4>
                      <p  className={Styles.productPrice}>{product.price}</p>
                      <p className="card-text">{product.description}</p>
                      
                      {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                    
                  </div>
                  </Link>
                ))}
                  </Row>
                </div>
               
              </section>
              {/* Product listing End */}
              <div className={Styles.pagination__option}>
                {pageNumbers.map((pageNumber) => (
                  <a
                    key={pageNumber}
                    href="#"
                    className={pageNumber === currentPage ? 'active' : ''}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                ))}
              </div>
            </div>
          </Row>
        </div>
      </section>
      {/* Car Section End */}
      <Footer />
    </div>
  );
}

export default Product;
