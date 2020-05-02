const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//posts routes-----------------

//get posts
router.get('/',async (req,res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json({sucess:true,msg:"Post readed sucessfully",data:posts,err:""});
        console.log('Posts readed successfully');
    } catch (err) {
        res.status(404).json({sucess:false,msg:"Post wasn't readed",data:"",err:err});
        console.error(err);
    }
});
//post posts
router.post('/',async (req,res)=>{
    const post = new Post ({
        name: req.body.name,
        desc: req.body.desc
    });
    try {
        const savePost = await post.save();
        res.status(200).json(savePost);
        console.log('Posts added successfully');
    } catch (err) {
        res.status(404).json({message:err});
        console.error(err);
    }
});
//get one post by id
router.get('/:postId',async (req,res) => {
   try {
       const post = await Post.findById(req.params.postId);
       res.status(200).json({sucess:true,msg:"Post readed sucessfully",data:post,err:""});
       console.log('Post readed successfully');
   } catch (err) {
        res.status(404).json({sucess:false,msg:"Post wasn't readed",data:"",err:err});
        console.error(err);
   } 
});
//delete post by id
router.delete('/:postId',async (req,res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        if (removePost.deletedCount>0) {
            res.status(200).json({sucess:true,msg:"Post deleted sucessfully",data:removePost,err:""});
            console.log('Post deleted successfully');
        } else {
            res.status(404).json({sucess:false,msg:"Post wasn't deleted",data:"",err:err});
            console.error(err);
        }
        
    } catch (err) {
        res.status(404).json({sucess:false,msg:"Post wasn't deleted",data:"",err:err});
        console.error(err);
    }
});
//update post by id
router.patch('/:postId',async (req,res) =>{
    try {
        const updatePost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{name:req.body.name}}
            );
        res.status(200).json({sucess:true,msg:"Post update sucessfully",data:updatePost,err:""});
        console.log('Post updated successfully');
    } catch (err) {
        res.status(404).json({sucess:false,msg:"Post wasn't updated",data:"",err:err});
        console.error(err);
    }
})
//export routes-----------------    
module.exports = router;