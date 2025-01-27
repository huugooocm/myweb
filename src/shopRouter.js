import express from "express";

import * as shopService from "./shopService.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router(); // Crea un nuevo enrutador

shopService.addUser("hugo@gmail.com", {name: "Hugo", birth:2005, course: "Mechanics", password: "paquitosalas" });
shopService.addCourse("Mechanics");
shopService.addCourse("Electronics");
shopService.addCourse("Kitchen");
shopService.addCourse("Plumber");

router.get("/", (req,res)=>{
    res.render("index");
});

router.get("/registerPage", (req,res)=>{
    res.render("registerPage");
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
    if (shopService.validateUser(user)) {
        errorUser.push("Invalid username");
    }
    if (shopService.validatePassword(user,password)) {
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

router.post("/register", (req,res)=>{
    const newEmail= req.body.username;
    const newUser={
        name: req.body.name,
        birth: req.body.birth,
        course: req.body.course,
        password: req.body.password
    }
    const repeatedPassword= req.body.repeatPassword;

    let errorUser=[];
    let errorName=[];
    let errorBirth=[];
    let errorCourse=[];
    let errorPassword=[];
    let errorRepeatPassword=[];

    if (!newUser.name) {
        errorName.push("Name is required");
    }
    if (!newUser.birth) {
        errorBirth.push("Birth is required");
    }
    if (newUser.course==="default") {
        errorCourse.push("Course is required");
    }
    if (!newEmail) {
        errorUser.push("Username is required");
    }
    if (!newUser.password) {
        errorPassword.push("Password is required");
    }
    if (!repeatedPassword) {
        errorRepeatPassword.push("Repeat password is required");
    }
    if (newUser.password !== repeatedPassword) {
        errorRepeatPassword.push("Passwords do not match");
    }
    if (shopService.validateUser(newEmail)) {
        errorUser.push("Username already exists");
    }
    if (errorUser.length === 0 && !newEmail.includes("@")) {
        errorUser.push("Invalid email");
    }
    if(newUser.password.length<8){
        errorPassword.push("Password must have at least 8 characters");
    }


    if (errorUser.length > 0) {
        res.json({ userError: errorUser.join(", ") });
    } else if (errorName.length > 0) {
        res.json({ nameError: errorName.join(", ") });
    } else if (errorBirth.length > 0) {
        res.json({ birthError: errorBirth.join(", ") });
    } else if (errorCourse.length > 0) {
        res.json({ courseError: errorCourse.join(", ") });
    } else if (errorPassword.length > 0) {
        res.json({ passwordError: errorPassword.join(", ") });
    } else if (errorRepeatPassword.length > 0) {
        res.json({ repeatPasswordError: errorRepeatPassword.join(", ") });
    } else {
        shopService.addUser(newEmail, newUser);
        shopService.addUserToCourse(newUser.course, {email:newEmail, name:newUser.name, birth:newUser.birth});  
        res.json({ success: true });
    }
});

export default router;