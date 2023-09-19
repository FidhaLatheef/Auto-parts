var express=require('express');
var router=express.Router();
var multer=require('multer')
var verifyToken=require('../Middlewares/AdminToken')
var categoryController=require('../Controller/CategoryController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });



router.post('/addCategory',verifyToken,upload.single('image'),categoryController.addCategory)
router.get('/categoryList',verifyToken,categoryController.categoryList)
router.delete('/deleteCategory/:id',verifyToken,categoryController.deleteCategory)
router.get('/getCategoryById/:id',verifyToken,categoryController.getCategoryById)
router.put('/editCategory/:id',verifyToken,upload.single('image'),categoryController.editCategory)

module.exports=router;