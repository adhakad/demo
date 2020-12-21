const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true});
var conn =mongoose.Collection;
var classSchema =new mongoose.Schema({
    teacher_id: {
        type:String,
    },
    image_id:String,
	class_name: {
        type:Number, 
        },
    subject_name: {
        type:String, 
        },
    room_id: {
        type:Number, 
        },
    
});

var classModel = mongoose.model('class', classSchema);
module.exports=classModel;

//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority