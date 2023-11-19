import React from 'react';
// import "css/style.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Styles from "css/style.module.css";
import { Dropdown } from 'react-bootstrap';

function ProductDetails() {
  const Cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const userProfile = JSON.parse(localStorage.getItem("userProfile"))

  const renderDropdown = () => {
    if (userProfile) {
      return (
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <img src={`http://localhost:8000/${userProfile.image}`} alt="User Profile" className={Styles.userImage} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/my-account">
              <AccountCircleIcon /> My Account
            </Dropdown.Item>
            <Dropdown.Item href="/my-orders">
              <i className="fa fa-shopping-bag" /> My Orders
            </Dropdown.Item>
            <Dropdown.Item href="/track-order">
              <i className="fa fa-map-marker" /> Track Order
            </Dropdown.Item>
            <Dropdown.Item href="/logout">
              <i className="fa fa-sign-out" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <AccountCircleIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/sign-in">
              <i className="fa fa-sign-in" /> Sign In
            </Dropdown.Item>
            <Dropdown.Item href="/create-account">
              <i className="fa fa-user-plus" /> Create an Account
            </Dropdown.Item>
            <Dropdown.Item href="/your-orders">
              <i className="fa fa-shopping-bag" /> Your Orders
            </Dropdown.Item>
            <Dropdown.Item href="/track-order">
              <i className="fa fa-map-marker" /> Track Order
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };


  return (
    <div >
{/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* Container wrapper */}
  <div className="container-fluid">
    {/* Toggle button */}
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars" />
    </button>
    {/* Collapsible wrapper */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* Navbar brand */}
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height={15} alt="MDB Logo" loading="lazy" />
      </a>
      {/* Left links */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Team</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Projects</a>
        </li>
      </ul>
      {/* Left links */}
    </div>
    {/* Collapsible wrapper */}
    {/* Right elements */}
    <div className="d-flex align-items-center">
      {/* Icon */}
      <a className="text-reset me-3" href="#">
        <i className="fas fa-shopping-cart" />
      </a>
      {/* Notifications */}
      <div className="dropdown">
        <a className="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-bell" />
          <span className="badge rounded-pill badge-notification bg-danger">1</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <a className="dropdown-item" href="#">Some news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Another news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
      {/* Avatar */}
      <div className="dropdown">
        <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
        </a>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
          <li>
            <a className="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
    {/* Right elements */}
  </div>
  {/* Container wrapper */}
</nav>
{/* Navbar */}


    </div>
  );
}

export default ProductDetails;
