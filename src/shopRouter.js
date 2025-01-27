import express from "express";

import * as shopService from "./shopService.js";

const router = express.Router(); // Crea un nuevo enrutador


router.get("/", (req,res)=>{
    res.render("index");
});

router.get("/login", (req,res)=>{
    let userInfo={
        userName: req.body.userName,
        password: req.body.password,
    }

    let errorUser=[];
    let errorPassword=[];

    if(!userInfo.userName){
        errorUser.push(1);
    }
    if(!userInfo.password){
        errorPassword.push(1);
    }
    if(!shopService.validateUser(userInfo)){
        errorUser.push(1);
    }
    if(!shopService.validatePassword(userInfo)){
        errorPassword.push(1);
    }

    if(errorUser.length>0){
        res.json({userError: true});
    }
    else if(errorPassword.length>0){
        res.json({passwordError: true});
    }
    else{
        res.json({success: true});
    }
});

export default router;