import express from "express";

import * as shopService from "./shopService.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router(); // Crea un nuevo enrutador

shopService.addUser("hugo@gmail.com", {name: "Hugo", birth:2005, email:"hugo@gmail.com", course: "Mechanics", password: "paquitosalas" });
shopService.addCourse("Mechanics", {users:[], description:"This course is about mechanics"});
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
    console.log("User:", user, "Password:", password);
    let errorUser=[];
    let errorPassword=[];

    if (!user) {
        errorUser.push("Username is required");
    }
    if (!password) {
        errorPassword.push("Password is required");
    }
    if (!shopService.validateEmail(user)) {
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
        res.json({ success: true, user: user});
    }
});

router.post("/register", (req,res)=>{
    const newEmail= req.body.username;
    const newUser={
        name: req.body.name,
        birth: req.body.birth,
        email: req.body.username,
        course: req.body.course,
        password: req.body.password,
        image: null
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
    if (shopService.validateEmail(newEmail)) {
        errorUser.push("Username already exists");
    }
    if (errorUser.length === 0 && !newEmail.includes("@")) {
        errorUser.push("Invalid email");
    }
    if(newUser.password.length<8){
        errorPassword.push("Password must have at least 8 characters");
    }


    if (errorName.length > 0) {
        res.json({ nameError: errorName.join(", ") });
    }else if (errorBirth.length > 0) {
        res.json({ birthError: errorBirth.join(", ") });
    }else if (errorCourse.length > 0) {
        res.json({ courseError: errorCourse.join(", ") });
    }else if (errorUser.length > 0) {
        res.json({ userError: errorUser.join(", ") });
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

router.get("/checkEmail", (req,res)=>{
    const email= req.query.email;
    let errorUser=[];
    if (shopService.validateEmail(email)) {
        errorUser.push("Username already exists");
    }
    if (errorUser.length > 0) {
        res.json({ userError: errorUser });
    } else {
        res.json({ success: "Available email" });
    }
});

router.get("/course/:user",(req,res)=>{
    console.log("Getting user:", req.params.user);
    res.render("course",{
        user: shopService.getUser(req.params.user),
    });
});

export default router;