import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import { Icon } from '@mui/material';
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
// import Modal from 'react-modal';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import tick from "../assets/images/tick.png"
import gif from "assets/images/tigif.gif"

// Modal.setAppElement('#root');

function Invoice() {
  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    orderList();
  }, []);

  const orderList = async () => {
    try {
      const orderId = location.state.orderId;
      const response = await axios.get(`http://localhost:8000/user/orderListById/${orderId}`);
      const data = await response.data;
      if (data.status === "success") {
        setOrder(data.data);
      } else {
        console.log("Error in setOrderData");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "authentication/sign-in";
      }
    }
  };

  const handleProceedClick = () => {
    // Show the modal
    setShowModal(true);
  };

  const handleorder = () => {
    window.location.href = "/viewOrder"
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };
  const continueshopping = () => {
    window.location.href = "/product"
  };

  useEffect(() => {
    console.log(order);
  }, [order]); // Watch the 'order' state

  return (
    <div className={Styles.home}>
      <Header />
      {/* <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Invoice</h2>
                <div className="breadcrumb__links">
                  <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                    house
                  </span></Icon> Home -</a>
                  <span>Invoice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <h3 style={{ marginTop: "20px" }} className='text-center text-muted pb-4' >INVOICE</h3>
      <div className="card">

        <div className="card-body">
          {order && (
            <div className="container mb-5 mt-3">
              <div className="row d-flex align-items-baseline">
                <div className="col-xl-9">
                  <ul className="list-unstyled">
                    <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }} /> <span className="fw-bold">Order ID:</span> {order.orderId}</li>
                    <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }} /> <span className="fw-bold">Order Date: </span>{new Date().toLocaleDateString()}</li>
                    {/* <li className="text-muted"><i className="fas fa-circle" style={{color: '#84B0CA'}} /> <span className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                  Unpaid</span></li> */}
                  </ul>
                </div>
                <div className="col-xl-3 float-end">
                  {/* <a className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i className="fas fa-print text-primary" /> Print</a>
                <a className="btn btn-light text-capitalize" data-mdb-ripple-color="dark"><i className="far fa-file-pdf text-danger" /> Export</a> */}
                </div>
                <hr />
              </div>

              <div className="container">
                <div className="col-md-12">
                  <div className="text-center">
                    {/* <h1 className="text-muted">INVOICE</h1> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li className="text-muted">From: <span style={{ color: '#5d9fc5' }}> {order.billingDetails.name}</span></li>
                      <li className="text-muted">{order.billingDetails.address1}, {order.billingDetails.address2}</li>
                      <li className="text-muted">{order.billingDetails.state}</li>
                      <li className="text-muted">{order.billingDetails.email}</li>
                      <li className="text-muted"><i className="fas fa-phone" /> {order.billingDetails.mobile}</li>
                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <ul className="list-unstyled">
                      <li className="text-muted">To: <span style={{ color: '#5d9fc5' }}> {order.shippingDetails.name}</span></li>
                      <li className="text-muted">{order.shippingDetails.address1}, {order.shippingDetails.address2}</li>
                      <li className="text-muted">{order.shippingDetails.state}</li>
                      <li className="text-muted">{order.shippingDetails.email}</li>
                      <li className="text-muted"><i className="fas fa-phone" /> {order.shippingDetails.mobile}</li>
                    </ul>
                  </div>

                </div>

                <div className="row my-2 mx-1 justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        {/* <th scope="col">Unit Price</th> */}
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItem.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.productname}</td>
                          <td>{item.quantity}</td>
                          {/* <td>$200</td> */}
                          <td>{item.price}</td>
                        </tr>

                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    {/* <p className="ms-3">Add additional notes and payment information</p> */}
                  </div>
                  <div className="col-xl-3">
                    {/* <ul className="list-unstyled">
                    <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>$1110</li>
                    <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Tax(15%)</span>$111</li>
                  </ul> */}
                    <p className="text-black float-start"><span className="text-black me-3"> Total Amount:</span><span style={{ color: "#ad1111", fontSize: 25 }}>₹{order.total}</span></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-10">
                    {/* <p>Thank you for your purchase</p> */}
                  </div>
                  <div className="col-xl-2">
                    <button type="button" onClick={handleProceedClick} className="ripple ripple-surface ripple-surface-light btn btn-primary btn-primary" > Proceed</button>
                    <Modal isOpen={showModal} toggle={closeModal} className={Styles.modal}>
                      <ModalHeader toggle={closeModal} className="text-right" >
                      </ModalHeader>
                      <ModalBody>
                        <img src={gif} alt="Thank you for your purchase" style={{ width: "500px", height: "350px" }} />
                        <h3 style={{ color: "#4b93a3", fontWeight: 'bold', marginLeft: "10px" }}>Thank you for your purchase..!</h3>
                        <p>You will receive an order confirmation email with details of your order and a link to track its progress.
                          All necessary information about the delivery, we sent to your email</p>
                      </ModalBody>
                      <ModalFooter className="justify-content-center">
                        {localStorage.getItem('userToken') && (
                          <button className="ripple ripple-surface ripple-surface-light btn btn-primary btn-primary" onClick={handleorder}>
                            View Order
                          </button>
                        )}
                        <button style={{ marginLeft: "35px" }} className="ripple ripple-surface ripple-surface-light btn btn-primary " onClick={continueshopping}>
                          Continue shopping
                        </button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}

    </div>
  )
}

export default Invoice
