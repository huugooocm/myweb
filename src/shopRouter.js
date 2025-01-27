import express from "express";

import * as shopService from "./shopService.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router(); // Crea un nuevo enrutador

shopService.addUser({ userName: "", password: "paquitosalas" });

router.get("/", (req,res)=>{
    res.render("index");
});

router.post("/login", (req,res)=>{

    const user= req.body.username;
    const password= req.body.password;  

    let errorUser=[];
    let errorPassword=[];

    if (!user) {
        errorUser.push("Username is required");
    }
    if (!password) {
        errorPassword.push("Password is required");
    }
    if (!shopService.validateUser(user)) {
        errorUser.push("Invalid username");
    }
    if (!shopService.validatePassword(user,password)) {
        errorPassword.push("Invalid password");
    }

    if (errorUser.length > 0) {
        res.json({ userError: errorUser.join(", ") });
    } else if (errorPassword.length > 0) {
        res.json({ passwordError: errorPassword.join(", ") });
    } else {
        res.json({ success: true });
    }
});

export default router;