const express = require("express")
const bodyParser = require("body-parser")
const file = require("./app/routes/file.js")
const cors = require("cors")
const app = express()
global.nodeSiteUrl = 'http://localhost:4535'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use(bodyParser.text({ type: '/' }));

app.get('/',(req,res)=>{
    res.send("hello world")
})

// var filestorageEngine = multer.diskStorage({   
//     destination: (req, file, cb) => {
//         cb(null,'./uploads')
//     },
//     filename:(req,file, cb) => {
//         cb(null,"[maues]-" + file.originalname)
//     }
// })
// var upload = multer({
//     storage:filestorageEngine 
// })
 
// app.post('/file', upload.array('file', 3),(req, res) => {
//     console.log(req.file)
//      res.send("file uploaded successfully")
//  })



 require("./app/routes/users.js")(app);
 require("./app/routes/like.js")(app);
 require("./app/routes/comment.js")(app);
 require("./app/routes/follow.js")(app);
//  require("./app/routes/story.js")(app);



app.use('/file',file)
 
const PORT = 4535                           
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} `);
})  