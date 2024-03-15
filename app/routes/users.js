module.exports = app =>{
    const router = require("express").Router();
    const users = require("../controller/users.js")
    const fileUpload = require("express-fileupload")
    app.use(fileUpload())

    app.post("/register",users.register);
    app.post("/login",users.login);
    app.post("/get_user_detail",users.get_user_detail);
    app.post("/updateprofile",users.updateprofile);
    app.post("/changepassword",users.changepassword);
    app.post("/deleteuser",users.deleteuser)
    app.post("/postvideo",users.postvideo)
    app.post("/getpost",users.getpost)
    app.post("/removepost",users.removepost)
    app.post("/savepost",users.savepost)
    app.post("/savedpostlisting",users.savedpostlisting)
    // app.post("/getposts",users.getposts)
    app.post("/addstory",users.addstory)
    app.post("/deletestory",users.deletestory)
    app.post("/getstory",users.getstory)  
    app.post("/forgotpassword",users.forgotpassword)
    app.post("/postlisting",users.postlisting)
    app.post("/account",users.account)
    app.post("/userlisting",users.userlisting)
}