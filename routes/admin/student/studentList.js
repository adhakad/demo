var express = require('express');
var router = express.Router();
var studentUserModule=require('../../../modules/studentUser');
var getStudentUser= studentUserModule.find({});

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/', function(req, res, next) {
    getStudentUser.exec(function(err,data){
    if(err) throw err;
    res.render('./admin/students/studentsList', { title: 'TechBista Solutions', records:data });
  });
});

router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var studentDelete=studentUserModule.findByIdAndDelete(id);
  studentDelete.exec(function(err){
    if(err) throw err;
    res.redirect('/studentList');
  });
});

  module.exports = router;