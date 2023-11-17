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
import ImageGallery from "react-image-gallery";

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
    const [activeImage, setActiveImage] = useState('');

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:8000/user/getProductById/${id}`);
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

    const handleImageClick = (image) => {
        setActiveImage(image);
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
        <div >
            <Header />



            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                        <div className="ecommerce-gallery" data-mdb-zoom-effect="true" data-mdb-auto-height="true">
                                <div className="row py-3 shadow-5">
                                    <div className="col-12 mb-1">
                                        <div className="lightbox">
                                            <img src={`http://localhost:8000/${activeImage || product.images[0]}`} alt="Gallery image 1" className="ecommerce-gallery-main-img active w-100" />
                                        </div>
                                    </div>
                                    {product.images.map((image, index) => (
                                        <div key={index} className="col-3 mt-1">
                                            <img
                                                src={`http://localhost:8000/${image}`}
                                                data-mdb-img={image}
                                                alt={`Gallery image ${index + 2}`}
                                                className={index === 0 ? 'active w-100' : 'w-100'}
                                                onClick={() => handleImageClick(image)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                {/* <h4 className="title text-dark">
                                    {product.productName}
                                </h4> */}
                                <span className="h4">{product.productName}</span>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fas fa-star-half-alt" />
                                        <span className="ms-1">
                                            4.5
                                        </span>
                                    </div>
                                    {/* <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1" />154 orders</span>
                                    <span className="text-success ms-2">In stock</span> */}
                                </div>
                                <div className="mb-3">
                                    <span className="h5">Rs.{product.price}</span>
                                    <span className="text-muted">/per item</span>
                                </div>
                                <p>
                                    {product.description}
                                </p>
                                <div className="d-flex  gap-3 mb-3">
                                    <a onClick={() => handleAddToCart(product)} className="ripple ripple-surface btn btn-danger"> <i className="me-1 fa fa-shopping-basket" /> Add to cart </a>
                                    <a onClick={() => handleAddToWishlist(product)} className="ripple ripple-surface btn btn-warning"> <i className="me-1 fa fa-heart fa-lg" /> Wishlist </a>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            {/* content */}
            <Footer />
        </div>
    );
}

export default ProductDetails;
