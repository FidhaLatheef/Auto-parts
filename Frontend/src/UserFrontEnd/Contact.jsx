import React from 'react'
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import { Row } from 'react-bootstrap'
import { Icon } from '@mui/material'

function Contact() {
  return (
    <div className={Styles.home}>
      <Header />
      <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Contact Us</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>Contact Us</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         {/* Contact Section Begin */}
<section className="contact spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6">
        <div className="contact__text">
          <div className="section-title">
            <h2>Let’s Work Together</h2>
            <p>To make requests for further information, contact us via our social channels.</p>
          </div>
          <ul>
            <li><span>Weekday</span> 08:00 am to 18:00 pm</li>
            <li><span>Saturday:</span> 10:00 am to 16:00 pm</li>
            <li><span>Sunday:</span> Closed</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <div className="contact__form">
          <form action="#">
            <div className="row">
              <div className="col-lg-6">
                <input type="text" placeholder="Name" />
              </div>
              <div className="col-lg-6">
                <input type="text" placeholder="Email" />
              </div>
            </div>
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Question" defaultValue={""} />
            <button type="submit" className="site-btn">Submit Now</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Contact Section End */}

{/* Contact Address Begin */}
<div className="contact-address">
  <div className="container">
    <div className="contact__address__text">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="contact__address__item">
            <h4>California Showroom</h4>
            <p>625 Gloria Union, California, United Stated Colorlib.california@gmail.com</p>
            <span>(+12) 456 678 9100</span>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="contact__address__item">
            <h4>New York Showroom</h4>
            <p>8235 South Ave. Jamestown, NewYork Colorlib.Newyork@gmail.com</p>
            <span>(+12) 456 678 9100</span>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="contact__address__item">
            <h4>Florida Showroom</h4>
            <p>497 Beaver Ridge St. Daytona Beach, Florida Colorlib.california@gmail.com</p>
            <span>(+12) 456 678 9100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Contact Address End */}

      <Footer />
    </div>

  )
}

export default Contact
