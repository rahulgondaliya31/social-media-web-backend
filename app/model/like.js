const sql = require("./db.js")

const Like = function (fav) {
    this.user_id = fav.user_id;
    this.posts_id = fav.posts_id
}

Like.isFavoriteExist = (user_id, post_id, result) => {
    sql.query(`SELECT id FROM likes WHERE posts_id = ${post_id} AND user_id= ${user_id}`, (err, res) => {
        // console.log(err);return false;
        result(null, res[0]);
        return;
    });
}

Like.addLike = (likeData, result) => {
    sql.query("INSERT INTO likes SET ?", [likeData], (err, res) => {
        result(null, res.insertId)
        return;
    })
}

Like.remove = (id, result) => {
    sql.query("DELETE FROM likes WHERE id = ?", [id], (err, res) => {
        result(null, res);
        return;
    });
};

Like.getLikesCount = (post_id,result) =>{

    var strlimit="";

    sql.query(`SELECT l.user_id,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM likes as l LEFT JOIN users as u ON l.user_id = u.id WHERE l.posts_id = ?`+strlimit,[post_id],(err,res)=>{
     // console.log(res);return false
     result(null,res)
     return;
    })
 }

Like.getLikes = (post_id,sp,limit,result) =>{

    var strlimit = " LIMIT "+sp+","+limit+"";

   sql.query(`SELECT l.user_id,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM likes as l LEFT JOIN users as u ON l.user_id = u.id WHERE l.posts_id = ${post_id}`+strlimit,(err,res)=>{
    // console.log(err);return false
    result(null,res)
    return;
   })
}

Like.likePostCount = (user_id,result) =>{

    var strlimit="";

    sql.query(`SELECT l.*,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM likes as l LEFT JOIN posts as p ON l.posts_id = p.id LEFT JOIN users as u ON u.id = p.user_id WHERE l.user_id = ?`+strlimit,[user_id],(err,res)=>{
        // console.log(res); return false
        result(null,res)
        return;
    })
}

Like.likePost = (user_id,sp,limit,result) =>{

    var strlimit = " LIMIT "+sp+","+limit+"";

    sql.query(`SELECT l.*,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM likes as l LEFT JOIN posts as p ON l.posts_id = p.id LEFT JOIN users as u ON u.id = p.user_id WHERE l.user_id = ?` +strlimit,[user_id],(err,res)=>{
        console.log(err); return false
        result(null,res)
        return;
    })
}

module.exports = Like