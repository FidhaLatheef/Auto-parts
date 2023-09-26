import React, { useEffect, useState } from 'react'
import styles from "../css/style3.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import { Col, Row } from 'react-bootstrap'
import { event } from 'jquery'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cartItem, setCartItem] = useState(initialCart);
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [createAccount, setCreateAccount] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState(false);
    const [Exist, setExist] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate("");

    useEffect(() => {
        const totalValue = calculateCartTotal();
        setTotal(totalValue);
    }, [cartItem]);
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        mobile: "",
        email: "",
    });
    const [shippingDetails, setShippingDetails] = useState({
        name: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        mobile: "",
        email: "",
    });
    const calculateCartTotal = () => {
        let total = 0;
        for (const item of cartItem) {
            total += item.price * item.quantity;
        }
        return total;
    };

    const handleBillingChange = (event) => {
        const { name, value } = event.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleShippingChange = (event) => {
        const { name, value } = event.target;
        setShippingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const billingFieldsFilled = Object.values(billingDetails).every((value) => value.trim() !== "");
        const shippingFieldsFilled = Object.values(shippingDetails).every(
            (value) => value.trim() !== ""
        );

        setFormIsValid(billingFieldsFilled && shippingFieldsFilled);

        if (!billingFieldsFilled || !shippingFieldsFilled) {
            setErrorMessage(true);
            toast.error('Please Enter All Fields..')
        } else {
            setErrorMessage("");
        }
    };

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        console.log('here')
        validateForm();

        if (formIsValid) {
            const userProfile = JSON.parse(localStorage.getItem("userProfile"));
            let data;
            if (userProfile) {
                data = {
                    userId: userProfile.id,
                    cartItem: cartItem,
                    billingDetails: billingDetails,
                    shippingDetails: shippingDetails,
                    total: total,
                };
            } else {
                data = {
                    cartItem: cartItem,
                    billingDetails: billingDetails,
                    shippingDetails: shippingDetails,
                    total: total,
                };
            }
            console.log({ "first data": data });

            if (createAccount) {
                const formData = new FormData();
                formData.append("name", billingDetails.name);
                formData.append("email", billingDetails.email);
                formData.append("mobile", billingDetails.mobile);
                formData.append("password", password);
                formData.append("image", image);
                const userprofile = {
                    name: billingDetails.name,
                    image: image,
                    email: billingDetails.email,
                    mobile: billingDetails.mobile,
                };
                axios
                    .post('http://localhost:8000/user/signUp', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(function (response) {
                        console.log("User registered:", response.data);
                        localStorage.setItem("usertoken", response.data.token);
                        localStorage.setItem("userProfile", JSON.stringify(userprofile));
                        placeOrder(data);
                    })
                    .catch(function (error) {
                        console.error("Error registering user:", error.message);
                        if (error.response && error.response.status === 400) {
                            setExist(true);
                            toast.error('User Already Exist')
                        }
                    });
            } else {
                placeOrder(data);
            }
        }
    };

    const placeOrder = (data) => {
        console.log({ "place order": data });
        axios
            .post("http://localhost:8000/user/addOrder", data)
            .then((response) => {
                console.log("Order placed:", response.data);
                localStorage.setItem("cart", JSON.stringify([]));
                toast.success('Order placed successfully!', {
                    duration: 4000,
                    position: 'top-right',
                });

                setTimeout(() => {
                    const orderDataWithId = { ...data, orderId: response.data.orderId };
                    navigate("/invoice", { state: orderDataWithId });
                }, 3000);
            })
            .catch((error) => {
                console.error("Error placing order:", error.message);
            });

    }

    return (
        <div>
            <Toaster />
            <Header />
            {/* Checkout Section Begin */}
            <section className={`${styles.checkout} ${styles.spad}`}>
                <div className={styles.container} style={{ marginLeft: "80px" }}>
                    <div className={styles.checkout__form}>
                        <form action="#">
                            {/* Billing Details Begin */}
                            <Row className={styles.row} style={{ marginLeft: "10px" }}>
                                <Col className="col-lg-8 col-md-6">
                                    <div>
                                        <h6 className={styles.checkout__title}>Billing Details</h6>
                                        <Row className={styles.row}>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>Name<span>*</span></p>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder=" Name"
                                                        value={billingDetails.name}
                                                        onChange={handleBillingChange}
                                                        required />
                                                </div>
                                            </div>
                                        </Row>
                                        <div className={styles.checkout__input}>
                                            <p>Country<span>*</span></p>
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                value={billingDetails.country}
                                                onChange={handleBillingChange}
                                                required />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                Address<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="address1"
                                                value={billingDetails.address1}
                                                onChange={handleBillingChange}
                                                placeholder="Street Address"
                                                className={styles.checkout_input_add}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="address2"
                                                value={billingDetails.address2}
                                                placeholder="Apartment, suite, unite etc"
                                                onChange={handleBillingChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>Town/City<span>*</span></p>
                                            <input
                                                type="text"
                                                name="city"
                                                value={billingDetails.city}
                                                placeholder="Enter your City"
                                                onChange={handleBillingChange}
                                                required />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>State<span>*</span></p>
                                            <input
                                                type="text"
                                                name="state"
                                                value={billingDetails.state}
                                                placeholder="Enter your State"
                                                onChange={handleBillingChange}
                                                required />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>Postcode / ZIP<span>*</span></p>
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={billingDetails.postcode}
                                                placeholder="PIN code"
                                                onChange={handleBillingChange}
                                                required />
                                        </div>
                                        <Row className={styles.row}>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>Phone<span>*</span></p>
                                                    <input
                                                        type="number"
                                                        name="mobile"
                                                        value={billingDetails.mobile}
                                                        placeholder="Contact Number"
                                                        onChange={handleBillingChange}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>Email<span>*</span></p>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={billingDetails.email}
                                                        placeholder="example@gmail.com"
                                                        onChange={handleBillingChange}
                                                        required />
                                                </div>
                                            </div>
                                        </Row>
                                        {/* Shipping Details Begin */}
                                        <div className={styles.checkout_input_checkbox}>
                                            <label htmlFor="sameAsBilling">
                                                Same as Billing Details?
                                                <input
                                                    type="checkbox"
                                                    id="sameAsBilling"
                                                    onChange={() => setShippingDetails(billingDetails)}
                                                />
                                                <span className={styles.checkmark} />
                                            </label>
                                        </div>
                                        <br></br>
                                        <h6 className={styles.checkout__title}>Shipping Details</h6>
                                        <Row className={styles.row}>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>
                                                        First Name<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder=" Name"
                                                        value={shippingDetails.name}
                                                        onChange={handleShippingChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </Row>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                Country<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                value={shippingDetails.country}
                                                onChange={handleShippingChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                Address<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="address1"
                                                value={shippingDetails.address1}
                                                onChange={handleShippingChange}
                                                placeholder="Street Address"
                                                className={styles.checkout_input_add}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="address2"
                                                value={shippingDetails.address2}
                                                placeholder="Apartment, suite, unite etc"
                                                onChange={handleShippingChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                Town/City<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="city"
                                                value={shippingDetails.city}
                                                placeholder="Enter your City"
                                                onChange={handleShippingChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                State<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="state"
                                                value={shippingDetails.state}
                                                placeholder="Enter your State"
                                                onChange={handleShippingChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>
                                                Postcode / ZIP<span>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={shippingDetails.postcode}
                                                placeholder="PIN code"
                                                onChange={handleShippingChange}
                                                required
                                            />
                                        </div>
                                        <Row className={styles.row}>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>
                                                        Phone<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        value={shippingDetails.mobile}
                                                        placeholder="Contact Number"
                                                        onChange={handleShippingChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className={styles.checkout__input}>
                                                    <p>
                                                        Email<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={shippingDetails.email}
                                                        placeholder="example@gmail.com"
                                                        onChange={handleShippingChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </Row>
                                        <div className={styles.checkout_input_checkbox}>
                                            <label htmlFor="acc">
                                                Create an account?
                                                <input
                                                    type="checkbox"
                                                    id="acc"
                                                    onChange={(e) => setCreateAccount(e.target.checked)}
                                                />
                                                <span className={styles.checkmark} />
                                            </label>
                                            <p>Create an account by entering the information below. If you are a returning customer
                                                please login at the top of the page</p>
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>Account Password<span>*</span></p>
                                            <input
                                                type="text"
                                                name='password'
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>Upload Your Photo<span>*</span></p>
                                            <input
                                                type="file"
                                                name='image'
                                                accept='image/*'
                                                onChange={(e) => setImage(e.target.files[0])} />
                                        </div>

                                        <div className={styles.checkout_input_checkbox}>
                                            <label htmlFor="diff-acc">
                                                Note about your order, e.g, special noe for delivery
                                                <input type="checkbox" id="diff-acc" />
                                                <span className={styles.checkmark} />
                                            </label>
                                        </div>
                                        <div className={styles.checkout__input}>
                                            <p>Order notes<span>*</span></p>
                                            <input type="text" placeholder="Notes about your order, e.g. special notes for delivery." />
                                        </div>
                                    </div>
                                </Col>
                                <Col className="col-lg-4 col-md-6">
                                    <div>
                                        <div className={styles.checkout__order} >
                                            <h4 className={styles.order__title}>Your order</h4>
                                            <div className={styles.checkout__order__products}>
                                                Product <span>Price</span>
                                            </div>

                                            <ul className={styles.checkout__total__products}>
                                                {cartItem.map((item, index) => (
                                                    <li key={index}> {item.productname}<span>{item.price}</span></li>

                                                ))}
                                            </ul>
                                            <ul className={styles.checkout__total__all}>

                                                <li> Total <span>${calculateCartTotal()}</span></li>
                                            </ul>

                                            <div className={styles.checkout__input__checkbox}>
                                                <label htmlFor="payment">
                                                    Check Payment
                                                    <input type="checkbox" id="payment" />
                                                    <span className={styles.checkmark} />
                                                </label>
                                            </div>
                                            <div className={styles.checkout__input__checkbox}>
                                                <label htmlFor="paypal">
                                                    Paypal
                                                    <input type="checkbox" id="paypal" />
                                                    <span className={styles.checkmark} />
                                                </label>
                                            </div>
                                            <div className={styles.checkout__input__checkbox}>
                                                <label htmlFor="cod">
                                                    Cash On Delivery
                                                    <input type="checkbox" id="cod" />
                                                    <span className={styles.checkmark} />
                                                </label>
                                            </div>
                                            <button type="submit" className={styles.sitebtn} onClick={handlePlaceOrder}>PLACE ORDER</button>
                                        </div>

                                    </div>
                                </Col>

                            </Row>

                        </form>
                    </div>
                </div>
            </section>
            {/* Checkout Section End */}
            <Footer />
        </div>
    )
}

export default Checkout
