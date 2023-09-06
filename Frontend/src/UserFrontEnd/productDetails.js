import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Styles from "../css/style3.module.css";
import styles from "../css/style.module.css";
import Header from "UserFrontEnd/components/Header";
import Footer from "UserFrontEnd/components/Footer";
import HeroBg from "assets/images/breadcrumb-bg.jpg";
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Icon } from '@mui/material';

function ProductDetails() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("tabs-1");
    const [tabCount, setTabCount] = useState("");
    const [imagePreview, setImagePreview] = useState([])
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        price: '',
        images: [],
    });

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = token;
                const response = await axios.get(`http://localhost:8000/product/getProductById/${id}`);
                setProduct(response.data);
                const image = response.data.images;
                if (image && Array.isArray(image) && image.length > 0) {
                    const previewImages = image.map((imageName) => {
                        return `http://localhost:8000/${imageName}`;
                    });
                    setImagePreview(previewImages);
                    setTabCount(previewImages.length);
                } else {
                    setImagePreview([]);
                }
            } catch (error) {
                console.log('Error fetching product details:', error);
            }
        }
        fetchProductDetails();
    }, [id]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const isProductInCart = existingCart.some((item) => item.id === product._id);

        if (!isProductInCart) {
            const cartItem = {
                id: product._id,
                productname: product.productName,
                image: `http://localhost:8000/${product.images[0]}`,
                price: product.price,
                quantity: 1,
            };

            existingCart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(existingCart));
            alert('Product added to the cart !!');

            window.location.href = "/cart";
        } else {
            alert('Product is already in the cart');
            
        }
    };
    const handleAddToWishlist = (product) => {
        const existingWish = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isProductInWish = existingWish.some((item) => item.id === product._id);
      
        if (!isProductInWish) {
            const wishlistItem = {
                id: product._id,
                productname: product.productName,
                image: `http://localhost:8000/${product.images[0]}`,
                price: product.price,
                quantity: 1,
            };
      
            existingWish.push(wishlistItem);
            localStorage.setItem("wishlist", JSON.stringify(existingWish));
            alert('Product added to the wishlist !!')
      
            window.location.href = "/wishlist"; 
        } else {
          alert('Product is already in the wishlist');
        }
        
      };

    return (
        <div>
            <Header />
            <div className={`${styles.breadcrumboption} ${Styles.setbg}`} style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="col-lg-12 text-center">
                    <div className={styles.breadcrumb__text}>
                        <h2>Product Details</h2>
                    </div>
                </div>
            </div>
            <div className={Styles.tabcontent} style={{ marginTop: "10px" }}>
                <Tab.Container activeKey={activeTab}>
                    <Row className="row" >
                        <Col className="col-lg-4 col-md-5">
                            <PerfectScrollbar style={{ height: "450px" }}>
                                <Nav
                                    className={`${Styles.nav} ${Styles.navtabs}`}
                                    role="tablist"
                                >
                                    {[...Array(tabCount)].map((_, index) => (
                                        <Nav.Item key={index} className={Styles.navitem}>
                                            <Nav.Link
                                                className={Styles.navlink}
                                                eventKey={`tabs-${index + 1}`}
                                                onClick={() => handleTabClick(`tabs-${index + 1}`)}
                                            >
                                                <img src={imagePreview[index]} alt="" style={{ width: "400px", height: "200px" }} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </PerfectScrollbar>
                        </Col>
                        <Col className="col-lg-8 col-md-9">
                            <Tab.Content style={{ height: "450px", width: "600px", marginLeft: "200px" }}>
                                {[...Array(tabCount)].map((_, index) => (
                                    <Tab.Pane key={index} eventKey={`tabs-${index + 1}`}>
                                        <div className={Styles.product_details_pic_item}>
                                            <img src={imagePreview[index]} alt="" style={{ height: "500px" }} />
                                        </div>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
            <div className={styles.productInfo} >
                <h1>{product.productName}</h1>
                <div className={Styles.rating}>
                    <Icon> <span className="material-symbols-outlined">
                        star_rate
                    </span></Icon>
                    <Icon> <span className="material-symbols-outlined">
                        star_rate
                    </span></Icon>
                    <Icon> <span className="material-symbols-outlined">
                        star_rate
                    </span></Icon>
                    <Icon> <span className="material-symbols-outlined">
                        star_rate
                    </span></Icon>
                    <Icon> <span className="material-symbols-outlined">
                        star_rate
                    </span></Icon>
                </div>
                <p className={styles.productPrice}>Rs.{product.price}</p>
                <p className={styles.productdescription}> {product.description}</p>
                <div className={styles.productButton}>
                    <button
                        className={`${styles.primarybtn} ${styles.cartButton}`}
                        onClick={() => handleAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                    <button
                        className={`${styles.primarybtn} ${styles.wishlistButton}`}
                        onClick={() => handleAddToWishlist(product)}
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
