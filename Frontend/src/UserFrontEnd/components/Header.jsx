import React from 'react';
import Styles from "css/style.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "css/style.css"
import { Dropdown } from 'react-bootstrap';

function Header() {
    const Cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))

    const handleLogoutClick = () => {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userToken');
        window.location.href = '/UserHome'; 
    };

    const renderDropdown = () => {
        if (userProfile) {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <img src={`http://localhost:8000/${userProfile.image}`} alt="User Profile" className={Styles.userImage} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/userProfile">
                            <AccountCircleIcon /> My Account
                        </Dropdown.Item>
                        <Dropdown.Item href="/viewOrder">
                            <i className="fa fa-shopping-bag" /> My Orders
                        </Dropdown.Item>
                        <Dropdown.Item href="/trackOrder">
                            <i className="fa fa-map-marker" /> Track Order
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogoutClick}>
                            <i className="fa fa-sign-out" /> Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        } else {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <a href="#" style={{marginTop:"3px",marginRight:"3px"}}><i className="fa fa-user fa-lg" /> </a>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/UserLogin">
                            <i className="fa fa-sign-in" /> Sign In
                        </Dropdown.Item>
                        <Dropdown.Item href="/UserSignUp">
                            <i className="fa fa-user-plus" /> Create an Account
                        </Dropdown.Item>
                        <Dropdown.Item href="/UserLogin">
                            <i className="fa fa-shopping-bag" /> Your Orders
                        </Dropdown.Item>
                        <Dropdown.Item href="/trackOrder">
                            <i className="fa fa-map-marker" /> Track Order
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        }
    };


    return (
        <header className="header" style={{ backgroundColor: "#fafafa" }}>
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
                                    {renderDropdown()}
                                    <a href="/cart"><i className="fa fa-shopping-cart fa-lg" />  {Cart ? <span className="badge rounded-pill badge-notification bg-danger">{Cart.length}</span> : null}</a>
                                    <a href="/wishlist"><i className="fa fa-heart fa-lg" />  {wishlist ? <span className="badge rounded-pill badge-notification bg-danger">{wishlist.length}</span> : null}</a>
                                </div>
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
