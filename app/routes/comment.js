module.exports = app =>{
    const router = require("express").Router();
    const fileUpload = require("express-fileupload")
    app.use(fileUpload())
    const comment = require("../controller/comment.js")

    app.post("/addcomment",comment.addcomment)
    app.post("/getcomment",comment.getcomment)
    app.post("/deletecomment",comment.deletecomment)
}