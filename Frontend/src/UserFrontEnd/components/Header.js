import React from 'react';
import Styles from "css/style.module.css";
import Logo from "assets/images/log.jpg";
import { Row } from 'react-bootstrap';
import { Icon } from '@mui/material';

function Header() {
    return (
        <header className={Styles.header}>
        <div className={Styles.navcontainer}>
            <Row className="row">
                <div className="col-lg-2">
                    <div className={Styles.header__logo}>
                        <a href="/userHome"><img src={Logo} alt /></a>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className={Styles.header__nav}>
                        <nav className={Styles.header__menu}>
                            <ul>
                                <li className={Styles.active}><a href="/userHome">Home</a></li>
                                <li><a href="/product">Products</a></li>
                                {/* <li><a href="./blog.html">Blog</a></li> */}
                                <li><a href="#">Pages</a>
                                    <ul className={Styles.dropdown}>
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="./car-details.html">Car Details</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </nav>
                        <div className={Styles.header__nav__widget}>
                            <div className={Styles.header__nav__widget__btn}>
                                <a href='#'><Icon> <span className="material-symbols-outlined">
                                    search
                                </span></Icon></a>
                                <a href='/wishlist'><Icon> <span className="material-symbols-outlined">
                                    favorite
                                </span></Icon></a>
                                <a href="/cart"><Icon><span className="material-symbols-outlined">
                                    shopping_cart
                                </span></Icon></a>
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
