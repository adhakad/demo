var express = require('express');
var router = express.Router();

var teacherModule=require('../../modules/teacher');

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

/* GET home page. */
function checkLoginUser(req,res,next){
  var userTokens=localStorages.getItem('userTokens');
  try {
    var decoded = jwt.verify(userTokens, 'loginTokens');
  } catch(err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorages === "undefined" || localStorages === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorages = new LocalStorage('./scratchteacher');
}


router.get('/:id', checkLoginUser,function(req, res, next) {
  var loginUsers=localStorages.getItem('loginUsers');
  var id =req.params.id;
  var getTeacher=teacherModule.findOne({teacher_uid:id});
  getTeacher.exec((err, data)=>{
    if(err) throw err;
    res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', loginUsers:loginUsers,msg:'',records:data });
  });
});


  module.exports = router;