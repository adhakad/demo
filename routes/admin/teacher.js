var express = require('express');
var router = express.Router();
var teacherModel=require('../../modules/teacher');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
   destination:"./public/uploads/",
   filename:(req,file,cb)=>{
     cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
   }
 });
 var upload = multer({
   storage:Storage
 }).single('file');


 function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=teacherModel.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('teacher', { title: 'Password Management System', msg:'Email Already Exit' });

 }
 next();
  });
}
 

router.get('/', function(req, res, next) {
   res.render('teacher', { title: 'Teacher Details',msg:''});
});

router.post('/',upload,checkEmail,function(req, res, next) {
        var teachername=req.body.tname; 
        var teacher_uid = req.body.teacher_uid;
        var image = req.file.filename;
        var email=req.body.email;
        var password=req.body.password;
        var confpassword=req.body.confpassword;
        if(password !=confpassword){
          res.render('teacher', { title: 'Password Management System', msg:'Password not matched!' });
        }else{

          password =bcrypt.hashSync(req.body.password,10);
          var userDetails=new teacherModel({
          teachername:teachername,
          teacher_uid:teacher_uid,
          image:image,
          email:email,
          password:password,
        });
        userDetails.save((err,doc)=>{
        if(err) throw err;
        res.render('teacher', { title: 'Teacher Details', msg:'Teacher Details Insert Successfully' });
     }); 
    }
});

module.exports = router;