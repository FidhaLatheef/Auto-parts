import React, { useState, useEffect } from 'react';
import Styles from "../css/style.module.css"
import HeroBg from "assets/images/h.jpg"
import { Row, Tab } from 'react-bootstrap';
import { Icon } from '@mui/material';
import f1 from "assets/images/feature-1.png"
import f2 from "assets/images/feature-2.png"
import f3 from "assets/images/feature-3.png"
import f4 from "assets/images/feature-4.png"
import f5 from "assets/images/feature-5.png"
import f6 from "assets/images/feature-6.png"
import ch from "assets/images/chooseus-video.png"
import s1 from "assets/images/appointment.jpg"
import s2 from "assets/images/services-prices.jpg"
import s3 from "assets/images/wheel-balancing.jpg"
import s4 from "assets/images/carzone-painting.jpg"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import Banner from "UserFrontEnd/components/Banner"
import axios from 'axios';
import t1 from "assets/images/team/team-1.jpg"
import t2 from "assets/images/team/team-2.jpg"
import t3 from "assets/images/team/team-3.jpg"
import t4 from "assets/images/team/team-4.jpg"
import c1 from "assets/images/clients/client-1.png"
import c2 from "assets/images/clients/client-2.png"
import c3 from "assets/images/clients/client-3.png"
import c4 from "assets/images/clients/client-4.png"
import c5 from "assets/images/clients/client-5.png"
import c6 from "assets/images/clients/client-6.png"
import c7 from "assets/images/clients/client-7.png"
import "css/style.css"
import { Link } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchProducts();
        categoryList();
    }, []);

    const fetchProducts = async () => {
        axios
            .get('http://localhost:8000/user/productList')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    window.location.href = 'authentication/sign-in';
                }
            });
    };

    const categoryList = async () => {
        axios.get("http://localhost:8000/user/categoryList")
            .then((response) => {
                console.log(response.message);
                if (response.message == "No token provided") {
                    window.location.href = "login";
                } else {
                    setCategories(response.data.data);
                }

            })
            .catch((error) => {
                if (error.response.status == "401") {
                    window.location.href = "authentication/sign-in";
                }
            });

    }

    return (
        <div className={Styles.home}>
            <Header />
            <Banner />
            {/* Hero Section Begin */}

            {/* Hero Section End */}
            {/* Services Section Begin */}
            <section>
                <div className={Styles.servicecontainer}>
                    <Row className="row">
                        <div className="col-lg-12">
                            <div className={Styles.sectiontitle}>
                                <span>Our Services</span>
                                <h2>What We Offers</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                            </div>
                        </div>
                    </Row>

                    <Row className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className={Styles.services__item}>
                                <img src={s1} alt />
                                <h5>Online Appointment</h5>
                                <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
                                    viverra maecenas.</p>
                                <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className={Styles.services__item}>
                                <img src={s2} alt />
                                <h5>Best Services Prices</h5>
                                <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
                                    viverra maecenas.</p>
                                <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className={Styles.services__item}>
                                <img src={s3} alt />
                                <h5>The Wheel Balancing</h5>
                                <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
                                    viverra maecenas.</p>
                                <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className={Styles.services__item}>
                                <img src={s4} alt />
                                <h5>Carzone Painting</h5>
                                <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
                                    viverra maecenas.</p>
                                <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
                            </div>
                        </div>
                    </Row>
                </div>
            </section>
            {/* <section className="services spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title">
          <span>Our Services</span>
          <h2>What We Offers</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="services__item">
          <img src={s1}  alt />
          <h5>Online Appointment</h5>
          <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
            viverra maecenas.</p>
            <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="services__item">
          <img src={s2} alt />
          <h5>Best Services Prices</h5>
          <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
            viverra maecenas.</p>
            <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="services__item">
          <img src={s3} alt />
          <h5>The Wheel Balancing</h5>
          <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
            viverra maecenas.</p>
            <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="services__item">
          <img src={s4} alt />
          <h5>Carzone Painting and Maintenance</h5>
          <p>Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo
            viverra maecenas.</p>
            <a href="#"><Icon><span className="material-symbols-outlined">arrow_right_alt</span></Icon></a>
        </div>
      </div>
    </div>
  </div>
</section> */}

            {/* Services Section End */}
            {/* Feature Section Begin */}
            {/* <section className={`${Styles.feature} ${Styles.spad}`}>
                <div className={Styles.servicecontainer} style={{height:"473px"}}>
                    <Row className="row" >
                        <div className="col-lg-4">
                            <div className={Styles.feature__text}>
                                <div className={Styles.sectiontitle}>
                                    <span>Our Feature</span>
                                    <h2>We Are a Trusted Name In Auto</h2>
                                </div>
                                <div className={Styles.feature__text__desc}>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi
                                         labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                                        viverra maecenas accumsan lacus vel facilisis.</p>
                                </div>
                                <div className={Styles.feature__text__btn}>
                                    <a href="/about" className={Styles.primarybtn}>About Us</a>
                                    <a href="/about" className={`${Styles.primarybtn} ${Styles.partnerbtn}`}>Our Partners</a>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-lg-4 offset-lg-4" >
                            <Row className="row" >
                                <div className="col-lg-6 col-md-4 col-6" >
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f1} alt />
                                        </div>
                                        <h6>Engine</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f2} alt />
                                        </div>
                                        <h6>Turbo</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f3} alt />
                                        </div>
                                        <h6>Colling</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f4} alt />
                                        </div>
                                        <h6>Suspension</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f5} alt />
                                        </div>
                                        <h6>Electrical</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className={Styles.feature__item}>
                                        <div className={Styles.feature__item__icon}>
                                            <img src={f6} alt />
                                        </div>
                                        <h6>Brakes</h6>
                                    </div>
                                </div>
                            </Row>
                        </div>
                       
                    </Row>
                </div>
            </section> */}
            <section className="feature spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="feature__text">
                                <div className="section-title">
                                    <span>Our Feature</span>
                                    <h2>We Are a Trusted Name In Auto</h2>
                                </div>
                                <div className="feature__text__desc">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                                        viverra maecenas accumsan lacus vel facilisis.</p>
                                </div>
                                <div className="feature__text__btn">
                                    <a href="/about" className="primary-btn">About Us</a>
                                    <a href="/about" className="primary-btn partner-btn">Our Partners</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-4">
                            <div className="row">
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f1} alt />
                                        </div>
                                        <h6>Engine</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f2} alt />
                                        </div>
                                        <h6>Turbo</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f3} alt />
                                        </div>
                                        <h6>Colling</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f4} alt />
                                        </div>
                                        <h6>Suspension</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f5} alt />
                                        </div>
                                        <h6>Electrical</h6>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 col-6">
                                    <div className="feature__item">
                                        <div className="feature__item__icon">
                                            <img src={f6} alt />
                                        </div>
                                        <h6>Brakes</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section End */}

            {/*Product listing start*/}
            <section className={`${Styles.productListing} ${Styles.spad}`}>
                <div className={Styles.productcontainer}>
                    <Row className="row">
                        <div className="col-lg-12">
                            <div className={Styles.sectiontitle} style={{ marginTop: "5px" }}>
                                <span>Our Parts</span>
                                <h2>Popular Products</h2>
                            </div>
                        </div>
                    </Row>
                    <Row className="row">
                        {products.slice(0, 4).map((product) => (
                            <Link to={`/productDetails/${product._id}`} key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                                <div className={Styles.car__item}>
                                    <div className={Styles.car__item__pic__slider}>
                                        <img src={`http://localhost:8000/${product.images[0]}`} alt={product.productName} />
                                    </div>
                                    <div className={Styles.car__item__text}>
                                        <div className={Styles.car__item__text__inner}>
                                            <h4>{product.productName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Row>
                </div>
            </section>
            {/*Product listing End*/}
            {/* Chooseus Section Begin */}
            {/* <section className={`${Styles.chooseus} ${Styles.spad}`} style={{ height: "600px" }}>
                <div className={Styles.servicecontainer}>
                    <Row className="row">
                        <div className="col-lg-5">
                            <div className={Styles.chooseus__text}>
                                <div className={Styles.sectiontitle} style={{ marginTop: "-188px" }}>
                                    <h2>Why People Choose Us</h2>
                                    <p>Duis aute irure dolorin reprehenderits volupta velit dolore fugiat nulla pariatur
                                        excepteur sint occaecat cupidatat.</p>
                                </div>
                                <ul>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit.</li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon>Integer et nisl et massa tempor ornare vel id orci.
                                    </li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Nunc consectetur ligula vitae nisl placerat tempus.
                                    </li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Curabitur quis ante vitae lacus varius pretium.</li>
                                </ul>
                                <a href="/about" className={Styles.primarybtn}>About Us</a>
                            </div>
                        </div>
                    </Row>
                </div>
                <div className={`${Styles.chooseus__video} ${Styles.setbg}`}>
                    <img src={ch} alt />
                </div>
            </section> */}
            <section className="chooseus spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="chooseus__text">
                                <div className="section-title">
                                    <h2>Why People Choose Us</h2>
                                    <p>Duis aute irure dolorin reprehenderits volupta velit dolore fugiat nulla pariatur
                                        excepteur sint occaecat cupidatat.</p>
                                </div>
                                <ul>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit.</li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon>Integer et nisl et massa tempor ornare vel id orci.
                                    </li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Nunc consectetur ligula vitae nisl placerat tempus.
                                    </li>
                                    <li><Icon><span className="material-symbols-outlined">
                                        check_circle
                                    </span></Icon> Curabitur quis ante vitae lacus varius pretium.</li>
                                </ul>
                                <a href="/about" className="primary-btn">About Us</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chooseus__video set-bg">
                    <img src={ch} alt />
                    <a href="https://www.youtube.com/watch?v=Xd0Ok-MkqoE" className="play-btn video-popup">
                        <Icon><span className="material-symbols-outlined">
                            play_arrow
                        </span></Icon>

                        <i className="fa fa-play" /></a>
                </div>
            </section>


            {/* Chooseus Section End */}
            {/* Team Section Begin */}
            
            {/* Team Section End */}
            {/* Clients Begin */}
            <div className={`${Styles.clients} ${Styles.spad}`}>
                <div className={Styles.featurecontainer}>
                    <Row className="row">
                        <div className="col-lg-12">
                            <div className={`${Styles.sectiontitle} ${Styles.clienttitle}`}>
                                <span>Partner</span>
                                <h2>Our Clients</h2>
                            </div>
                        </div>
                    </Row>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c1} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c2} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c3} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c2} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c4} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c5} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c6} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className={Styles.client__item}>
                                <img src={c7} alt />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            {/* Js Plugins */}
        </div>
    )
}
export default Home;