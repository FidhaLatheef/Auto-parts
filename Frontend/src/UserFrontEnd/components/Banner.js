import React from 'react';
import Styles from "css/style.module.css";
import { Row } from 'react-bootstrap';
import footerBg from "assets/images/footer-bg.jpg";
import HeroBg from "assets/images/bgk.jpg"

function Footer() {
    return (
        <footer className={`${Styles.footer} ${Styles.setbg}`} style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundSize: '1350px',
            backgroundRepeat: 'no-repeat', // Prevent repeating the image
            // backgroundPosition: 'center', // Center the image horizontally and vertically
        }}>
            <div className={Styles.servicecontainer}>
                <div className={Styles.footer__contact}>
                    <Row className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className={Styles.footer__contact__title}>
                                <h2>Discover Quality Spare Parts for Your Vehicles !!!</h2>
                            </div>
                           
                        </div>
                    </Row>
                </div>
                {/* <a href="/product" className={Styles.primarybtn}> Shop Now</a> */}
                <Row className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className={Styles.footer__about}>
                            <p>Explore our wide range of genuine spare parts to keep your vehicles running smoothly.</p>
                            <a href="/product" className={Styles.primarybtn}> Shop Now</a>
                        </div>
                    </div>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
