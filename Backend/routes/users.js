var express=require('express');
var router=express.Router();
var multer=require('multer')
var userController=require('../Controller/UserController');
var orderController=require('../Controller/OrderController')
var otpController=require("../Controller/OtpController")
// var usertoken=require('../Middlewares/UserToken')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/signUp",upload.single('image'), userController.userSignUp);
router.post("/Login",userController.userLogin);

//----------------User Management------------//
router.get("/userList",userController.userList)
router.delete("/delete/:id",userController.deleteUser)
router.get("/getUserById/:id",userController.getUserById)
router.put("/editUser/:id",upload.single('image'),userController.editUser)
router.put("/changePassword/:id",userController.changePassword)

router.post("/sendOTP",otpController.sendOtp);
router.post("/verifyOTP",otpController.verifyOTP);
router.post("/resetPassword",otpController.resetPassword);

//----------------Order--------------------//
router.post("/addOrder",orderController.addOrder);
router.get("/orderListById/:id",orderController.orderListById);
router.get("/orderLists",orderController.orderLists);
router.post('/orderStatus/:id',orderController.addOrderStatus)

//---------------Brand---------------------//
router.get('/brandList',userController.brandList);

//--------------Category-------------------//
router.get('/categoryList',userController.categoryList)

//--------------Product-------------------//
router.get('/productList', userController.productList);
router.get('/getProductById/:id',userController.getProductById);

module.exports = router;
