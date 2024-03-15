module.exports = app =>{
    const router = require("express").Router();
    const fileUpload = require("express-fileupload")
    app.use(fileUpload())
    const follow = require("../controller/follow.js")
    
    app.post("/addfollow_or_unfollow",follow.addfollow_or_unfollow)
    app.post("/getfollow",follow.getfollow)

   
}