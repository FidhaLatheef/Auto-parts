import React, { useState } from 'react';
import Styles from "../css/style.module.css";
import Header from "UserFrontEnd/components/Header";
import Footer from "UserFrontEnd/components/Footer";
import { Icon } from '@mui/material';
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import cartempty from "assets/images/cart1-crop.png"

function Cart() {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cartItems, setCartItems] = useState(initialCart);

    const handleUpdateQuantity = (index, newQuantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (index) => {
        alert('Are you sure want to remove this item??')
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const calculateCartTotal = () => {
        let total = 0;
        for (const item of cartItems) {
            total += item.price * item.quantity;
        }
        return total;
    };
    const continueShoping = () => {
        window.location.href = "/product"
    };
    const openCheckout = () => {
        window.location.href = "/checkout"
    }

    return (
        <div className={Styles.home}>
            <Header />
            {/* <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Cart</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="h-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100 py-5">
                    <h3 className='text-center text-muted pb-4' >CART</h3>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            {cartItems.length === 0 ? (
                                <div className="text-center">
                                    <img src={cartempty} alt="Empty Wishlist" />
                                    <p>Ooops `_`</p>
                                    <span style={{ fontWeight: 'bold', color: 'black', fontSize: "20px" }}>Your Cart is </span>
                                    <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "25px" }}> Empty..!!!</span>
                                </div>
                            ) : (
                                <>
                                    {/* Mapping through and rendering cart items */}
                                    {cartItems.map((item, index) => (
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
                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                        <button className="btn btn-link px-2" onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}>
                                                            <i className="fas fa-minus" />
                                                        </button>
                                                        <input id="form1" value={item.quantity} min={1} name="quantity" onChange={(e) => handleUpdateQuantity(index, e.target.value)} type="number" className="form-control form-control-sm" />
                                                        <button className="btn btn-link px-2" onClick={() => handleUpdateQuantity(index, item.quantity + 1)}>
                                                            <i className="fas fa-plus" />
                                                        </button>
                                                    </div>
                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h5 className="mb-0">₹{item.price * item.quantity}</h5>
                                                    </div>
                                                    <div onClick={() => handleRemoveItem(index)} className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg" /></a>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="card mb-4">
                                        <div className="card-body p-4 d-flex flex-row d-flex justify-content-center gap-3 mb-3">
                                            <div onClick={continueShoping} className="form-outline flex-fill">
                                                <KeyboardBackspaceIcon />
                                                <label className="form-label" htmlFor="form1">Continue Shopping</label>
                                            </div>
                                            <div>
                                                <label className="form-label" htmlFor="form1">CartTotal:<strong style={{ color: "#cf4249" }}>{calculateCartTotal()}</strong></label>
                                            </div>
                                            <button onClick={openCheckout} type="button" className="btn btn-primary "> Checkout</button>

                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </div>
    )
}

export default Cart;
