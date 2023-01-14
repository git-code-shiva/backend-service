const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const Blog = require("../models/blogs");

const router = express.Router();
router.use(bodyParser.json());


router.post("/posts", async (req, res) => {
    try{
        // console.log("I m in create posts");
        console.log(req.body);
        console.log(req.user);

        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            user: req.user,
            image: req.body.image
        });

        res.json({
            status: "Successfully created",
            blog
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});

router.get("/posts", async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.json({
            status: "Success",
            blogs
        })

    }catch(e){
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.put("/posts/:postid", async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        });
        if(!blog){
            return res.status(404).json({
                status: "Failed",
                message: "Blog post not found"
            });
        }
        res.json({
            status:"success",
            blog
        });
    }catch(e){
        return res.status(500).json({
            status:"Failed",
            message: e.message
        });
    }
})

router.delete("/posts/:postid",async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog){
            return res.status(400).json({
                status: "Failed",
                message: "Blog post not found"
            });
        }
        res.json({
            status: "Success",
            message:"Blog post deleted successfully"
        });
    }catch(e){
        return res.status(500).json({
            status:"Failed",
            message: e.message
        });
    }
})

module.exports = router;