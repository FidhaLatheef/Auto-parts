var express=require('express');
var router=express.Router();
var multer=require('multer')
var adminController=require('../Controller/AdminController');
var verifyToken=require('../Middlewares/AdminToken')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });
router.post("/signUp",upload.single('image'), adminController.adminSignUp);
router.post("/Login",adminController.adminLogin)

router.get("/adminUsers",verifyToken,adminController.adminUsers)
router.delete("/delete/:id",verifyToken,adminController.deleteAdmin)
router.get("/getAdminById/:id",verifyToken,adminController.getAdminById)
router.put("/editAdmin/:id",verifyToken,upload.single('image'),adminController.editAdmin)
router.put("/editProfile/:id",verifyToken,upload.single('image'),adminController.editProfile)
router.post("/Logout",verifyToken,adminController.adminLogout)
router.get('/profile',verifyToken,adminController.adminProfile)

module.exports=router;