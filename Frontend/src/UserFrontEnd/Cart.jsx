import React, { useState } from 'react';
import Styles from "../css/style.module.css";
import Header from "UserFrontEnd/components/Header";
import Footer from "UserFrontEnd/components/Footer";
import { Icon } from '@mui/material';
import HeroBg from "assets/images/breadcrumb-bg.jpg"

function Cart() {
    const initialCart =JSON.parse(localStorage.getItem("cart")) || [];
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
     const continueShoping =()=>{
        window.location.href="/product"
     };
     const openCheckout =()=>{
        window.location.href="/checkout"
     }

    return (
        <div className={Styles.home}>
            <Header />
            <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
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
            </div>
            <div className={Styles.wishcontainer}>
                {/* <h1 className={Styles.carthead}>My Cart</h1> */}
                <div className={Styles.cart}>
                    <table>
                        <tbody>
                            <tr className={Styles.tableheading}>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            {cartItems.map((item,index) => (
                                <tr key={index} className={Styles.cartitem}>
                                    <td className={Styles.productdetails}>
                                        <img src={item.image} alt="Product" />
                                        <div className={Styles.itemname}>{item.productname}</div>
                                    </td>
                                    <td className={Styles.itemprice}>{item.price}</td>
                                    <td>
                                        <div className={Styles.quantityControl}>
                                            <button
                                                className={Styles.quantityBtn}
                                                onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min={1}
                                                className={Styles.itemquantity}
                                                onChange={(e) => handleUpdateQuantity(index, e.target.value)}
                                            />
                                            <button
                                                className={Styles.quantityBtn}
                                                onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className={Styles.itemtotal}>{item.price * item.quantity}</td>
                                    <td className={Styles.removebtntd}>
                                        <button className={Styles.removebtn}
                                          onClick={() => handleRemoveItem(index)}
                                         >
                                            Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={Styles.cartsummary}>
                        <button className={Styles.continueshoppingbtn} onClick={continueShoping}>Continue Shopping</button>
                        <div className={Styles.total}>Cart Total: ${calculateCartTotal()}</div>
                        <button className={Styles.checkoutbtn} onClick={openCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart;
