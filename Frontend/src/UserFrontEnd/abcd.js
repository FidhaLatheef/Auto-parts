import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import { Image, Row } from "react-bootstrap";
import search from "assets/img/icon/search.png";
import heart from "assets/img/icon/heart.png";
import cart from "assets/img/icon/cart.png";
import styles from "../css/style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Checkout() {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartItems, setCartItems] = useState(initialCart);
  // const selectedCode = JSON.parse(localStorage.getItem("selectedCouponCode")) || [];
  // const [code, setCode] = useState(selectedCode);
  const navigate = useNavigate("");
  const [selectedCouponCode, setSelectedCouponCode] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const subtotalValue = calculateSubtotal();
    setSubtotal(subtotalValue);
  }, [cartItems]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    // createAccount: false,
    // username: "",
    // accountPassword: "",
    // noteAboutOrder: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
  });

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

  const copyBillingToShipping = () => {
    setShippingDetails(billingDetails);
  };

  useEffect(() => {
    const storedCouponCode = localStorage.getItem("selectedCouponCode");
    if (storedCouponCode) {
      setSelectedCouponCode(storedCouponCode);
    }
  }, []);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.quantity * item.offerprice;
    });
    return subtotal.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());

    const storedCouponCode = localStorage.getItem("selectedCouponCode");
    const selectedCoupon = storedCouponCode ? JSON.parse(storedCouponCode) : null;
    let discountAmount = 0;
    if (selectedCoupon) {
      discountAmount = (subtotal * selectedCoupon.discount) / 100;
    }

    const total = subtotal - discountAmount;
    return {
      total: total.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
    };
  };
  const totalAndDiscount = calculateTotal();

  const validateForm = () => {
    const billingFieldsFilled = Object.values(billingDetails).every((value) => value.trim() !== "");
    const shippingFieldsFilled = Object.values(shippingDetails).every(
      (value) => value.trim() !== ""
    );

    setFormIsValid(billingFieldsFilled && shippingFieldsFilled);

    if (!billingFieldsFilled || !shippingFieldsFilled) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    validateForm();

    if (formIsValid) {
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      let data;
      if (userProfile) {
        data = {
          userId: userProfile.id,
          cartItems: cartItems,
          billingDetails: billingDetails,
          shippingDetails: shippingDetails,
          subtotal: subtotal,
          discountAmount: totalAndDiscount.discountAmount,
          total: totalAndDiscount.total,
        };
      } else {
        data = {
          // UserId: userProfile.id,
          cartItems: cartItems,
          billingDetails: billingDetails,
          shippingDetails: shippingDetails,
          subtotal: subtotal,
          discountAmount: totalAndDiscount.discountAmount,
          total: totalAndDiscount.total,
        };
      }
      console.log({ "first data": data });

      if (createAccount) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          const base64Image = reader.result;
          const userData = {
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            Username: username,
            Password: password,
            Image: base64Image,
            Email: billingDetails.email,
            Country: billingDetails.country,
            State: billingDetails.state,
            Phone: billingDetails.phone,
          };
          const userprofile = {
            firstname: billingDetails.firstName,
            lastname: billingDetails.lastName,
            username: username,
            // password: password,
            image: base64Image,
            email: billingDetails.email,
            country: billingDetails.country,
            state: billingDetails.state,
            phone: billingDetails.phone,
          };
          axios
            .post("http://localhost:8000/users/adduser", userData)
            .then((response) => {
              console.log("User registered:", response.data);
              localStorage.setItem("usertoken", response.data.token);
              localStorage.setItem("userProfile", JSON.stringify(userprofile));
              placeOrder(data);
            })
            .catch((error) => {
              console.error("Error registering user:", error.message);
              if (error.response && error.response.status === 400) {
                setError(error.response.data.error);
              }
            });
        };
      } else {
        placeOrder(data);
      }
    }
  };

  const placeOrder = (data) => {
    console.log({ "second data": data });
    axios
      .post("http://localhost:8000/users/addorder", data)
      .then((response) => {
        console.log("Order placed:", response.data);
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.removeItem("selectedCouponCode");
        const orderDataWithId = { ...data, orderId: response.data.orderId };
        navigate("/invoice", { state: orderDataWithId });
      })
      .catch((error) => {
        console.error("Error placing order:", error.message);
      });
  };
  return (
    <div>
      <TopNavBar />
      <section className={styles.breadcrumboption}>
        <div className={styles.container} style={{ marginLeft: "180px" }}>
          <Row className={styles.row}>
            <div className="col-lg-12">
              <div className={styles.breadcrumb__text}>
                <h4>Check Out</h4>
                <div className={styles.breadcrumb__links}>
                  <a href="/home">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Check Out</span>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Checkout Section Begin */}
      <section className={`${styles.checkout} ${styles.spad}`}>
        <div className={styles.container} style={{ marginLeft: "180px" }}>
          <div className={styles.checkout__form}>
            <form action="#">
              <Row className={styles.row}>
                <div className="col-lg-8 col-md-6">
                  <h6 className={styles.coupon__code}>
                    <span className={styles.icon_tag_alt} />
                    Selected Coupon: {selectedCouponCode.name}
                    <br />
                    {/* <a
                      href="#"
                      onClick={() => {
                        const couponCode = prompt("Enter your coupon code");
                        setSelectedCouponCode(couponCode);

                        localStorage.setItem("selectedCouponCode", couponCode);
                      }}
                    >
                      Click here to change coupon
                    </a>{" "} */}
                  </h6>
                  <h6 className={styles.checkout__title}>Billing Details</h6>
                  <Row className={styles.row}>
                    <div className="col-lg-6">
                      <div className={styles.checkout__input}>
                        <p>
                          First Name<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={billingDetails.firstName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className={styles.checkout__input}>
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={billingDetails.lastName}
                          onChange={handleBillingChange}
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
                      value={billingDetails.country}
                      onChange={handleBillingChange}
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
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input
                      type="text"
                      name="city"
                      value={billingDetails.city}
                      placeholder="Enter your City"
                      onChange={handleBillingChange}
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
                      value={billingDetails.state}
                      placeholder="Enter your State"
                      onChange={handleBillingChange}
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
                      value={billingDetails.postcode}
                      placeholder="PIN code"
                      onChange={handleBillingChange}
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
                          name="phone"
                          value={billingDetails.phone}
                          placeholder="Contact Number"
                          onChange={handleBillingChange}
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
                          value={billingDetails.email}
                          placeholder="example@gmail.com"
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>
                  </Row>
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
                  <h6 className={styles.checkout__title}>Shipping Details</h6>
                  <Row className={styles.row}>
                    <div className="col-lg-6">
                      <div className={styles.checkout__input}>
                        <p>
                          First Name<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={shippingDetails.firstName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className={styles.checkout__input}>
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={shippingDetails.lastName}
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
                          name="phone"
                          value={shippingDetails.phone}
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
                    <p>
                      Create an account by entering the information below. If you are a returning
                      customer please login at the top of the page
                    </p>
                  </div>
                  <div className={styles.checkout__input}>
                    <input type="text" />
                    <p>
                      Upload your profile picture<span>*</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <p>
                      Username<span>*</span>
                    </p>
                    <input type="text" onChange={(e) => setuserName(e.target.value)} />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <p>
                      Account Password<span>*</span>
                    </p>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className={styles.checkout_input_checkbox}>
                    <label htmlFor="diff-acc">
                      Note about your order, e.g, special note for delivery
                      <input type="checkbox" id="diff-acc" />
                      <span className={styles.checkmark} />
                    </label>
                  </div>
                  <div className={styles.checkout__input}>
                    <p>
                      Order notes<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className={styles.checkout__order}>
                    <h4 className={styles.order__title}>Your order</h4>
                    <div className={styles.checkout_order_products}>
                      Product <span>Total</span>
                    </div>
                    <ul className={styles.checkout_total_products}>
                      {cartItems.map((item, index) => (
                        <li key={index}>
                          {index + 1}. {item.productName}×{item.quantity}
                          <span style={{ color: "red" }}>
                            ₹ {(item.quantity * item.offerprice).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className={styles.checkout_total_all}>
                      <li>
                        Subtotal <span>₹{calculateSubtotal()}</span>
                      </li>
                      <li>
                        Discount <span>₹{totalAndDiscount.discountAmount}</span>
                      </li>
                      <li>
                        Total <span>₹{totalAndDiscount.total}</span>
                      </li>
                    </ul>
                    <div className={styles.checkout_input_checkbox}>
                      <label htmlFor="acc-or">
                        Create an account?
                        <input type="checkbox" id="acc-or" />
                        <span className={styles.checkmark} />
                      </label>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className={styles.checkout_input_checkbox}>
                      <label htmlFor="payment">
                        Check Payment
                        <input type="checkbox" id="payment" />
                        <span className={styles.checkmark} />
                      </label>
                    </div>
                    <div className={styles.checkout_input_checkbox}>
                      <label htmlFor="paypal">
                        Paypal
                        <input type="checkbox" id="paypal" />
                        <span className={styles.checkmark} />
                      </label>
                    </div>
                    <div className={styles.checkout_input_checkbox}>
                      <label htmlFor="">
                        Cash on Delivery
                        <input type="checkbox" id="cod" />
                        <span className={styles.checkmark} />
                      </label>
                    </div>
                    <button type="submit" className={styles.sitebtn} onClick={handlePlaceOrder}>
                      PLACE ORDER
                    </button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  </div>
                </div>
              </Row>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Checkout;