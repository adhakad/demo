var express = require('express');
var router = express.Router();
var classModule=require('../../modules/class');
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));


var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static('public'))


/* GET home page. */
function checkLoginUserss(req,res,next){
  var userTokenss=localStoragess.getItem('userTokenss');
  try {
    if(req.session.student_name){
      var decoded = jwt.verify(userTokenss, 'loginTokenss');
    }else {
      res.redirect('/');
    }

  } catch(err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStoragess === "undefined" || localStoragess === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStoragess = new LocalStorage('./scratchstudent');
}


router.get('/:id',checkLoginUserss, function(req, res, next) {
  var loginUserss=localStoragess.getItem('loginUserss');
    var id = req.params.id;
    var getClass=classModule.findOne({teacher_id:id});
    getClass.exec(function(err,data){
      
     
      if(err) throw err;
     res.render('getClass', { title: 'Get Class' ,records:data,loginUserss:loginUserss});
  
    });
  });

  module.exports = router;