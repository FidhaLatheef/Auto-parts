import React, { useState } from 'react'
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import { Row } from 'react-bootstrap'
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import { Icon } from '@mui/material'
import emptyWishlistImage from "assets/images/emwish.png"

function Wishlist() {
  const initialWish = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlisttItems, setWishlistItems] = useState(initialWish);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      const cartItem = {
        id: product.id,
        productname: product.productname,
        image: product.image,
        price: product.price,
        quantity: 1,
      };

      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert('Product added to the cart !!')

      window.location.href = "/cart";
    } else {
      alert('Product is already in the cart');
    }
  };

  const handleRemoveWishlist = (index) => {
    alert('Are you sure want to remove this item??')
    const updatedWish = [...wishlisttItems];
    updatedWish.splice(index, 1);
    setWishlistItems(updatedWish);
    localStorage.setItem("wishlist", JSON.stringify(updatedWish));
  };
  return (
    <div className={Styles.home}>
      <Header />
      {/* <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Wishlist</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>Wishlist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      {/*Product listing start*/}
      <section className="h-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100 py-5">
          <h3 className='text-center text-muted pb-4' >WISHLIST</h3>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              {wishlisttItems.length === 0 ? (
                <div className="text-center">
                  <img src={emptyWishlistImage} alt="Empty Wishlist" />
                  <p>Ooops</p>
                  <span style={{ fontWeight: 'bold', color: 'black', fontSize: "25px" }}>Your wishlist is </span>
                  <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "27px" }}> Empty..!!!</span>
                </div>
              ) : (
                wishlisttItems
                  .map((item, index) => (
                    <div key={index} className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={item.image} alt="Cotton T-shirt" />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{item.productname}</p>
                            <p><span className="text-muted">Price: </span>₹{item.price} </p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <button className="ripple ripple-surface ripple-surface-light btn btn-primary btn-danger ms-1" role="button" onClick={() => handleAddToCart(item)}>Add to Cart</button>

                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <button className="ripple ripple-surface btn btn-primary btn-warning" role="button" onClick={() => handleRemoveWishlist(index)}>Remove Wishlist</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}

            </div>
          </div>
        </div>
      </section>
      {/*Product listing End*/}
      {/* <Footer /> */}
    </div>
  )
}

export default Wishlist
