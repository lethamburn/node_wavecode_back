const express = require("express");
const router = express.Router();
const Comment = require("./../models/Comment.model");

router.get("/", async(req, res, next) => {
    const comments = await Comment.find().populate('idUser');
    return res.status(200).json(comments);
    
});

router.post("/", async(req, res, next) =>{
    try {
        const { comment, idUser } = req.body;

        const newComment = new Comment({ comment, idUser });

        await newComment.save();
        return res.redirect('/comments');
        
    } catch (error) {
        return next(error);
    }
 } );

 module.exports = router;