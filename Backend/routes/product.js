var express=require('express')
var router=express.Router()
var multer = require('multer');
var verifyToken=require('../Middlewares/verifyToken')
var productController=require('../Controller/ProductController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });
  
  
  router.post('/addProduct',verifyToken, upload.array('images'), productController.addProduct);
  router.get('/productList',verifyToken, productController.productList);
  router.delete('/deleteProduct/:id',verifyToken,productController.deleteProduct)
  router.get('/getProductById/:id',verifyToken,productController.getProductById);
  router.put('/editProduct/:id',verifyToken,upload.array('images'),productController.updateProductById)
  router.get('/filterProducts',verifyToken,productController.filterProducts)


module.exports=router;
