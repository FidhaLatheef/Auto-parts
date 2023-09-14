var express=require('express');
var router=express.Router();
var multer=require('multer')
var userController=require('../Controller/UserController');
var verifyToken=require('../Middlewares/verifyToken')

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

module.exports = router;
