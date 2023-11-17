/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftButton from "components/SoftButton";
import { Dialog, DialogTitle, Icon, TableContainer, TableRow } from "@mui/material";
import { DialogContent } from "@material-ui/core";
import { Col, Row, Table } from "react-bootstrap";


function data() {
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrderLists();
  }, []);

  const fetchOrderLists = async () => {
    axios.get("http://localhost:8000/user/orderLists")
      .then((response) => {
        setOrder(response.data);
        console.log("ggggggggg", response.data)
        const initialStatuses = response.data.map((order) => order.status);
        setStatus(initialStatuses);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });
  }

  const Date = ({ date }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {date}
      </SoftTypography>
    </SoftBox>
  );

  const OrderID = ({ orderId }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {orderId}
      </SoftTypography>
    </SoftBox>
  );
  const Name = ({ name }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {name}
      </SoftTypography>
    </SoftBox>
  );
  const Items = ({ items }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {items}
      </SoftTypography>
    </SoftBox>
  );

  const Quantity = ({ quantity }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {quantity}
      </SoftTypography>
    </SoftBox>
  );
  const Total = ({ total }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {total}
      </SoftTypography>
    </SoftBox>
  );
  const DateFromOrderId = (orderId) => {
    if (orderId) {
      const year = orderId.substring(0, 4);
      const month = orderId.substring(4, 6);
      const day = orderId.substring(6, 8);
      const hours = orderId.substring(8, 10);
      const minutes = orderId.substring(10, 12);
      const seconds = orderId.substring(12, 14);

      const invoiceDate = `${day}-${month}-${year}`;
      const invoiceTime = `${hours}:${minutes}:${seconds}`;
      return {
        invoiceDate,
        invoiceTime,
      };
    }

    else {
      return {
        invoiceNumber: "",
        invoiceDate: "",
        invoiceTime: "",
      };
    }
  };
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const viewOrder = (id) => {
    console.log("View button clicked for order ID:", id);
    const selectedProduct = order.find((item) => item._id === id);
    setSelectedOrder(selectedProduct);
    console.log(selectedProduct);
    handleOpen();
  };

  const handleStatusChange = (id, newStatus) => {
    const index = order.findIndex((order) => order._id === id);
    const updatedStatuses = [...status];
    updatedStatuses[index] = newStatus;
    console.log("hiii", updatedStatuses[index]);
    setStatus(updatedStatuses[index]);
  };

  const handleStatusUpdate = (id) => {
    const orderId = selectedOrder.orderId;
    console.log(orderId);
    const orderStatus = status;
    console.log(orderStatus);
    const data = {
      status: orderStatus,
      orderId,
    };
    console.log(data);
    axios
      .post(`http://localhost:8000/user/orderStatus/${id}`, data)
      .then((response) => {
        console.log(response.data);
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  return {

    columns: [
      { name: "date", align: "left" },
      { name: "orderId", align: "left" },
      { name: "name", align: "left" },
      { name: "items", align: "center" },
      { name: "quantity", align: "center" },
      { name: "total", align: "center" },
      { name: "action", align: "center" },
    ],

    rows: order.map((item) => ({
      date: <Date date={DateFromOrderId(item.orderId).invoiceDate} />,
      orderId: <OrderID orderId={item.orderId} />,
      name: <Name name={item.billingDetails.name} />,
      items: <Items items={item.cartItem.length} />,
      quantity: (
        <Quantity
          quantity={
            item.cartItem.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)
          }
        />
      ),
      total: <Total total={item.total} />,
      action: (
        <SoftBox>
          <SoftButton size="small"
            onClick={() => viewOrder(item._id)}
            style={{ marginRight: '8px', backgroundColor: "#636362", color: "white" }}>
            View
          </SoftButton>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: '100%', // Adjust the width to your desired value
                maxWidth: '100%', // Remove the maximum width restriction if needed
              },
            }}
          >
            <div className="container h-100" style={{ marginTop: "20px", marginBottom: "20px" }}>
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-12">
                  <div className="card" style={{ borderRadius: 10 }}>
                    {selectedOrder && (
                      <>
                        <div className="card-header px-6 py-2">
                          <h5 className="text-muted mb-0">
                            Order from {selectedOrder.billingDetails.name}{" "}
                            ,
                            <span style={{ color: "#a8729a" }}>
                            </span>
                            {/* ! */}
                          </h5>
                        </div>
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <p className="lead fw-normal mb-0" style={{ color: "#636362" }}>
                              Order ID
                            </p>
                            <p className="small text-muted mb-0">{selectedOrder.orderId}</p>
                          </div>
                          {selectedOrder.cartItem.map((item, index, pr) => (
                            <div key={index} className="card shadow-0 border mb-2">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-2">
                                    <img
                                      src={item.image}
                                      className="img-fluid"
                                      alt={item.productname}
                                    />
                                  </div>
                                  <div className="col-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0">{item.productname}</p>
                                  </div>
                                  <div className="col-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="col-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">₹ {item.price}</p>
                                  </div>
                                  <div className="col-4  d-flex justify-content-between align-items-center">
                                    <p className="text-muted mb-0 small">Status: </p> <select
                                      value={status[pr]}
                                      style={{ borderRadius: "30px" }}
                                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    >
                                      <option value={item.status}>{item.status}</option>
                                      <option value="Order Received">Order Received</option>
                                      <option value="Packed">Packed</option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Out for Delivery">Out for Delivery</option>
                                      <option value="Delivered">Delivered</option>
                                      <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <a onClick={() => handleStatusUpdate(item.id)} 
                                    className="ripple ripple-surface btn btn-primary"> 
                                    <i className="fa fa-check fa-lg" />  </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <Row>
                            <Col className="col-6">
                              <div className="d-flex justify-content-between pt">
                                <div className="card shadow-0 border mb-2">
                                  <p className="fw-bold mb-0">Billing Details</p>
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-35">
                                        <p className="text-muted mb-0">
                                          {selectedOrder.billingDetails.name}{" "}
                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.billingDetails.address1}
                                          {", "}
                                          {selectedOrder.billingDetails.address2}
                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.billingDetails.country}
                                          {", "}
                                          {selectedOrder.billingDetails.state}
                                          {", "}
                                          {selectedOrder.billingDetails.city}
                                        </p>
                                        <p className="text-muted mb-0">
                                          PIN : {selectedOrder.billingDetails.postcode}
                                        </p>
                                        <p className="text-muted mb-0">
                                          Phone : {selectedOrder.billingDetails.mobile}
                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.billingDetails.email}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col className="col-6">
                              <div className="d-flex justify-content-between pt">
                                <div className="card shadow-0 border mb-2">
                                  <p className="fw-bold mb-0">Shipping Details</p>
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-35">
                                        <p className="text-muted mb-0">
                                          {selectedOrder.shippingDetails.name}{" "}

                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.shippingDetails.address1}
                                          {", "}
                                          {selectedOrder.shippingDetails.address2}
                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.shippingDetails.country}
                                          {", "}
                                          {selectedOrder.shippingDetails.state}
                                          {", "}
                                          {selectedOrder.shippingDetails.city}
                                        </p>
                                        <p className="text-muted mb-0">
                                          PIN : {selectedOrder.shippingDetails.postcode}
                                        </p>
                                        <p className="text-muted mb-0">
                                          Phone : {selectedOrder.shippingDetails.mobile}
                                        </p>
                                        <p className="text-muted mb-0">
                                          {selectedOrder.shippingDetails.email}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-between pt">
                            <p className="fw-bold mb-0">Order Details</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="text-muted mb-0">
                              Order Date : {DateFromOrderId(selectedOrder.orderId).invoiceDate}
                            </p>

                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <p className="text-muted mb-0">
                              Order Time : {DateFromOrderId(selectedOrder.orderId).invoiceTime}
                            </p>
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-4">Total</span>
                              {selectedOrder.total}
                            </p>
                          </div>
                        </div>
                        <div
                          className="card-footer border-0 px-4 py-2"
                          style={{
                            backgroundColor: "#294f99",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                        >
                          <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                            Total Amount: <span className="h2 mb-0 ms-2">₹ {selectedOrder.total}</span>
                          </h5>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>



          </Dialog>

        </SoftBox>
      ),

    })),
  };

}


export default data;
