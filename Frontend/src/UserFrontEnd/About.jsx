import React from 'react'
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import { Row } from 'react-bootstrap'
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import af1 from "assets/images/af-1.png"
import af2 from "assets/images/af-2.png"
import af3 from "assets/images/af-3.png"
import Gp from "assets/images/gp.jpg"
import Cbg from "assets/images/call-bg.jpg"
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
import { Icon } from '@mui/material'


function About() {
    return (
        <div className={Styles.home}>
            <Header />
            <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>About Us</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>About Us</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Us Section Begin */}
            <section className="about spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title about-title">
                                <h2>Welcome to Auto Parts <br />We Provide Everything You Need To A Vehicle</h2>
                                <p>First I will explain what contextual advertising is. Contextual advertising means the
                                    advertising of products on a website according to<br /> the content the page is displaying.
                                    For example if the content of a website was information on a Ford truck then the
                                    advertisements</p>
                            </div>
                        </div>
                    </div>
                    <div className="about__feature">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about__feature__item">
                                    <img src={af1} alt />
                                    <h5>Quality Assurance System</h5>
                                    <p>It seems though that some of the biggest problems with the internet advertising trends
                                        are the lack of</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about__feature__item">
                                    <img src={af2} alt />
                                    <h5>Accurate Testing Processes</h5>
                                    <p>Where do you register your complaints? How can you protest in any form against companies
                                        whose</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about__feature__item">
                                    <img src={af3} alt />
                                    <h5>Infrastructure Integration Technology</h5>
                                    <p>So in final analysis: it’s true, I hate peeping Toms, but if I had to choose, I’d take
                                        one any day over an</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about__pic">
                                <img src={Gp} alt />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="about__item">
                                <h5>Our Mission</h5>
                                <p>Now, I’m not like Robin, that weirdo from my cultural anthropology class; I think that
                                    advertising is something that has its place in our society; which for better or worse is
                                    structured along a marketplace economy. But, simply because I feel advertising has a right
                                    to exist, doesn’t mean that I like or agree with it, in its</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="about__item">
                                <h5>Our Vision</h5>
                                <p>Where do you register your complaints? How can you protest in any form against companies
                                    whose advertising techniques you don’t agree with? You don’t. And on another point of
                                    difference between traditional products and their advertising and those of the internet
                                    nature, simply ignoring internet advertising  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Us Section End */}
            {/* Call Section Begin */}
            <section className="call spad set-bg" style={{ backgroundImage: `url(${Cbg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-6">
                            <div className="call__text">
                                <div className="section-title">
                                    <h2>Request A Call Back</h2>
                                    <p>Posters had been a very beneficial marketing tool because it had paved to deliver an
                                        effective message that conveyed customer’s</p>
                                </div>
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1 col-md-6">
                            <form action="#" className="call__form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" placeholder="Email" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" placeholder="Phone" />
                                    </div>

                                </div>
                                <button type="submit" className="site-btn">Submit Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* Call Section End */}
            {/* Team Section Begin */}
            <section className="team spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title team-title">
                                <span>Our Team</span>
                                <h2>Meet Our Expert</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="team__item">
                                <div className="team__item__pic">
                                    <img src={t1} alt />
                                </div>
                                <div className="team__item__text">
                                    <h5>John Smith</h5>
                                    <span>Marketing</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="team__item">
                                <div className="team__item__pic">
                                    <img src={t2} alt />
                                </div>
                                <div className="team__item__text">
                                    <h5>Christine Wise</h5>
                                    <span>C.E.O</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="team__item">
                                <div className="team__item__pic">
                                    <img src={t3} alt />
                                </div>
                                <div className="team__item__text">
                                    <h5>Sean Robbins</h5>
                                    <span>Manager</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="team__item">
                                <div className="team__item__pic">
                                    <img src={t4} alt />
                                </div>
                                <div className="team__item__text">
                                    <h5>Lucy Myers</h5>
                                    <span>Delivary</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Team Section End */}
            {/* Clients Begin */}
            <div className="clients spad"  style={{marginTop:"0px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title client-title">
                                <span>Partner</span>
                                <h2>Our Clients</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c1} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c2} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c3} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c2} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c4} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c5} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c6} alt />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <a href="#" className="client__item">
                                <img src={c7} alt />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Clients End */}
            <Footer />
        </div>
    )
}

export default About
