import React from 'react';
import Styles from "css/style.module.css";
import Logo from "assets/images/log.jpg";
import { Image, Row } from 'react-bootstrap';
import { Icon } from '@mui/material';
import heart from 'assets/images/logos/heart.jpg'
import cart from 'assets/images/logos/cart.jpg'

function Header() {
    const Cart =JSON.parse(localStorage.getItem("cart")) || [];
    // const [cartItems, setCartItems] = useState(initialCart);
    const wishlist =JSON.parse(localStorage.getItem("wishlist")) || [];
    // const [wishlist, setCartItems] = useState(initialCart);
    return (
        <header className={Styles.header}>
        <div className={Styles.navcontainer}>
            <Row className="row">
                <div className="col-lg-2">
                    <div className={Styles.header__logo}>
                        <a href="/UserHome"><img src={Logo} alt /></a>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className={Styles.header__nav}>
                        <nav className={Styles.header__menu}>
                            <ul>
                                <li className={Styles.active}><a href="/UserHome">Home</a></li>
                                <li><a href="/product">Products</a></li>
                                {/* <li><a href="./blog.html">Blog</a></li> */}
                                {/* <li><a href="#">Pages</a>
                                    <ul className={Styles.dropdown}>
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="./car-details.html">Car Details</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li> */}
                                <li><a href="/about">About</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </nav>
                        <div className={Styles.header__nav__widget}>
                            <div className={Styles.header__nav__widget__btn}>
                                
                                <a href='/wishlist'><Image src={heart}/>{wishlist ? <span>{wishlist.length}</span> : null}</a>
                            </div>
                            <div className={Styles.header__nav__widget__btn}>
                                <a href="/cart"><Image src={cart}/>{Cart ? <span>{Cart.length}</span> : null}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
        
    </header>
    );
}

export default Header;
