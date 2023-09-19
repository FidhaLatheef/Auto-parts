var express=require('express');
var router=express.Router();
var multer=require('multer');
var verifyToken=require('../Middlewares/AdminToken')
var brandController=require('../Controller/BrandController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });


router.post('/addBrand',verifyToken,upload.single('image'),brandController.addBrand);
router.get('/brandList',verifyToken,brandController.brandList);
router.delete('/deleteBrand/:id',verifyToken,brandController.deleteBrand);
router.get('/getBrandById/:id',verifyToken,brandController.getBrandById);
router.put('/editBrand/:id',verifyToken,upload.single('image'),brandController.editBrand);




module.exports=router;