import React from "react";
import styles from "../css/style.module.css";
import search from "assets/img/icon/search.png";
import heart from "assets/img/icon/heart.png";
import cart from "assets/img/icon/cart.png";
import Footer from "./userFrontEnd/footer";
import payment from "assets/img/shop-details/details-payment.png";
import { Image, Row, Col, Tab, Nav } from "react-bootstrap";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TopNavBar from "./userFrontEnd/topNavBar";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function Shopdetails() {
  const [id, setId] = useState(""); // Add this state variable to store the id
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [offerprice, setOfferprice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [tag, setTag] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [List, setList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("");
  const [activeTabs, setActiveTabs] = useState("");
  const navigate = useNavigate("");
  const location = useLocation();
  const { state } = location;
  const [tabCount, setTabCount] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [message, setMessage] = useState("");
  const [isAddedToWish, setIsAddedToWish] = useState(false);
  const [wish, setWish] = useState("");
  // const tabCount = 4;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const handleTabsClick = (tabId) => {
    setActiveTabs(tabId);
  };

  useEffect(() => {
    setActiveTab("tabs-1");
  }, []);
  useEffect(() => {
    setActiveTabs("tabs-5");
  }, []);

  const handleProductClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/users/detailproduct/${id}`);
      const selectedProduct = response.data;

      const state = {
        id,
        productName: selectedProduct.productName,
        price: selectedProduct.price,
        offerprice: selectedProduct.offerprice,
        description: selectedProduct.description,
        category: selectedProduct.category,
        tag: selectedProduct.tag,
        brand: selectedProduct.brand,
        material: selectedProduct.material,
        image: selectedProduct.images,
      };
      console.log(state);
      navigate(`/shopdetails`, { state });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/listproduct")
      .then((response) => {
        console.log("Response data:", response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (state) {
      const {
        id,
        productName,
        price,
        offerprice,
        description,
        category,
        tag,
        brand,
        material,
        image,
      } = state;

      setId(id); // Set the id in the state variable
      setProductName(productName || "");
      setPrice(price || "");
      setOfferprice(offerprice || "");
      setDescription(description || "");
      setCategory(category || "");
      setTag(tag || "");
      setBrand(brand || "");
      setMaterial(material || "");
      setSelectedProductCategory(category);

      if (image && Array.isArray(image) && image.length > 0) {
        const previewImages = image.map((imageName) => {
          return `http://localhost:8000/uploads/${imageName}`;
        });
        setImagePreview(previewImages);
        setTabCount(previewImages.length);
      } else {
        setImagePreview([]);
      }
    }
  }, [state]);
  const relatedProducts = List.filter((product) => product.category === selectedProductCategory);
  const relatedProductsToDisplay = relatedProducts.slice(0, 4);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id,
      productName,
      price,
      offerprice,
      image: imagePreview[0],
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const isProductInCart = existingCart.some((item) => item.id === cartItem.id);

    if (!isProductInCart) {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setIsAddedToCart(true);
      setMessage("Product added to cart!");
    } else {
      setIsAddedToCart(false);
      setMessage("Product is already in the cart.");
    }
  };

  const handleAddToWish = () => {
    const wishItem = {
      id,
      productName,
      price,
      offerprice,
      image: imagePreview[0],
      quantity: quantity,
    };

    const existingWish = JSON.parse(localStorage.getItem("wishlist")) || [];

    const isProductInWish = existingWish.some((item) => item._id === wishItem.id);

    if (!isProductInWish) {
      existingWish.push(wishItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWish));
      setIsAddedToWish(true);
      setWish("Product added to wish!");
    } else {
      setIsAddedToWish(false);
      setWish("Product is already in the wish.");
    }
  };

  const handleAddToWishlist = (product) => {
    const wishItem = {
      id: product._id,
      productName: product.productname,
      price: product.price,
      offerprice: product.offerprice,
      image: `http://localhost:8000/uploads/${product.images[0]}`,
      quantity: 1,
    };
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = existingWishlist.some((item) => item._id === wishItem.id);
    if (!isProductInWishlist) {
      existingWishlist.push(wishItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      console.log("Product added to wish!");
    } else {
      console.log("Product is already in the wish.");
    }
  };

  const handleAddToCartItem = (product) => {
    console.log("Product being added to cart:", product);
    const cartItem = {
      id: product._id,
      productName: product.productname,
      price: product.price,
      offerprice: product.offerprice,
      image: `http://localhost:8000/uploads/${product.images[0]}`,
      quantity: 1,
    };
    console.log(cartItem);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === cartItem.id);
    if (!isProductInCart) {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("Product added to cart!");
    } else {
      console.log("Product is already in the cart.");
    }
  };

  return (
    <div>
      {/* <div id="preloder">
        <div className={styles.loader} />
      </div> */}
      <TopNavBar />
      <section className="shop-details">
        <div className={styles.product_details_pic}>
          <div className={styles.container} style={{ marginLeft: "180px" }}>
            <Tab.Container activeKey={activeTab}>
              <Row className={styles.row}>
                <div className="col-lg-12">
                  <div className={styles.product_details_breadcrumb}>
                    <Link to="/home">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <span>Product Details</span>
                  </div>
                </div>
              </Row>
              <Row className={styles.row} style={{ marginTop: "50px" }}>
                <Col className="col-lg-4 col-md-5">
                  <PerfectScrollbar className={styles.scrollablecontainer}>
                    <Nav
                      className={`${styles.nav} ${styles.navtabs}`}
                      style={{ width: "20px" }}
                      role="tablist"
                    >
                      {[...Array(tabCount)].map((_, index) => (
                        <Nav.Item key={index} className={styles.navitem}>
                          <Nav.Link
                            className={styles.navlink}
                            eventKey={`tabs-${index + 1}`}
                            onClick={() => handleTabClick(`tabs-${index + 1}`)}
                          >
                            <div
                              className={`${styles.product_thumb_pic} ${styles.setbg}`}
                              style={{
                                backgroundImage: `url(${imagePreview[index]})`,
                              }}
                            ></div>
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </PerfectScrollbar>
                </Col>
                <Col className="col-lg-8 col-md-9">
                  <Tab.Content style={{ height: "350px", width: "400px", marginLeft: "200px" }}>
                    {[...Array(tabCount)].map((_, index) => (
                      <Tab.Pane key={index} eventKey={`tabs-${index + 1}`}>
                        <div className={styles.product_detailspic_item}>
                          <img src={imagePreview[index]} alt="" />
                        </div>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
        <div className={styles.product_details_content}>
          <div className={styles.container} style={{ marginLeft: "180px", marginTop: "200px" }}>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className={styles.product_details_text}>
                  <div
                    style={{
                      height: "350px",
                      backgroundColor: "black",
                      paddingTop: "40px",
                      textAlign: "justify",
                      paddingLeft: "80px",
                    }}
                  >
                    <h2 style={{ color: "white", marginLeft: "200px" }}>Product Details</h2>
                    <Row>
                      <Col style={{ marginTop: "25px" }}>
                        <h2 style={{ color: "white" }}>{productName}</h2>
                        <div className={styles.rating}>
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                          <span style={{ color: "white" }}> - 5 Reviews</span>
                        </div>
                        <h3 style={{ color: "white" }}>
                          ₹{offerprice}
                          <span>₹{price}</span>
                        </h3>
                      </Col>
                      <Col style={{ textAlign: "justify", paddingLeft: "80px", marginTop: "25px" }}>
                        <h5 style={{ color: "white" }}>Category: {category}</h5>
                        <h5 style={{ color: "white" }}>Tag: {tag}</h5>
                        <h5 style={{ color: "white" }}>Brand: {brand}</h5>
                        <h5 style={{ color: "white" }}>Material: {material}</h5>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className={styles.product_detailscart_option}
                    style={{ marginTop: "50px" }}
                  >
                    <div className={styles.quantity}>
                      <div className={styles.proqty}>
                        <button onClick={handleDecrement}>-</button>
                        <input type="text" value={quantity} />
                        <button onClick={handleIncrement}>+</button>
                      </div>
                    </div>
                    {message ? (
                      <span style={{ color: isAddedToCart ? "green" : "red", fontWeight: "bold" }}>
                        {message}
                      </span>
                    ) : (
                      <a href="#" className={styles.primarybtn} onClick={handleAddToCart}>
                        Add to Cart
                      </a>
                    )}
                  </div>
                  <div className={styles.product_detailsbtns_option}>
                    {wish ? (
                      <span style={{ color: isAddedToWish ? "green" : "red", fontWeight: "bold" }}>
                        {wish}
                      </span>
                    ) : (
                      <a href="#" className={styles.primarybtn} onClick={handleAddToWish}>
                        Add to Wishlist
                      </a>
                    )}
                    <a href="#">
                      <i className="fa fa-exchange" />
                      Add To Compare
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Tab.Container activeKey={activeTabs}>
              <Row className={styles.row}>
                <div className="col-lg-12">
                  <div className={styles.product_details_tab}>
                    <Nav
                      className={`${styles.nav} ${styles.navtabs}`}
                      role="tablist"
                      style={{ marginTop: "-80px" }}
                    >
                      <Nav.Item className={styles.navitem}>
                        <Nav.Link
                          className={styles.navlink}
                          eventKey="tabs-5"
                          onClick={() => handleTabsClick("tabs-5")}
                          style={{ color: activeTabs === "tabs-5" ? "black" : "" }}
                        >
                          Description
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className={styles.navitem}>
                        <Nav.Link
                          className={styles.navlink}
                          eventKey="tabs-6"
                          onClick={() => handleTabsClick("tabs-6")}
                          style={{ color: activeTabs === "tabs-6" ? "black" : "" }}
                        >
                          Customer Previews(5)
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className={styles.navitem}>
                        <Nav.Link
                          className={styles.navlink}
                          eventKey="tabs-7"
                          onClick={() => handleTabsClick("tabs-7")}
                          style={{ color: activeTabs === "tabs-7" ? "black" : "" }}
                        >
                          Additional information
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      className="tab-content"
                      style={{ textAlign: "justify", width: "700px", marginLeft: "230px" }}
                    >
                      <Tab.Pane eventKey="tabs-5">
                        <div className={styles.product_detailstab_content}>
                          <p className={styles.note}>{description}</p>
                          <div className={styles.product_detailstabcontent_item}>
                            <h5>{productName}</h5>
                            <p>₹{offerprice}</p>
                            <p>{description}</p>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tabs-6">
                        <div className={styles.product_detailstab_content}>
                          <div className={styles.product_detailstabcontent_item}>
                            <h5>Customer Review</h5>
                            <p>
                              <div className={styles.rating}>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                                <span style={{ color: "white" }}> - 5 Reviews</span>
                              </div>
                            </p>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tabs-7">
                        <div className={styles.product_detailstab_content}>
                          <p className={styles.note}>{description}</p>
                          <div className={styles.product_detailstabcontent_item}>
                            <h5>{productName}</h5>
                            <div>
                              <h8>Category: {category}</h8>
                              <br />
                              <h8>Tag: {tag}</h8>
                              <br />
                              <h8>Brand: {brand}</h8>
                              <br />
                              <h8>Material: {material}</h8>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </Row>
            </Tab.Container>
            <div
              className={styles.product_detailslast_option}
              style={{ textAlign: "center", marginTop: "50px" }}
            >
              <h5>
                <span>Guaranteed Safe Checkout</span>
              </h5>
              <img src={payment} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.related} ${styles.spad}`}>
        <div className={styles.container} style={{ marginLeft: "180px" }}>
          <Row className={styles.row}>
            <div className="col-lg-12">
              <h3 className={styles.relatedtitle}>Related Product</h3>
            </div>
          </Row>
          <div className="col-lg-9" style={{ marginLeft: "180px" }}>
            <Row className={styles.row}>
              {relatedProductsToDisplay.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"
                  key={index}
                  style={{
                    height: "420px",
                    width: "200px",
                  }}
                >
                  <div
                    className={`${styles.product__item} ${styles.sale}`}
                    onClick={() => handleProductClick(item._id)}
                  >
                    <div
                      className={`${styles.product_item_pic} ${styles.setbg}`}
                      style={{
                        backgroundImage: `url(http://localhost:8000/uploads/${item.images[0]})`,
                        // height: "280px",
                        // width: "200px",
                      }}
                    >
                      <ul className={styles.product__hover}>
                        <li>
                          <a onClick={() => handleAddToWishlist(item)} href="#">
                            <Image src={heart} alt="heart" />
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleAddToCartItem(item)} href="#">
                            <Image src={cart} alt="cart" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image src={search} alt="search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.product_item_text}>
                      <h6>{item.productname}</h6>
                      <a href="#" className="add-cart">
                        {item.productname}
                      </a>
                      <h5>Offer price: ₹{item.offerprice}</h5>
                      <h6>₹{item.price}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shopdetails;