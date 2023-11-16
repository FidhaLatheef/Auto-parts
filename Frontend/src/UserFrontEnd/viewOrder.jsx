import React, { useEffect, useState } from 'react'
import "css/order.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import axios from 'axios'
import orderemty from "assets/images/cartempty.png"

function viewOrder() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"))
  const [orders, setOrder] = useState([]);
  console.log(orders, "666666666666666")
  useEffect(() => {
    orderList();
  }, []);

  const formatDate = (orderId) => {
    const year = orderId.slice(0, 4);
    const month = orderId.slice(4, 6);
    const day = orderId.slice(6, 8);
  
    // Convert month from numeric to string (assuming 01 is January, 02 is February, etc.)
    const monthString = new Date(`${year}-${month}-01`).toLocaleString('en-US', { month: 'long' });
  
    return `${monthString}, ${day}, ${year}`;
  };

  const orderList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/orderListByUserId/${userProfile.id}`);
      const data = await response.data;
      if (Array.isArray(data.data)) {
        setOrder(data.data);

        console.log(data.data, "fffff")
      } else {
        setOrder([data.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "authentication/sign-in";
      }
    }
  };
  return (

    <div >

      <Header />
      <h3 className='text-center text-muted pb-2 mt-3' >Order Details</h3>
      {orders.length === 0 ? (
        <div className="text-center mb-5">
          <img src={orderemty} alt="No Orders Image" />
          <p>Ooops</p>
                  <span style={{ fontWeight: 'bold', color: 'black', fontSize: "25px" }}>No Orders </span>
                  <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "27px" }}> Available..!!!</span>
        </div>
      ) : (
      <div className='row'>
        
      {orders.map((order, index) => (
          <div className="col-lg-12 " key={index}>
            <div className="d-flex flex-column justify-content-center align-items-center" id="order-heading">
              <div className="h4">{formatDate(order.orderId)}</div>
              <div className="pt-1">
                <p>Order ID :  {order.orderId}</p>
              </div>
            </div>
            <div   style={{ height: '700px',  }} className="wrapper bg-white">
              <div className="row my-2 mx-1 justify-content-center ">
                <table className="table table-striped table-borderless pb-2 mt-3 ">
                  <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                    <tr>
                      <th >#</th>
                      <th >Item</th>
                      <th >Quantity</th>
                      {/* <th scope="col">Unit Price</th> */}
                      <th >Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItem.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productname}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-2 border-bottom mb-3" />
              <div className="d-flex justify-content-between align-items-center pl-3 pr-3">
                <div className="text-muted">Payment Method</div>
                <div className="ml-auto">  <label>COD</label> </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-1 pl-3">
                <div className="text-muted">Shipping</div>
                <div className="ml-auto"> <label>Free</label> </div>
              </div>
              <div className="d-flex justify-content-between align-items-center  pb-4 pl-3 border-bottom">
              </div>
              <div className="d-flex justify-content-between align-items-center pl-3 py-3 mb-4 border-bottom">
                <div className="text-muted"> Total </div>
                <div className="ml-auto h5 text-danger">₹{order.total} </div>
              </div>
              <div className="row border rounded p-1 my-3">
                <div className="col-md-6 py-3">
                  <div className="d-flex flex-column align-items start"> <b>Billing Address</b>
                    <p className="text-justify pt-2">{order.billingDetails.name}</p>
                    <p className="text-justify">{order.billingDetails.address1}, {order.billingDetails.address2}</p>
                    <p className="text-justify">{order.billingDetails.state}</p>
                    <p className="text-justify">{order.billingDetails.email}</p>
                    <p className="text-justify">{order.billingDetails.mobile}</p>
                  </div>
                </div>
                <div className="col-md-6 py-3">
                  <div className="d-flex flex-column align-items start"> <b>Shipping Address</b>
                    <p className="text-justify pt-2">{order.shippingDetails.name}</p>
                    <p className="text-justify">{order.shippingDetails.address1}, {order.shippingDetails.address2}</p>
                    <p className="text-justify">{order.shippingDetails.state}</p>
                    <p className="text-justify">{order.shippingDetails.email}</p>
                    <p className="text-justify">{order.shippingDetails.mobile}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       ))}
      </div>
        )}
      <Footer />
    </div>
  )
}

export default viewOrder
