import express from "express";

import * as shopService from "./shopService.js";

const Router = express.Router(); // Crea un nuevo enrutador


Router.get("/", (req,res)=>{
    res.render("index");
});


export default Router;