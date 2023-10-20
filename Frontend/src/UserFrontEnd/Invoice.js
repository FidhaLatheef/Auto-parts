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


function Invoice() {
  const [order, setOrder] = useState(null);
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
  const continueShoping =()=>{
    window.location.href="/product"
 };

  useEffect(() => {
    // Log the order data here
    console.log(order);
  }, [order]); // Watch the 'order' state

  return (
    <div className={Styles.home}>
       <Header />
       <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
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
            </div>
      <div className="container" style={{marginTop:"20px"}}>
        <div className="row">
          <div className="col-12">
            <div className="card" style={{border:"none"}}>
              {order && (
              <div className="card-body p-0">
                <div className="row p-5" style={{backgroundColor:"#e8eaed",borderRadius:"5px",boxShadow:"60px"}}>
                  <div className="col-md-6 text-right">
                    <h3 className="font-weight-bold mb-1">INVOICE</h3>
                    <p className="text-muted">Order ID : {order.orderId}</p>
                    <p className="text-muted">Order Date : {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <hr className="my-5" />

                <div className="row pb-5 p-5">
                  
                    <div className="col-md-6">

                      <h3 className="font-weight-bold mb-4">Billing Details</h3>
                      <p className="mb-1"> {order.billingDetails.name}</p>
                      <p>{order.billingDetails.country}</p>
                      <p className="mb-1"> {order.billingDetails.address1}, {order.billingDetails.address2}</p>
                      <p className="mb-1">{order.billingDetails.city}</p>
                      <p className="mb-1">{order.billingDetails.state}</p>
                      <p className="mb-1">{order.billingDetails.postcode}</p>
                      <p className="mb-1">{order.billingDetails.mobile}</p>
                      <p className="mb-1">{order.billingDetails.email}</p>

                    </div>
                 
                  
                  <div  className="col-md-6 text-right">
                    <h3 className="font-weight-bold mb-4">Shipping Details</h3>
                    <p className="mb-1"> {order.shippingDetails.name}</p>
                    <p> {order.shippingDetails.country}</p>
                    <p className="mb-1"> {order.shippingDetails.address1}, {order.shippingDetails.address2}</p>
                    <p className="mb-1">{order.shippingDetails.city}</p>
                    <p className="mb-1">{order.shippingDetails.state}</p>
                    <p className="mb-1">{order.shippingDetails.postcode}</p>
                    <p className="mb-1">{order.shippingDetails.mobile}</p>
                    <p className="mb-1">{order.shippingDetails.email}</p>
                  </div>
             
                </div>
                
                <div className="row p-5">
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-0 text-uppercase small font-weight-bold">ID</th>
                          <th className="border-0 text-uppercase small font-weight-bold">Item</th>
                          {/* <th className="border-0 text-uppercase small font-weight-bold">Description</th> */}
                          <th className="border-0 text-uppercase small font-weight-bold">Quantity</th>
                          {/* <th className="border-0 text-uppercase small font-weight-bold">Unit Cost</th> */}
                          <th className="border-0 text-uppercase small font-weight-bold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                      {order.cartItem.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.productname}</td>
                          {/* <td>LTS Versions</td> */}
                          <td>{item.quantity}</td>
                          {/* <td>$321</td> */}
                          <td>{item.price}</td>
                        </tr>
                         ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Total amount</div>
                    <div className="h2 font-weight-light">${order.total}</div>
                  </div>
                  <div className="py-3 px-5 text-left">
                      {/* <Link to="/UserHome" className="btn btn-secondary">Back to Home</Link> */}
                      <button style={{marginRight:"500px",marginTop:"15px",backgroundColor:"#cdd1ce",color:"#252626"}} className={Styles.continueshoppingbtn} onClick={continueShoping}>Continue Shopping</button>
                    </div>
                </div>
              </div>
               )}
            </div>
          </div>
        </div>
        <div className="text-light mt-5 mb-5 text-center small">by : <a className="text-light" target="_blank" rel="noreferrer" href="http://totoprayogo.com">totoprayogo.com</a></div>

      </div>
      <Footer/>

    </div>
  )
}

export default Invoice
