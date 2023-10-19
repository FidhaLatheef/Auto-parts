import React from 'react';
import Styles from "css/style.module.css";
import Logo from "assets/images/log.jpg";
import { Image, Row } from 'react-bootstrap';
import { Icon } from '@mui/material';
import heart from 'assets/images/logos/heart.jpg'
import cart from 'assets/images/logos/cart.jpg'
// import Styles from "css/style.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "css/style.css"
import { ShoppingBag } from '@mui/icons-material';
import { Favorite } from '@material-ui/icons';

function Header() {
    const Cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))

    return (
        <header className="header" style={{backgroundColor:"#fafafa"}}>
            <div className="header__top">
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <a className="navbar-brand" href="/UserHome">
                                <span style={{ fontWeight: 'bold', color: 'black', fontSize: "25px" }}>Auto</span>
                                <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "27px" }}>Parts</span>
                            </a>

                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="header__nav">
                            <nav className="header__menu">
                                <ul>
                                    <li ><a href="/UserHome">Home</a></li>
                                    <li><a href="/product">Products</a></li>
                                    <li><a href="/about">About Us</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                    {/* <li><a href="./blog.html">Blog</a></li> */}
                                </ul>
                            </nav>
                            <div className="header__nav__widget">
                                <div className="header__nav__widget__btn">
                                    {userProfile ? (
                                        <a href="/userProfile">
                                            <img src={`http://localhost:8000/${userProfile.image}`} alt="User Profile" className={Styles.userImage} />
                                        </a>
                                    ) : (
                                        <a style={{ fontSize: '25px' }}
                                            href="/UserLogin"><AccountCircleIcon /></a>
                                    )}
                                     <a  href='/wishlist'> <Favorite /> {wishlist ? <span className={Styles.notificationBadge}>{wishlist.length}</span> : null}</a>
                                </div>
                                <div className="header__nav__widget__btn">
                                <a style={{ fontSize: '25px' }} href="/cart"> <ShoppingBag /> {Cart ? <span className={Styles.notificationBadges}>{Cart.length}</span> : null}</a>
                                </div>
                                {/* <a href="#" className="primary-btn">Add Car</a> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <span className="fa fa-bars" />
                </div>
            </div>
        </header>

    );
}

export default Header;
