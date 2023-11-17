import axios from 'axios';
import Header from 'UserFrontEnd/components/Header';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function OrderSummary() {

    const [order, setOrderDetails] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        fetchOrderDetails()

    }, [])
    const fetchOrderDetails = async () => {

        try {
            const response = await axios.get(`http://localhost:8000/user/orderListById/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.data.data) {
                const data = response.data.data
                console.log(data)
                setOrderDetails(data);
            } else {
                console.error('Failed to fetch order details');
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };
    return (
        <div>
            <Header />
            <div >
                <h3 className='text-center text-muted pb-0 mt-4' >ORDER DETAILS</h3>
                <section className="h-100 gradient-custom" style={{ marginLeft: "-221px", width: "103%" }}>
                    <div className="container py-4 h-100 "  >
                        <div className="row d-flex justify-content-center align-items-center h-100" style={{ width: "130%" }}  >
                            <div className="col-lg-10 col-xl-8">
                                {order && (
                                    <div className="card" style={{ borderRadius: 10 }}>
                                        <div className="card-header px-4 py-5">
                                            <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: '#c92014' }}> {order.billingDetails.name}</span>!</h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="lead fw-normal mb-0" style={{ color: '#616662' }}>Order Summary</p>
                                                <p className="small text-muted mb-0">Order ID : {order.orderId}</p>
                                            </div>
                                            {order.cartItem.map((item, index) => (
                                                <div key={index} className="card shadow-0 border mb-4">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <img src={item.image} className="img-fluid" alt="Phone" />
                                                            </div>
                                                            <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0">{item.productname}</p>
                                                            </div>
                                                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                                                            </div>
                                                            <div className="col-md-2 d-flex justify-content-end align-items-center">
                                                                <p className="text-muted mb-0 small">₹{item.price}</p>
                                                            </div>
                                                        </div>
                                                        <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                                        <div className="row d-flex align-items-center" style={{ width: "100%" }}>
                                                            <div className="col-md-2">
                                                                <p className="text-muted mb-0 small">Track Order</p>
                                                            </div>
                                                            <div className="col-md-10">
                                                                <div className="progress" style={{ height: 6, borderRadius: 16 }}>
                                                                    {item.status === 'Order Received' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '10%', borderRadius: 16, backgroundColor: '#f54550' }}
                                                                            aria-valuenow={10}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                    {item.status === 'Packed' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '27%', borderRadius: 16, backgroundColor: '#f72f3c' }}
                                                                            aria-valuenow={27}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                    {item.status === 'Shipped' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '45%', borderRadius: 16, backgroundColor: '#c2131f' }}
                                                                            aria-valuenow={45}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                    {item.status === 'Out for Delivery' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '60%', borderRadius: 16, backgroundColor: '#a10a14' }}
                                                                            aria-valuenow={45}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                    {item.status === 'Delivered' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '78%', borderRadius: 16, backgroundColor: '#6b2025' }}
                                                                            aria-valuenow={45}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                    {item.status === 'Cancelled' && (
                                                                        <div
                                                                            className="progress-bar"
                                                                            role="progressbar"
                                                                            style={{ width: '100%', borderRadius: 16, backgroundColor: '#f20515' }}
                                                                            aria-valuenow={100}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    )}
                                                                </div>
                                                                {item.status !== 'Cancelled' && (
                                                                    <div className="d-flex justify-content-around mb-1">
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Order Received</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Packed</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Shipped</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for Delivery</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Cancelled</p>
                                                                    </div>
                                                                )}
                                                                {item.status === 'Cancelled' && (
                                                                    <div className="d-flex justify-content-end mb-1">
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Cancelled</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="fw-bold mb-0">Order Details</p>
                                                {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p> */}
                                            </div>
                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="text-muted mb-0">Order ID : {order.orderId}</p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Total Amount:</span><span style={{ color: "#c92014", fontSize: 25 }}>₹{order.total}</span></p>

                                                {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> $19.00</p> */}
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <p className="text-muted mb-0">Order Date :{new Date().toLocaleDateString()}</p>
                                                {/* <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p> */}
                                            </div>

                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <div className="d-flex justify-content-between pt-2 mb-2">
                                                        <p className="fw-bold mb-0">Billing Details</p>
                                                        {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p> */}
                                                    </div>
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted">From: <span style={{ color: '#c92014' }}> {order.billingDetails.name}</span></li>
                                                        <li className="text-muted">{order.billingDetails.address1}, {order.billingDetails.address2}</li>
                                                        <li className="text-muted">{order.billingDetails.state}</li>
                                                        <li className="text-muted">{order.billingDetails.email}</li>
                                                        <li className="text-muted"><i className="fas fa-phone" /> {order.billingDetails.mobile}</li>
                                                    </ul>
                                                </div>
                                                <div className="col-xl-6 text-end">
                                                    <div className="d-flex justify-content-end text-end pt-2 mb-2">
                                                        <p className="fw-bold mb-0">Shipping Details</p>
                                                        {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p> */}
                                                    </div>
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted">To: <span style={{ color: '#c92014' }}> {order.shippingDetails.name}</span></li>
                                                        <li className="text-muted">{order.shippingDetails.address1}, {order.shippingDetails.address2}</li>
                                                        <li className="text-muted">{order.shippingDetails.state}</li>
                                                        <li className="text-muted">{order.shippingDetails.email}</li>
                                                        <li className="text-muted"><i className="fas fa-phone" /> {order.shippingDetails.mobile}</li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card-footer border-0 px-4 py-5" style={{ backgroundColor: '#c92014', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                                                paid: <span className="h2 mb-0 ms-2">₹{order.total}</span></h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default OrderSummary
