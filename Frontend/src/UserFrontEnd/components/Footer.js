import React from 'react';
import Styles from "css/style.module.css";
import { Row } from 'react-bootstrap';
import footerBg from "assets/images/footer-bg.jpg";

function Footer() {
    return (
        <footer className={`${Styles.footer} ${Styles.setbg}`} style={{
            backgroundImage: `url(${footerBg})`,
            backgroundRepeat: 'no-repeat', // Prevent repeating the image
            backgroundPosition: 'center', // Center the image horizontally and vertically
        }}>
            <div className={Styles.footercontainer}>
                <div className={Styles.footer__contact}>
                    <Row className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className={Styles.footer__contact__title}>
                                <h2>Contact Us Now!</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className={Styles.footer__contact__option}>
                                <div className={Styles.option__item}><i className="fa fa-phone" /> (+12) 345 678 910</div>
                                <div className={`${Styles.option__item} ${Styles.email}`}><i className="fa fa-envelope-o" /> Colorlib@gmail.com</div>
                            </div>
                        </div>
                    </Row>
                </div>
                <Row className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className={Styles.footer__about}>
                            <div className={Styles.footer__logo}>
                                <a href="#"><img src="img/footer-logo.png" alt /></a>
                            </div>
                            <p>Any questions? Let us know in store at 625 Gloria Union, California, United Stated or call us
                                on (+1) 96 123 8888</p>
                            <div className={Styles.footer__social}>
                                <a href="#" className="facebook"><i className="fa fa-facebook" /></a>
                                <a href="#" className="twitter"><i className="fa fa-twitter" /></a>
                                <a href="#" className="google"><i className="fa fa-google" /></a>
                                <a href="#" className="skype"><i className="fa fa-skype" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3">
                        <div className={Styles.footer__widget}>
                            <h5>Infomation</h5>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" /> Purchase</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Payemnt</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Shipping</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Return</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3">
                        <div className={Styles.footer__widget}>
                            <h5>Infomation</h5>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" /> Hatchback</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Sedan</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> SUV</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Crossover</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className={Styles.footer__brand}>
                            <h5>Top Brand</h5>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" /> Abarth</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Acura</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Alfa Romeo</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Audi</a></li>
                            </ul>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" /> BMW</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Chevrolet</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Ferrari</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" /> Honda</a></li>
                            </ul>
                        </div>
                    </div>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
