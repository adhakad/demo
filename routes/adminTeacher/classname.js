var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');
var classModule=require('../../modules/class');


var bodyParser = require('body-parser');
router.use(express.static(__dirname+"./public/"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



const { check, validationResult } = require('express-validator');


router.get('/:id', function(req, res, next) {
   var id = req.params.id;
   var getTeacher= teacherModule.findOne({teacher_uid:id});
   getTeacher.exec(function(err,data){
      if(err) throw err;
     res.render('class', { title: 'Class Details',msg:'',records:data});
   }); 
});
 
router.post('/',function(req, res, next) { 
   var teacher_id=req.body.teacher_id; 
   var image_id=req.body.image_id;
   var class_name=req.body.class_name;  
   var subject_name=req.body.subject_name; 
   var room_id=req.body.room_id; 
   var userDetails=new classModule({
      teacher_id:teacher_id,
      image_id:image_id,
      class_name:class_name,
      subject_name:subject_name,
      room_id:room_id
    
    });
 userDetails.save((err,data)=>{
    if(err) throw err;  
      res.render('class', { title: 'Class Details', msg:'Class Details Insert Successfully',records:data });
   }); 
});

module.exports = router;
