const express=require('express');
const router=express.Router();
const bookModel=require('../models/Books');

router.get("/",async(req,res)=>{
    let books=await bookModel.find({});
    res.json(books);
})

router.get("/:id",async(req,res)=>{
    let books=await bookModel.find({});
    let book=books.find((u)=>u.title==req.params.id || u.id==req.params.id);
    if(!book){
        res.send("Sorry ! Not found😢");
    }else{
        res.json(book);
    }
})

module.exports=router;