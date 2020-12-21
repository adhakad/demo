var express = require('express');
var router = express.Router();
var studentUserModule=require('../../modules/studentUser');
var classModule=require('../../modules/class');

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

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


router.get('/:id', function(req, res, next) {
  var loginUserss=localStoragess.getItem('loginUserss');
  var id = req.params.id;
  var getClass=classModule.findOne({teacher_id:id});
  getClass.exec(function(err,data){
  if(err) throw err;
  if(req.session.student_name){
    res.redirect('/getClass/'+id);
  }else{
  res.render('studentUserLogin', { title: 'Password Management System', msg:'',records:data });
  }
});
});

router.post('/', function(req, res, next) {
  var teacher_id=req.body.teacher_id;
  var class_name=req.body.class_name;
  var student_name=req.body.student_name;
  var password=req.body.password;
  var checkUser=studentUserModule.findOne({student_name:student_name});
  checkUser.exec((err, data)=>{
   if(data==null){
    res.render('studentUserLogin', { title: 'Password Management System', msg:"Invalid Student User Name." });

   }else{
if(err) throw err;
var getUserID=data._id;
var getPassword=data.password;
if(bcrypt.compareSync(password,getPassword)){
  var token = jwt.sign({ userID: getUserID }, 'loginTokenss',{
    expiresIn:"1m",
  });
  localStoragess.setItem('userTokenss', token);
  localStoragess.setItem('loginUserss', student_name);
  
  req.session.student_name=student_name;
 
  
  res.redirect('/getClass/'+teacher_id);
}else{
  res.render('studentUserLogin', { title: 'Password Management System', msg:"Invalid Password." });

}
   }
   
  });
 
});




/*router.get('/getClass/:id',checkLoginUserss, function(req, res, next) {
  var loginUserss=localStoragess.getItem('loginUserss');
    var id = req.params.id;
    var getClass=classModule.findOne({teacher_id:id});
    getClass.exec(function(err,data){
      
    console.log(data.class_name); 
      if(err) throw err;
     res.render('getClass', { title: 'Get Class' ,records:data,loginUserss:loginUserss});
  
    });
  });*/







router.get('/logoutss', function(req, res, next) {
  localStoragess.removeItem('userTokenss');
  localStoragess.removeItem('loginUserss');
  res.redirect('/');
});

module.exports = router;