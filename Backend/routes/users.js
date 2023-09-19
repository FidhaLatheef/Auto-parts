var express=require('express');
var router=express.Router();
var multer=require('multer')
var userController=require('../Controller/UserController');
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

//----------------Order--------------------//
router.post("/addOrder",userController.addOrder);

//---------------Brand---------------------//
router.get('/brandList',userController.brandList);

//--------------Category-------------------//
router.get('/categoryList',userController.categoryList)

//--------------Product-------------------//
router.get('/productList', userController.productList);
router.get('/getProductById/:id',userController.getProductById);

module.exports = router;
