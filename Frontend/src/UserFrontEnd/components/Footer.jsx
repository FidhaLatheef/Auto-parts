import React from 'react';
import Styles from "css/style.module.css";
import { Row } from 'react-bootstrap';
import footerBg from "assets/images/footer-bg.jpg";

function Footer() {
    return (
        // <footer className={`${Styles.footer} ${Styles.setbg}`} style={{
        //     backgroundImage: `url(${footerBg})`,
        //     backgroundRepeat: 'no-repeat', // Prevent repeating the image
        //     backgroundPosition: 'center', // Center the image horizontally and vertically
        // }}>
        //     <div className={Styles.footercontainer}>
        //         <div className={Styles.footer__contact}>
        //             <Row className="row">
        //                 <div className="col-lg-6 col-md-6">
        //                     <div className={Styles.footer__contact__title}>
        //                         <h2>Contact Us Now!</h2>
        //                     </div>
        //                 </div>
        //                 <div className="col-lg-6 col-md-6">
        //                     <div className={Styles.footer__contact__option}>
        //                         <div className={Styles.option__item}><i className="fa fa-phone" /> (+12) 345 678 910</div>
        //                         <div className={`${Styles.option__item} ${Styles.email}`}><i className="fa fa-envelope-o" /> Colorlib@gmail.com</div>
        //                     </div>
        //                 </div>
        //             </Row>
        //         </div>
        //         <Row className="row">
        //             <div className="col-lg-4 col-md-4">
        //                 <div className={Styles.footer__about}>
        //                     <div className={Styles.footer__logo}>
        //                         <a className="navbar-brand" href="/UserHome">
        //                             <span style={{ fontWeight: 'bold', color: 'white', fontSize: "25px" }}>Auto</span>
        //                             <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "27px" }}>Parts</span>
        //                         </a>
        //                     </div>
        //                     <p>Any questions? Let us know in store at 625 Gloria Union, California, United Stated or call us
        //                         on (+1) 96 123 8888</p>
        //                     <div className={Styles.footer__social}>
        //                         <a href="#" className="facebook"><i className="fa fa-facebook" /></a>
        //                         <a href="#" className="twitter"><i className="fa fa-twitter" /></a>
        //                         <a href="#" className="google"><i className="fa fa-google" /></a>
        //                         <a href="#" className="skype"><i className="fa fa-skype" /></a>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-lg-2 offset-lg-1 col-md-3">
        //                 <div className={Styles.footer__widget}>
        //                     <h5>Infomation</h5>
        //                     <ul>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Purchase</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Payemnt</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Shipping</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Return</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="col-lg-2 col-md-3">
        //                 <div className={Styles.footer__widget}>
        //                     <h5>Infomation</h5>
        //                     <ul>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Hatchback</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Sedan</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> SUV</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Crossover</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="col-lg-3 col-md-6">
        //                 <div className={Styles.footer__brand}>
        //                     <h5>Top Brand</h5>
        //                     <ul>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Abarth</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Acura</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Alfa Romeo</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Audi</a></li>
        //                     </ul>
        //                     <ul>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> BMW</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Chevrolet</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Ferrari</a></li>
        //                         <li><a href="#"><i className="fa fa-angle-right" /> Honda</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </Row>
        //     </div>
        // </footer>
        <footer className="footer set-bg" style={{
            backgroundImage: `url(${footerBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <div className="container">
                <div className="footer__contact">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="footer__contact__title">
                                <h2>Contact Us Now!</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="footer__contact__option">
                                <div className="option__item"><i className="fa fa-phone" /> (+12) 345 678 910</div>
                                <div className="option__item email"><i className="fa fa-envelope-o" /> Colorlib@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="footer__about">
                            <div className="footer__logo">
                                <a className="navbar-brand" href="/UserHome">
                                    <span style={{ fontWeight: 'bold', color: 'white', fontSize: "25px" }}>Auto</span>
                                    <span style={{ fontWeight: 'bold', color: '#c92014', fontSize: "27px" }}>Parts</span>
                                </a>
                            </div>
                            <p>Any questions? Let us know in store at 625 Gloria Union, California, United Stated or call us
                                on (+1) 96 123 8888</p>
                            {/* <div className="footer__social">
                                <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                                <a href="#" className="twitter"><i className="fa fa-twitter" /></a>
                                <a href="#" className="google"><i className="fa fa-google" /></a>
                                <a href="#" className="skype"><i className="fa fa-skype" /></a>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3">
                        <div className="footer__widget">
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
                        <div className="footer__widget">
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
                        <div className="footer__brand">
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
                </div>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                {/* <div className="footer__copyright__text">
      <p>Copyright © All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
    </div> */}
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </div>
        </footer>

    );
}

export default Footer;
