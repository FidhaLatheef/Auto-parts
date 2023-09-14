import React from 'react'
import styles from "../css/style3.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import { Col, Row } from 'react-bootstrap'

function Checkout() {
    return (
        <div>
            <Header />
            {/* Checkout Section Begin */}
            <section className={`${styles.checkout} ${styles.spad}`}>
                <div className={styles.container} style={{ marginLeft: "80px" }}>
                    <div className={styles.checkout__form}>
                        <form action="#">
                            <Row className={styles.row} style={{ marginLeft: "10px" }}>
                                <Col className="col-lg-8 col-md-6">
                                <div>
                                    <h6 className={styles.checkout__title}>Billing Details</h6>
                                    <Row className={styles.row}>
                                        <div className="col-lg-6">
                                            <div className={styles.checkout__input}>
                                                <p>First Name<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className={styles.checkout__input}>
                                                <p>Last Name<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </Row>
                                    <div className={styles.checkout__input}>
                                        <p>Country<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className={styles.checkout__input}>
                                        <p>Address<span>*</span></p>
                                        <input type="text" placeholder="Street Address" className="checkout_input_add" />
                                        <input type="text" placeholder="Apartment, suite, unite ect (optinal)" />
                                    </div>
                                    <div className={styles.checkout__input}>
                                        <p>Town/City<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className={styles.checkout__input}>
                                        <p>Country/State<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className={styles.checkout__input}>
                                        <p>Postcode / ZIP<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className={styles.checkout__input}>
                                                <p>Phone<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className={styles.checkout__input}>
                                                <p>Email<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.checkout_input_checkbox}>
                                        <label htmlFor="acc">
                                            Create an account?
                                            <input type="checkbox" id="acc" />
                                            <span className={styles.checkmark} />
                                        </label>
                                        <p>Create an account by entering the information below. If you are a returning customer
                                            please login at the top of the page</p>
                                    </div>
                                    <div className={styles.checkout__input}>
                                        <p>Account Password<span>*</span></p>
                                        <input type="text" />
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
                                        Product <span>Total</span>
                                    </div>
                                    <ul className={styles.checkout__total__products}>
                                        <li>01. Vanilla salted caramel <span>$ 300.0</span></li>
                                        <li>02. German chocolate <span>$ 170.0</span></li>
                                        <li>03. Sweet autumn <span>$ 170.0</span></li>
                                        <li>04. Cluten free mini dozen <span>$ 110.0</span></li>
                                    </ul>
                                    <ul className={styles.checkout__total__all}>
                                        <li>Subtotal <span>$750.99</span></li>
                                        <li>Total <span>$750.99</span></li>
                                    </ul>
                                    <div className={styles.checkout__input__checkbox}>
                                        <label htmlFor="acc-or">
                                            Create an account?
                                            <input type="checkbox" id="acc-or" />
                                            <span className={styles.checkmark} />
                                        </label>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua.</p>
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
                                        <label htmlFor="k">
                                            Cash On Delivery
                                            <input type="checkbox" id="cod" />
                                            <span className={styles.checkmark} />
                                        </label>
                                    </div>
                                    <button type="submit" className={styles.sitebtn}>PLACE ORDER</button>
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
