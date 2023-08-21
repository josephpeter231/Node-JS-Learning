const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    snippets : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
    
},{timestamps: true})

const Blog=mongoose.model('Blog',blogSchema)   //singular of collection Name
module.exports=Blog;