var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

/* GET home page. */

function checkLoginUsers(req,res,next){
  var userTokens=localStorages.getItem('userTokens');
  try {
    if(req.session.teacherEmail){
      var decoded = jwt.verify(userTokens, 'loginTokens');
    }else {
      res.redirect('/');
    }
    
  } catch(err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorages === "undefined" || localStorages === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorages = new LocalStorage('./scratchteacher');
}

router.get('/', function(req, res, next) {
  var loginUsers=localStorages.getItem('loginUsers');
  var teacher_uid = req.session.teacher_uid;
  if(req.session.teacherEmail){
    res.redirect('./teacher-admin-dashboard/'+teacher_uid);
  }else{
  res.render('teacher-login', { title: 'Password Management System', msg:'' });
  }
});

router.post('/', function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  var checkUser=teacherModule.findOne({email:email});
  checkUser.exec((err, data)=>{
   if(data==null){
    res.render('teacher-login', { title: 'Password Management System', msg:"Invalid Username." });
   }else{
if(err) throw err;
var teacher_uid = data.teacher_uid;
var getUserID=data._id;
var getPassword=data.password;
if(bcrypt.compareSync(password,getPassword)){
  var token = jwt.sign({ userID: getUserID }, 'loginTokens',{
    expiresIn:'1m',
  });
  localStorages.setItem('userTokens', token);
  localStorages.setItem('loginUsers', email);
  localStorages.setItem('loginUsers', teacher_uid);
  req.session.teacherEmail=email;
  req.session.teacher_uid=teacher_uid;
  console.log(req.session.teacher_uid);console.log(req.session.teacherEmail);
  res.redirect('./teacher-admin-dashboard/'+teacher_uid);
}else{
  res.render('teacher-login', { title: 'Password Management System', msg:"Invalid Password." });
}
   }
  });
});

router.get('/logouts', function(req, res, next) {
  localStorages.removeItem('userTokens');
  localStorages.removeItem('loginUsers');
  res.redirect('/');
});

module.exports = router;