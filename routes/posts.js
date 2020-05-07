const router = require('express').Router();
const Post = require('../models/Post');
const { notifyMessage } = require('../notification');
const { postValidation } = require('../validation');
//posts routes----------------------------------

//get posts
router.get('/',async (req,res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json(notifyMessage(true,'Post readed successfully',posts,''));
        console.log('Posts readed successfully');
    } catch (err) {
        res.status(400).json(notifyMessage(false,"Post wasn't readed","",err));
        console.error(err);
    }
});
//post posts
router.post('/',async (req,res)=>{
    // Check validation
    const { error } = postValidation(req.body);
    if(error) return res.status(400).send(notifyMessage(false,"Validation error","",error.details[0].message));
    const post = new Post ({
        name: req.body.name,
        desc: req.body.desc
    });
    try {
        const savePost = await post.save();
        res.status(200).json(notifyMessage(true,'Post added successfully',savePost,''));
        console.log('Posts added successfully');
    } catch (err) {
        res.status(400).json(notifyMessage(false,"Post wasn't added","",err));
        console.error(err);
    }
});
//get one post by id
router.get('/:postId',async (req,res) => {
   try {
       const post = await Post.findById(req.params.postId);
       res.status(200).json(notifyMessage(true,'Post added successfully',post,''));
       console.log('Post readed successfully');
   } catch (err) {
        res.status(400).json(notifyMessage(false,"Post wasn't readed","",err));
        console.error(err);
   } 
});
//delete post by id
router.delete('/:postId',async (req,res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        if (removePost.deletedCount>0) {
            res.status(200).json(notifyMessage(true,'Post added successfully',removePost,''));
            console.log('Post deleted successfully');
        } else {
            res.status(400).json(notifyMessage(false,"Post wasn't deleted","",err));
            console.error(err);
        }
        
    } catch (err) {
        res.status(400).json(notifyMessage(false,"Post wasn't deleted","",err));
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
        res.status(200).json(notifyMessage(true,'Post added successfully',updatePost,''));
        console.log('Post updated successfully');
    } catch (err) {
        res.status(400).json(notifyMessage(false,"Post wasn't updated","",err));
        console.error(err);
    }
})
//export routes---------------------------------
module.exports = router;