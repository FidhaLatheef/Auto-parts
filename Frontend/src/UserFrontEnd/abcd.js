/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import bgImage from "assets/images/bg-profile.jpeg";
// Data
// import authorsTableData from "layouts/coupon/data/authorsTableData";
import MDButton from "components/MDButton";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "css/style.module.css";
import { Col, Row } from "react-bootstrap";
import { Icon } from "@mui/material";
// import { useNavigate } from "react-router-dom";

function Order() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/admin/listorder").then((response) => {
      setOrders(response.data.data);
      console.log("jiiiiiii", response.data.data);
      const initialStatuses = response.data.data.map((order) => order.status);
      setStatus(initialStatuses);
    });
  }, []);

  const handleStatusUpdate = (id) => {
    const index = orders.findIndex((order) => order._id === id);
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
      .post(http://localhost:8000/admin/addstatus/${id}, data)
      .then((response) => {
        console.log(response.data);
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    const index = orders.findIndex((order) => order._id === id);
    const updatedStatuses = [...status];
    updatedStatuses[index] = newStatus;
    console.log("hiii", updatedStatuses[index]);
    setStatus(updatedStatuses[index]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const viewOrder = (id) => {
    console.log("View button clicked for order ID:", id);
    const selectedProduct = orders.find((item) => item._id === id);
    setSelectedOrder(selectedProduct);
    console.log(selectedProduct);
    handleOpen();
  };
  const parseOrderId = (orderid) => {
    if (orderid) {
      const dateTimePart = orderid.split("-")[0];
      const year = dateTimePart.substring(0, 4);
      const month = dateTimePart.substring(4, 6);
      const day = dateTimePart.substring(6, 8);
      const hours = dateTimePart.substring(8, 10);
      const minutes = dateTimePart.substring(10, 12);
      const seconds = dateTimePart.substring(12, 14);

      const invoiceNumber = orderid.split("-")[1];

      const invoiceDate = ${year}-${month}-${day};
      const invoiceTime = ${hours}:${minutes}:${seconds};
      return {
        invoiceNumber,
        invoiceDate,
        invoiceTime,
      };
    } else {
      return {
        invoiceNumber: "",
        invoiceDate: "",
        invoiceTime: "",
      };
    }
  };
  const handleDialogClose = () => {
    // Reload the page when the dialog is closed
    window.location.reload();
  };

  return (
    <DashboardLayout image={bgImage}>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          borderRadius="lg"
          style={{ backgroundColor: "#a8729a" }}
        >
          <MDTypography variant="h6" color="white">
            Order Management
          </MDTypography>
        </MDBox>
        {/* <br /> */}
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <section>
                <div className="container py-2 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100 w-100">
                    <div className="col-lg-13 col-xl-15">
                      <div className="card" style={{ borderRadius: 10, width: "1190px" }}>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th style={{ color: "#a8729a" }}>Date</th>
                              <th style={{ color: "#a8729a" }}>Order ID</th>
                              <th style={{ color: "#a8729a" }}>User Name</th>
                              <th style={{ color: "#a8729a" }}>No. of Items</th>
                              <th style={{ color: "#a8729a" }}>Qty</th>
                              <th style={{ color: "#a8729a" }}>Total Amount</th>
                              <th style={{ color: "#a8729a" }}>Action</th>
                              {/* <th style={{ color: "#a8729a" }}>Status</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, index) => (
                              <tr key={order._id}>
                                <td>{parseOrderId(order.orderId).invoiceDate}</td>
                                <td>{order.orderId}</td>
                                <td>
                                  {order.billingDetails.firstName} {order.billingDetails.lastName}
                                </td>
                                <td>{order.cartItems.length}</td>
                                <td>
                                  {order.cartItems.reduce(
                                    (totalQuantity, item) => totalQuantity + item.quantity,
                                    0
                                  )}
                                </td>
                                <td>
                                  ₹{" "}
                                  {order.cartItems.reduce(
                                    (totalPrice, item) => totalPrice + item.offerprice,
                                    0
                                  )}
                                </td>
                                <td>
                                  <button
                                    style={{ backgroundColor: "#a8729a", color: "white" }}
                                    className="btn"
                                    onClick={() => viewOrder(order._id)}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Card>
          </Grid>
        </Grid>
        <br />
      </MDBox>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-12">
              <div className="card" style={{ borderRadius: 10 }}>
                {selectedOrder && (
                  <>
                    <div className="card-header px-6 py-2">
                      <h5 className="text-muted mb-0">
                        Order from {selectedOrder.billingDetails.firstName}{" "}
                        {selectedOrder.billingDetails.lastName},
                        <span style={{ color: "#a8729a" }}>
                          {/* {userDetails.firstname} {userDetails.lastname} */}
                        </span>
                        {/* ! */}
                      </h5>
                    </div>
                    <div className="card-body p-2">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                          Order Id
                        </p>
                        <p className="small text-muted mb-0">{selectedOrder.orderId}</p>
                      </div>
                      {selectedOrder.cartItems.map((item, index, pr) => (
                        <div key={index} className="card shadow-0 border mb-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-2">
                                <img
                                  src={item.image}
                                  className="img-fluid"
                                  alt={item.productName}
                                />
                              </div>
                              <div className="col-3 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">{item.productName}</p>
                              </div>
                              <div className="col-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                              </div>
                              <div className="col-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">₹ {item.offerprice}</p>
                              </div>
                              <div className="col-3 text-center d-flex justify-content-center align-items-center">
                                <select
                                  value={status[pr]}
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
                                <button
                                  style={{ backgroundColor: "#a8729a", color: "white" }}
                                  className="btn"
                                  onClick={() => handleStatusUpdate(item.id)}
                                >
                                  <Icon>
                                    <span className="material-symbols-sharp">done_outline</span>
                                  </Icon>
                                </button>
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
                                      {selectedOrder.billingDetails.firstName}{" "}
                                      {selectedOrder.billingDetails.lastName}
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
                                      Phone : {selectedOrder.billingDetails.phone}
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
                                      {selectedOrder.shippingDetails.firstName}{" "}
                                      {selectedOrder.shippingDetails.lastName}
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
                                      Phone : {selectedOrder.shippingDetails.phone}
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
                      <div className="d-flex justify-content-between pt">
                        <p className="text-muted mb-0">
                          Invoice Number : {parseOrderId(selectedOrder.orderId).invoiceNumber}
                        </p>
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4">Product Total</span>
                          {selectedOrder.subtotal}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          Order Date : {parseOrderId(selectedOrder.orderId).invoiceDate}
                        </p>
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4">Discount</span>
                          {selectedOrder.discountAmount}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <p className="text-muted mb-0">
                          Order Time : {parseOrderId(selectedOrder.orderId).invoiceTime}
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
                        backgroundColor: "#a8729a",
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
    </DashboardLayout>
  );
}

export default Order;