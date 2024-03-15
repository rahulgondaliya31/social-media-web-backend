module.exports = app =>{
    const router = require("express").Router();
    const fileUpload = require("express-fileupload")
    app.use(fileUpload())
    const like = require("../controller/like.js")

    app.post("/addlike",like.addlike);
    app.post("/getlikes",like.getlikes);
    app.post("/get_like_post",like.get_like_post);
}