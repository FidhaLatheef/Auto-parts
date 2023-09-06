import React from 'react'
import Styles from "../css/style.module.css"
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import { Row } from 'react-bootstrap'

function Contact() {
  return (
    <div>
      <Header />
      <div className={`${Styles.breadcrumboption} ${Styles.setbg}`} style={{ backgroundImage: `url(${HeroBg})` }}>
                    <div className="col-lg-12 text-center">
                        <div className={Styles.breadcrumb__text}>
                            <h2>Contact Us</h2>
                        </div>
                    </div>
                </div>

      {/* Contact Section Begin */}
      <section className={`${Styles.contact} ${Styles.spad}`}>
        <div className={Styles.featurecontainer}>
          <Row className="row">
            <div className="col-lg-6 col-md-6">
              <div className={Styles.contact__text}>
                <div className={Styles.sectiontitle}>
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
              <div className={Styles.contact__form}>
                <form action="#">
                  <Row className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Email" />
                    </div>
                  </Row>
                  <input type="text" placeholder="Subject" />
                  <textarea placeholder="Your Question" defaultValue={""} />
                  <button type="submit" className={Styles.sitebtn}>Submit Now</button>
                </form>
              </div>
            </div>
          </Row>
        </div>
      </section>
      {/* Contact Section End */}
      {/* Contact Address Begin */}
      <div className={Styles.contactaddress}>
        <div className={Styles.featurecontainer}>
          <div className={Styles.contact__address__text}>
            <Row className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className={Styles.contact__address__item}>
                  <h4>California Showroom</h4>
                  <p>625 Gloria Union, California, United Stated Colorlib.california@gmail.com</p>
                  <span>(+12) 456 678 9100</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className={Styles.contact__address__item}>
                  <h4>New York Showroom</h4>
                  <p>8235 South Ave. Jamestown, NewYork Colorlib.Newyork@gmail.com</p>
                  <span>(+12) 456 678 9100</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className={Styles.contact__address__item}>
                  <h4>Florida Showroom</h4>
                  <p>497 Beaver Ridge St. Daytona Beach, Florida Colorlib.california@gmail.com</p>
                  <span>(+12) 456 678 9100</span>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Contact
