import React, { useState } from 'react'
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import { Row } from 'react-bootstrap'
import HeroBg from "assets/images/breadcrumb-bg.jpg"

function Wishlist() {
  const initialWish =JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlisttItems, setWishlistItems] = useState(initialWish);
  
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === product._id);

    if (!isProductInCart) {
        const cartItem = {
            id: product._id,
            productname: product.productName,
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
    <div>
      <Header />
      <div className={`${Styles.breadcrumboption} ${Styles.setbg}`} style={{ backgroundImage: `url(${HeroBg})` }}>
        <div className="col-lg-12 text-center">
          <div className={Styles.breadcrumb__text}>
            <h2>Wishlist</h2>
          </div>
        </div>
      </div>
      {/*Product listing start*/}
      <section className={`${Styles.productListing} ${Styles.spad}`}>
        <div >
          <Row className="row">
            {wishlisttItems              
              .map((item,index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className={Styles.car__item}>
                    <div className={Styles.car__item__pic__slider}>
                      <img src={item.image} alt={item.productname} style={{ height: "auto" }} />
                    </div>
                    <div className={Styles.productButtons}>
                    <button
                                className={`${Styles.cartBtn} ${Styles.productBtn}`}
                                onClick={() => handleAddToCart(item)}
                              >
                                <i className="material-icons">shopping_cart</i>
                              </button>
                              <button
                                className={`${Styles.cartBtn} ${Styles.productBtn}`}
                                onClick={() => handleRemoveWishlist(index)}
                              >
                                <i className="material-icons">favorite</i>
                              </button>
                    </div>
                    <div className={Styles.car__item__text}>
                      <div className={Styles.car__item__text__inner}>
                        <h4>{item.productname}</h4>
                        <p className={Styles.productPrice}>{item.price}</p>
                        <p>{item.description}</p>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Row>
        </div>

      </section>
      {/*Product listing End*/}
      <Footer />
    </div>
  )
}

export default Wishlist
