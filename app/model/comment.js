const sql = require("./db.js")

const Comment = function(com){
    this.user_id = com.user_id;
    this.post_id = com.post_id;
    this.content = com.content
}

Comment.addComment = (comentData,result) =>{
   sql.query("INSERT INTO comments SET ?",[comentData],(err,res)=>{
    // console.log(err); return false
    result(null,res.insertId)
    return;
   })
}

// Comment.getCommentCount = (post_id,result) =>{

//   sql.query(`SELECT c.*,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM comments as c LEFT JOIN users as u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.created_at DESC`,[post_id],(err,res)=>{
//     result(null,res)
//     return;
//   })
// }

Comment.getComment = (post_id,result) =>{
  sql.query(`SELECT c.*,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM comments as c LEFT JOIN users as u ON u.id = c.user_id WHERE c.post_id = ? `,[post_id],(err,res)=>{
    result(null,res)
    return;
  })
}

Comment.deleteComment = (user_id,id,result) =>{
    sql.query("DELETE FROM comments WHERE id = ? AND user_id = ?",[id,user_id],(err,res)=>{
        // console.log(err); return false
        result(null,res)
        return;
    })
}

module.exports = Comment