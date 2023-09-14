/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AdminUsers from "layouts/Admin-Users/index";
import AddAdmin from "layouts/Admin-Users/data/addAdmin"
import EditAdmin from "layouts/Admin-Users/data/editAdmin"
import EditProfile from "layouts/profile/data/editProfile"
import CategoryManagement from "layouts/categoryManagement/data/category"
import AddCategory from "layouts/categoryManagement/data/addCategory"
import EditCategory from "layouts/categoryManagement/data/editCategory"
import BrandManagement from "layouts/BrandManagement/data/brand"
import AddBrand from "layouts/BrandManagement/data/addBrand"
import EditBrand from "layouts/BrandManagement/data/editBrand"
import ProductManagement from "layouts/ProductManagement/data/product"
import AddProduct from "layouts/ProductManagement/data/addProduct"
import EditProduct from "layouts/ProductManagement/data/editProduct"
import UserHome from "UserFrontEnd/UserHome"
import Product from "UserFrontEnd/Product"
import About from "UserFrontEnd/About"
import Contact from "UserFrontEnd/Contact"
import Checkout from "UserFrontEnd/Checkout";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Basket from "examples/Icons/Basket";
import Cart from "UserFrontEnd/Cart"
import Wishlist from "UserFrontEnd/Wishlist"
import ProductDetails from "UserFrontEnd/productDetails"
import UserSignUp from "UserFrontEnd/userSignUp";
import UserLogin from "UserFrontEnd/userLogin";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin-Users",
    key: "admin-users",
    route: "/admin-users",
    icon: <CustomerSupport size="12px" />,
    component: <AdminUsers />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Add Admin",
    key: "add-admin",
    route: "/addAdmin",
    icon: <CustomerSupport size="12px" />,
    component: <AddAdmin />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Edit Admin",
    key: "edit-admin",
    route: "/editAdmin/:id",
    icon: <CustomerSupport size="12px" />,
    component: <EditAdmin />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Edit Profile",
    key: "edit-profile",
    route: "/editProfile/:id",
    icon: <CustomerSupport size="12px" />,
    component: <EditProfile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Category Management",
    key: "category",
    route: "/categoryManagement",
    icon: <Office size="12px" />,
    component: <CategoryManagement />,
    noCollapse: true,
  },
  {
      // type: "collapse",
      name: "Add Category",
      key: "add-category",
      route: "/addCategory",
      icon: <CustomerSupport size="12px" />,
      component: <AddCategory />,
      noCollapse: true,
    },
    {
      // type: "collapse",
      name: "Edit Category",
      key: "edit-category",
      route: "/editCategory/:id",
      icon: <CustomerSupport size="12px" />,
      component: <EditCategory />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "BrandManagement",
      key: "brand",
      route: "/brandManagement",
      icon: <Cube size="12px" />,
      component: <BrandManagement />,
      noCollapse: true,
    },
    {
      // type: "collapse",
      name: "Add Brand",
      key: "add-brand",
      route: "/addBrand",
      icon: <CustomerSupport size="12px" />,
      component: <AddBrand />,
      noCollapse: true,
    },
    {
      // type: "collapse",
      name: "Edit Brand",
      key: "edit-brand",
      route: "/editBrand/:id",
      icon: <CustomerSupport size="12px" />,
      component: <EditBrand />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Product Management",
      key: "productMngt",
      route: "/productManagement",
      icon: < Basket size="12px" />,
      component: <ProductManagement />,
      noCollapse: true,
    },
    {
      // type: "collapse",
      name: "Add Product",
      key: "add-product",
      route: "/addProduct",
      icon: <CustomerSupport size="12px" />,
      component: <AddProduct />,
      noCollapse: true,
    },
    {
      // type: "collapse",
      name: "Edit Product",
      key: "edit-product",
      route: "/editProduct/:id",
      icon: <CustomerSupport size="12px" />,
      component: <EditProduct />,
      noCollapse: true,
    },
  {
    // type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "UserHome",
    key: "userHome",
    route: "/userHome",
    icon: <Shop size="12px" />,
    component: <UserHome />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Product",
    key: "product",
    route: "/product",
    icon: <Shop size="12px" />,
    component: <Product />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "About",
    key: "about",
    route: "/about",
    icon: <Shop size="12px" />,
    component: <About />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Contact",
    key: "contact",
    route: "/contact",
    icon: <Shop size="12px" />,
    component: <Contact />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Cart",
    key: "cart",
    route: "/cart",
    icon: <Shop size="12px" />,
    component: <Cart />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Wishlist",
    key: "Wishlist",
    route: "/wishlist",
    icon: <Shop size="12px" />,
    component: <Wishlist />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Checkout",
    key: "Checkout",
    route: "/checkout",
    icon: <Shop size="12px" />,
    component: <Checkout />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "productDetails",
    key: "productDetails",
    route: "/productDetails/:id",
    icon: <Shop size="12px" />,
    component: <ProductDetails />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "UserSignUp",
    key: "UserSignUp",
    route: "/UserSignUp",
    icon: <Shop size="12px" />,
    component: <UserSignUp />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "UserLogin",
    key: "UserLogin",
    route: "/UserLogin",
    icon: <Shop size="12px" />,
    component: <UserLogin />,
    noCollapse: true,
  },
];

export default routes;
