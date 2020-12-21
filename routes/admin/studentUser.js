var express = require('express');
var router = express.Router();
var studentUserModel=require('../../modules/studentUser');
var bodyParser = require('body-parser');
var path = require('path');

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));


 function checkEmail(req,res,next){
  var student_id=req.body.student_id;
  var checkExitStudent_id=studentUserModel.findOne({student_id:student_id});
  checkExitStudent_id.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('studentUser', { title: 'Password Management System', msg:'Student-Id Already Exit' });

 }
 next();
  });
}
 

router.get('/', function(req, res, next) {
   res.render('studentUser', { title: 'Student-User Details',msg:''});
});

router.post('/',checkEmail,function(req, res, next) {
        var student_name=req.body.student_name; 
        var class_name = req.body.class_name;
        var student_id=req.body.student_id;
        var password=req.body.password;
        var confpassword=req.body.confpassword;
        if(password !=confpassword){
          res.render('studentUser', { title: 'Password Management System', msg:'Password not matched!' });
        }else{

          password =bcrypt.hashSync(req.body.password,10);
          var userDetails=new studentUserModel({
          student_name:student_name,
          class_name:class_name,
          student_id:student_id,
          password:password,
        });
        userDetails.save((err,doc)=>{
        if(err) throw err;
        res.render('studentUser', { title: 'Teacher Details', msg:'Student-User Details Insert Successfully' });
     }); 
    }
});

module.exports = router;